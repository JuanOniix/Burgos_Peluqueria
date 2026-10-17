import mysql, { type Pool } from "mysql2/promise";

type GlobalWithMysqlPool = typeof globalThis & {
  burgosMysqlPool?: Pool;
};

const globalWithMysqlPool = globalThis as GlobalWithMysqlPool;

export function getDbPool(): Pool {
  if (globalWithMysqlPool.burgosMysqlPool) {
    return globalWithMysqlPool.burgosMysqlPool;
  }

  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const database = process.env.MYSQL_DATABASE;
  const port = Number(process.env.MYSQL_PORT ?? "3306");

  if (!host || !user || !password || !database) {
    throw new Error(
      "Configura MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD y MYSQL_DATABASE."
    );
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("MYSQL_PORT debe ser un puerto válido.");
  }

  globalWithMysqlPool.burgosMysqlPool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl:
      process.env.MYSQL_SSL === "true"
        ? { rejectUnauthorized: true }
        : undefined,
  });

  return globalWithMysqlPool.burgosMysqlPool;
}
