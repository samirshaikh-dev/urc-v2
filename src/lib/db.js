import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

const globalForDb = globalThis;

neonConfig.webSocketConstructor = ws;

export function isDatabaseConfigured() {
  return Boolean(
    process.env.DATABASE_URL_POOLED?.trim() || process.env.DATABASE_URL?.trim()
  );
}

export function getDbClient() {
  const connectionString =
    process.env.DATABASE_URL_POOLED?.trim() || process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    return null;
  }

  if (!globalForDb.urcDb) {
    const pool = new Pool({ connectionString });
    globalForDb.urcDb = drizzle(pool);
  }

  return globalForDb.urcDb;
}
