import type { PoolConnection, ResultSetHeader } from "mysql2/promise";

export async function upsertCustomer(
  connection: PoolConnection,
  name: string,
  phone: string
): Promise<number> {
  const [result] = await connection.execute<ResultSetHeader>(
    `INSERT INTO customers (name, phone)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id), name = ?`,
    [name, phone, name]
  );

  return result.insertId;
}
