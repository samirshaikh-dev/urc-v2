import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const url =
  process.env.DATABASE_URL?.trim() ||
  process.env.DATABASE_URL_POOLED?.trim();

if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const targets = ["products", "product_faqs", "product_specifications", "leads", "blogs"];

const client = new Client({ connectionString: url });
await client.connect();

const { rows } = await client.query(
  "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
);
const existing = new Set(rows.map((r) => r.table_name));
const toTruncate = targets.filter((t) => existing.has(t));

if (toTruncate.length) {
  await client.query(
    `TRUNCATE TABLE ${toTruncate.join(", ")} RESTART IDENTITY CASCADE;`
  );
  console.log(`Emptied: ${toTruncate.join(", ")}.`);
} else {
  console.log("No target tables found.");
}

await client.end();

console.log("Leads and blogs are in-memory stores until migrated; restart the app to clear them.");
