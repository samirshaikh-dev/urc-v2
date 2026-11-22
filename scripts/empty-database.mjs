import "dotenv/config";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import pg from "pg";

const { Client } = pg;

// Prefer the direct connection for TRUNCATE, matching db:migrate.
const url =
  process.env.DATABASE_URL?.trim() ||
  process.env.DATABASE_URL_POOLED?.trim();

if (!url) {
  console.error("DATABASE_URL or DATABASE_URL_POOLED is not set.");
  process.exit(1);
}

// Tables to clear. Tables that do not exist are skipped. Leads submitted
// through the contact form are stored in `enquiries`; `blogs` is included for
// databases that persist it.
const targets = [
  "product_faqs",
  "product_specifications",
  "products",
  "enquiries",
  "blogs",
];

if (!process.argv.includes("--yes")) {
  if (!input.isTTY) {
    console.error(
      'Refusing to truncate without confirmation. Re-run with --yes, e.g. npm run db:empty -- --yes'
    );
    process.exit(1);
  }

  const host = new URL(url).host;
  const rl = readline.createInterface({ input, output });
  let answer = "";
  try {
    answer = (
      await rl.question(
        `Truncate ${targets.join(", ")} on ${host}? Type "yes" to continue: `
      )
    )
      .trim()
      .toLowerCase();
  } finally {
    rl.close();
  }

  if (answer !== "yes") {
    console.log("Aborted; no data was changed.");
    process.exit(0);
  }
}

const client = new Client({ connectionString: url });
let toTruncate = [];

try {
  await client.connect();

  const { rows } = await client.query(
    `SELECT table_name FROM information_schema.tables
     WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`
  );
  const existing = new Set(rows.map((row) => row.table_name));
  toTruncate = targets.filter((table) => existing.has(table));

  if (!toTruncate.length) {
    console.log("No target tables found.");
  } else {
    await client.query(
      `TRUNCATE TABLE ${toTruncate.map((table) => `"${table}"`).join(", ")} RESTART IDENTITY CASCADE;`
    );
    console.log(`Emptied: ${toTruncate.join(", ")}.`);
  }
} finally {
  await client.end();
}

if (toTruncate.includes("blogs")) {
  console.log("Blog rows were cleared too.");
} else {
  console.log(
    "No blogs table was found; blogs held in the app's in-memory store are not cleared by this script."
  );
}
