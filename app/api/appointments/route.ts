import { randomUUID } from "node:crypto";
import type { PoolConnection, RowDataPacket } from "mysql2/promise";

import {
  jsonResponse,
  normalizeCustomerInput,
  readJsonObject,
} from "@/lib/api-request";
import { upsertCustomer } from "@/lib/db-customers";
import { getDbPool } from "@/lib/db";

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
      { error: "Debes autorizar el uso de tus datos para gestionar la cita." },
      400
    );
  }

  const { serviceSlug, requestedAt, note } = parsed.data;
  if (
    typeof serviceSlug !== "string" ||
    !/^[a-z0-9-]{1,80}$/.test(serviceSlug)
  ) {
    return jsonResponse({ error: "Selecciona un servicio válido." }, 400);
  }

  if (typeof requestedAt !== "string") {
    return jsonResponse({ error: "Selecciona la fecha y hora de la cita." }, 400);
  }
  const requestedDate = new Date(requestedAt);
  if (
    Number.isNaN(requestedDate.getTime()) ||
    requestedDate.getTime() < Date.now() + 30 * 60 * 1000
  ) {
    return jsonResponse(
      { error: "Selecciona una fecha de cita con al menos 30 minutos de anticipación." },
      400
    );
  }

  if (note !== undefined && (typeof note !== "string" || note.length > 500)) {
    return jsonResponse({ error: "La nota no puede superar 500 caracteres." }, 400);
  }

  const publicCode = randomUUID();
  let connection: PoolConnection | undefined;
  try {
    connection = await getDbPool().getConnection();
    await connection.beginTransaction();

    const [services] = await connection.execute<RowDataPacket[]>(
      "SELECT id FROM services WHERE slug = ? AND is_active = TRUE LIMIT 1",
      [serviceSlug]
    );
    if (services.length === 0) {
      await connection.rollback();
      return jsonResponse({ error: "El servicio seleccionado no está disponible." }, 404);
    }

    const customerId = await upsertCustomer(
      connection,
      customer.name,
      customer.phone
    );
    await connection.execute(
      `INSERT INTO appointments
        (public_code, customer_id, service_id, requested_at, privacy_consent_at, note)
       VALUES (?, ?, ?, ?, UTC_TIMESTAMP(3), ?)`,
      [
        publicCode,
        customerId,
        services[0].id,
        requestedDate.toISOString().slice(0, 23).replace("T", " "),
        typeof note === "string" && note.trim() ? note.trim() : null,
      ]
    );

    await connection.commit();
    return jsonResponse({ appointmentCode: publicCode }, 201);
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("No se pudo revertir la transacción de cita:", rollbackError);
      }
    }
    console.error("No se pudo guardar la solicitud de cita:", error);
    return jsonResponse(
      { error: "No pudimos guardar tu solicitud. Inténtalo de nuevo." },
      500
    );
  } finally {
    connection?.release();
  }
}
