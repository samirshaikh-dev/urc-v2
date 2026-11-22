# Neon PostgreSQL

The application uses Neon PostgreSQL through Drizzle ORM. Product reads and
writes, including product/FAQ/specification transactions, use Neon's
serverless-compatible `Pool` driver.

## Connection strings

Set these variables in the local `.env` file and in the deployment environment:

- `DATABASE_URL`: Neon direct connection string, used by Drizzle Kit for
  migrations.
- `DATABASE_URL_POOLED`: Neon pooled connection string, used by the application
  and seed script. The application falls back to `DATABASE_URL` if this is
  unset.

Keep both values private. Do not commit `.env` or expose either variable to
client-side code.

## Applying the schema

After configuring the Neon connection strings, apply the checked-in migrations:

```powershell
npm run db:migrate
```

After changing `src/db/schema.js`, create and review a migration before
applying it:

```powershell
npm run db:generate
npm run db:migrate
```

`npm run db:seed` inserts or updates the predefined catalog products. For
products whose slugs match the seed data, it also replaces their FAQ and
specification rows. It is not a Supabase data-transfer command and should only
be run when that behavior is intended.

`npm run db:empty` deletes all rows from `products`, `product_faqs`,
`product_specifications`, and `enquiries`, plus `blogs` if that table exists in
the target database. It asks for confirmation before truncating; in
non-interactive use, pass `--yes` (`npm run db:empty -- --yes`). Only run it
against a database you intend to clear, then restore product content with
`npm run db:seed`. The configured database currently has no `blogs` table;
blogs are held in the in-memory application store and are not cleared by this
script.

## Moving existing data

Changing the connection strings does not copy data from Supabase. Back up the
source database, create the destination schema with the Drizzle migrations, and
transfer only the data that matches the current schema. Verify row counts and
sample records in Neon before switching production traffic.

The current Drizzle schema contains `products`, `product_faqs`, and
`product_specifications`. Blog records are currently held in an in-memory
application cache rather than persisted through the application to a database,
so they are not included in this migration.
