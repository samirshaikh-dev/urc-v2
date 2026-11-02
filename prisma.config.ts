import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.mjs",
  },
  datasource: {
    // Prisma 7 reads the CLI/Migrate connection URL from here, not from the schema.
    // Prefer the direct (non-pooled) connection when available, otherwise the
    // pooled one. Both are optional: `prisma generate` must work without
    // database credentials, so fall back to an empty string instead of `env()`
    // (which throws when the variable is missing).
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});
