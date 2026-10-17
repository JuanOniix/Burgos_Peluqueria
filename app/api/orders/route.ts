import { randomUUID } from "node:crypto";
import type {
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

import {
  jsonResponse,
  normalizeCustomerInput,
  readJsonObject,
} from "@/lib/api-request";
import { upsertCustomer } from "@/lib/db-customers";
import { getDbPool } from "@/lib/db";

type ProductRow = RowDataPacket & {
  id: string;
  name: string;
  price_cop: number;
};

type RequestedItem = { id: string; quantity: number };

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = await readJsonObject(request);
  if ("error" in parsed) return parsed.error;

  const customer = normalizeCustomerInput(parsed.data.name, parsed.data.phone);
  if (!customer) {
    return jsonResponse(
      { error: "Ingresa un nombre y un teléfono válidos." },
      400
    );
  }

  if (parsed.data.privacyConsent !== true) {
    return jsonResponse(
      { error: "Debes autorizar el uso de tus datos para gestionar el pedido." },
      400
    );
  }

  const { items } = parsed.data;
  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return jsonResponse({ error: "El carrito no contiene productos válidos." }, 400);
  }

  const requestedItems: RequestedItem[] = [];
  const seenProductIds = new Set<string>();
  for (const item of items) {
    if (
      typeof item !== "object" ||
      item === null ||
      Array.isArray(item) ||
      !("id" in item) ||
      !("quantity" in item) ||
      typeof item.id !== "string" ||
      !/^[a-z0-9-]{1,80}$/.test(item.id) ||
      typeof item.quantity !== "number" ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 20 ||
      seenProductIds.has(item.id)
    ) {
      return jsonResponse({ error: "Hay productos o cantidades no válidos." }, 400);
    }
    seenProductIds.add(item.id);
    requestedItems.push({ id: item.id, quantity: item.quantity });
  }

  const publicCode = randomUUID();
  let connection: PoolConnection | undefined;
  try {
    connection = await getDbPool().getConnection();
    await connection.beginTransaction();

    const placeholders = requestedItems.map(() => "?").join(", ");
    const [products] = await connection.execute<ProductRow[]>(
      `SELECT id, name, price_cop
       FROM products
       WHERE is_active = TRUE AND id IN (${placeholders})
       FOR UPDATE`,
      requestedItems.map((item) => item.id)
    );

    if (products.length !== requestedItems.length) {
      await connection.rollback();
      return jsonResponse(
        { error: "Uno o más productos ya no están disponibles." },
        409
      );
    }

    const productsById = new Map(products.map((product) => [product.id, product]));
    const orderLines = requestedItems.map((item) => {
      const product = productsById.get(item.id)!;
      return {
        ...item,
        name: product.name,
        price: Number(product.price_cop),
        lineTotal: Number(product.price_cop) * item.quantity,
      };
    });
    const subtotal = orderLines.reduce((total, line) => total + line.lineTotal, 0);
    if (!Number.isSafeInteger(subtotal) || subtotal > 4_294_967_295) {
      await connection.rollback();
      return jsonResponse({ error: "El total del pedido excede el límite permitido." }, 400);
    }

    const customerId = await upsertCustomer(
      connection,
      customer.name,
      customer.phone
    );
    const [orderResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO orders
        (public_code, customer_id, subtotal_cop, privacy_consent_at)
       VALUES (?, ?, ?, UTC_TIMESTAMP(3))`,
      [publicCode, customerId, subtotal]
    );

    const linePlaceholders = orderLines.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
    const lineValues = orderLines.flatMap((line) => [
      orderResult.insertId,
      line.id,
      line.name,
      line.price,
      line.quantity,
      line.lineTotal,
    ]);
    await connection.execute(
      `INSERT INTO order_items
        (order_id, product_id, product_name, unit_price_cop, quantity, line_total_cop)
       VALUES ${linePlaceholders}`,
      lineValues
    );

    await connection.commit();
    return jsonResponse(
      {
        orderCode: publicCode,
        subtotal,
        items: orderLines.map((line) => ({
          name: line.name,
          quantity: line.quantity,
          lineTotal: line.lineTotal,
        })),
      },
      201
    );
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("No se pudo revertir la transacción del pedido:", rollbackError);
      }
    }
    console.error("No se pudo guardar el pedido:", error);
    return jsonResponse(
      { error: "No pudimos guardar tu pedido. Inténtalo de nuevo." },
      500
    );
  } finally {
    connection?.release();
  }
}
