import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis;

/**
 * Database connectivity is optional: public pages fall back to the static
 * product catalogue when Supabase is unconfigured or unreachable.
 */
export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL?.trim());
}

/**
 * Lazily create the Prisma client so importing this module never requires a
 * database connection (important for builds and static rendering).
 *
 * Returns `null` when `DATABASE_URL` is not configured.
 */
export function getPrismaClient() {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
      // Avoid flooding build output with repeated connection errors. Failures
      // are reported once by the data layer, which then falls back to static data.
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : [],
    });
  }

  return globalForPrisma.prisma;
}

/**
 * Backwards-compatible accessor for server actions. Throws a clear error when
 * the database is not configured; callers already handle failures and report
 * them to the admin UI.
 */
export const prisma = new Proxy(
  {},
  {
    get(_target, property) {
      const client = getPrismaClient();

      if (!client) {
        throw new Error(
          "Database is not configured. Set DATABASE_URL to enable database features."
        );
      }

      const value = client[property];
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);

export default prisma;
