import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url:
      process.env.DATABASE_URL?.trim() ||
      process.env.DATABASE_URL_POOLED?.trim() ||
      "",
  },
  strict: true,
  verbose: true,
});
