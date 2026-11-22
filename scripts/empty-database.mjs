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

const client = new Client({ connectionString: url });

await client.connect();
await client.query(
  "TRUNCATE TABLE product_specifications, product_faqs, products RESTART IDENTITY CASCADE;"
);
await client.end();

console.log("Emptied products, product_faqs, product_specifications.");
console.log("Leads and blogs are in-memory stores; restart the app to clear them.");
