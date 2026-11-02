import { and, asc, desc, eq, inArray } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { PRODUCTS } from "@/data/products";
import { productFaqs, productSpecifications, products } from "@/db/schema";
import { getDbClient } from "@/lib/db";

export { slugify } from "@/lib/utils";

const DB_RETRY_COOLDOWN_MS = 60_000;
let databaseUnavailableUntil = 0;
let databaseFailureReported = false;

function getDatabase() {
  if (Date.now() < databaseUnavailableUntil) {
    return null;
  }

  return getDbClient();
}

function markDatabaseAvailable() {
  databaseUnavailableUntil = 0;
  databaseFailureReported = false;
}

function handleDatabaseFailure(error) {
  databaseUnavailableUntil = Date.now() + DB_RETRY_COOLDOWN_MS;

  if (databaseFailureReported) {
    return;
  }

  databaseFailureReported = true;
  const firstLine = String(error?.message || error)
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean);

  console.warn(
    `[products] Database unavailable; using static product data.${
      firstLine ? ` (${firstLine})` : ""
    }`
  );
}

async function loadRelatedRows(db, rows, { faqs = false, specifications = false } = {}) {
  if (!rows.length) {
    return rows;
  }

  const ids = [...new Set(rows.map((row) => row.id))];

  if (faqs) {
    const records = await db
      .select()
      .from(productFaqs)
      .where(inArray(productFaqs.productId, ids))
      .orderBy(asc(productFaqs.sortOrder));
    const byProduct = new Map();

    for (const record of records) {
      const current = byProduct.get(record.productId) || [];
      current.push(record);
      byProduct.set(record.productId, current);
    }

    for (const row of rows) {
      row.faqs = byProduct.get(row.id) || [];
    }
  }

  if (specifications) {
    const records = await db
      .select()
      .from(productSpecifications)
      .where(inArray(productSpecifications.productId, ids))
      .orderBy(asc(productSpecifications.sortOrder));
    const byProduct = new Map();

    for (const record of records) {
      const current = byProduct.get(record.productId) || [];
      current.push(record);
      byProduct.set(record.productId, current);
    }

    for (const row of rows) {
      row.specifications = byProduct.get(row.id) || [];
    }
  }

  return rows;
}

export async function getProductsByCategory(categorySlug) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `category-${categorySlug}`);

  try {
    const db = getDatabase();

    if (db) {
      const rows = await db
        .select()
        .from(products)
        .where(eq(products.categorySlug, categorySlug))
        .orderBy(desc(products.createdAt));
      await loadRelatedRows(db, rows, { faqs: true });
      markDatabaseAvailable();

      if (rows.length) {
        return rows.map((product) => ({
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.categorySlug,
          image: product.imageUrl,
          imagePublicId: product.imagePublicId,
          badge: product.badge || "",
          shortDescription:
            product.description.replace(/<[^>]*>/g, "").slice(0, 160) + "...",
          fullDescription: product.description,
          faqs: product.faqs || [],
        }));
      }
    }
  } catch (error) {
    handleDatabaseFailure(error);
  }

  return PRODUCTS.filter((product) => product.category === categorySlug);
}

export async function getProductBySlug(slug, categorySlug) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-${slug}`);

  try {
    const db = getDatabase();

    if (db) {
      const conditions = [eq(products.slug, slug)];
      if (categorySlug) {
        conditions.push(eq(products.categorySlug, categorySlug));
      }

      const rows = await db
        .select()
        .from(products)
        .where(and(...conditions))
        .limit(1);
      await loadRelatedRows(db, rows, { faqs: true, specifications: true });
      markDatabaseAvailable();

      const product = rows[0];
      if (product) {
        return {
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.categorySlug,
          image: product.imageUrl,
          imagePublicId: product.imagePublicId,
          badge: product.badge || "",
          shortDescription:
            product.description.replace(/<[^>]*>/g, "").slice(0, 160) + "...",
          fullDescription: product.description,
          faqs: product.faqs || [],
          specifications: product.specifications || [],
          features: [],
          applications: [],
          howToSpecify:
            "Contact us with your technical drawing or dimensional requirements for tailored fabrication.",
        };
      }
    }
  } catch (error) {
    handleDatabaseFailure(error);
  }

  return (
    PRODUCTS.find(
      (product) =>
        product.slug === slug && (!categorySlug || product.category === categorySlug)
    ) || null
  );
}

export async function getAllProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  try {
    const db = getDatabase();

    if (db) {
      const rows = await db.select().from(products).orderBy(desc(products.createdAt));
      await loadRelatedRows(db, rows, { faqs: true });
      markDatabaseAvailable();

      if (rows.length) {
        return rows.map((product) => ({
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.categorySlug,
          image: product.imageUrl,
          imagePublicId: product.imagePublicId,
          badge: product.badge || "",
          description: product.description,
          faqs: product.faqs || [],
          createdAt: product.createdAt,
        }));
      }
    }
  } catch (error) {
    handleDatabaseFailure(error);
  }

  return PRODUCTS.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    image: product.image,
    badge: product.badge || "",
    description: product.fullDescription || product.shortDescription,
    faqs: [],
    createdAt: new Date(),
  }));
}

export async function getProductById(id) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-id-${id}`);

  try {
    const db = getDatabase();

    if (db) {
      const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
      await loadRelatedRows(db, rows, { faqs: true, specifications: true });
      markDatabaseAvailable();

      const product = rows[0];
      if (product) {
        return {
          id: product.id,
          slug: product.slug,
          name: product.name,
          categorySlug: product.categorySlug,
          imageUrl: product.imageUrl,
          imagePublicId: product.imagePublicId,
          badge: product.badge || "",
          description: product.description,
          faqs: product.faqs || [],
          specifications: product.specifications || [],
        };
      }
    }
  } catch (error) {
    handleDatabaseFailure(error);
  }

  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) {
    return null;
  }

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    categorySlug: product.category,
    imageUrl: product.image,
    imagePublicId: null,
    badge: product.badge || "",
    description: product.fullDescription || product.shortDescription,
    faqs: [],
    specifications: (product.specifications || []).map((specification, sortOrder) => ({
      property: specification.property,
      value: specification.value,
      sortOrder,
    })),
  };
}
