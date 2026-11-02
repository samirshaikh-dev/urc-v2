import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const globalForDb = globalThis;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getDbClient() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    return null;
  }

  if (!globalForDb.urcDb) {
    const pool = new Pool({ connectionString });
    globalForDb.urcDb = drizzle(pool);
  }

  return globalForDb.urcDb;
}
