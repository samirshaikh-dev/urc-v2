import { randomUUID } from "node:crypto";
import { and, asc, inArray, ne, or, sql } from "drizzle-orm";
import { productFaqs, productSpecifications, products } from "@/db/schema";
import { getDbClient } from "@/lib/db";

export const USER_FRIENDLY_DB_ERROR =
  "Our product catalog is temporarily unavailable. Please refresh or contact our team directly for product inquiries and quotations.";

export const ADMIN_FRIENDLY_DB_ERROR =
  "Database connection is currently unavailable. Please check database settings or try again in a few moments.";

const DB_RETRY_COOLDOWN_MS = 60_000;
let databaseUnavailableUntil = 0;
let databaseFailureReported = false;

export function getDatabase() {
  if (Date.now() < databaseUnavailableUntil) {
    return null;
  }
  return getDbClient();
}

export function markDatabaseAvailable() {
  databaseUnavailableUntil = 0;
  databaseFailureReported = false;
}

export function handleDatabaseFailure(error) {
  databaseUnavailableUntil = Date.now() + DB_RETRY_COOLDOWN_MS;

  if (databaseFailureReported) {
    return;
  }

  databaseFailureReported = true;
  console.warn("[products] Database unavailable.");
}

export function cleanFaqs(faqs) {
  return (faqs || [])
    .filter((faq) => faq.question?.trim() && faq.answer?.trim())
    .map((faq) => ({
      question: faq.question.trim(),
      answer: faq.answer.trim(),
    }));
}

export function cleanSpecifications(specifications) {
  return (specifications || [])
    .filter((specification) => specification.property?.trim() && specification.value?.trim())
    .map((specification) => ({
      property: specification.property.trim(),
      value: specification.value.trim(),
    }));
}

export function createRelatedRows(records, productId, fields) {
  return records.map((record, sortOrder) => ({
    id: randomUUID(),
    productId,
    ...Object.fromEntries(fields.map((field) => [field, record[field]])),
    sortOrder: record.sortOrder ?? sortOrder,
  }));
}

const PRODUCT_SEO_FIELDS = [
  "seoTitle",
  "seoDescription",
  "seoImageUrl",
  "imageAlt",
  "introduction",
  "features",
  "applications",
  "benefits",
  "relatedProductIds",
  "sku",
  "mpn",
  "visibility",
  "lifecycleStatus",
  "indexingStatus",
];

/**
 * Extracts only the optional SEO/content columns from a validated admin
 * payload. Values are intentionally passed through as-is so clearing a field
 * in the editor writes an empty value instead of leaving stale metadata.
 */
export function getProductSeoValues(payload = {}) {
  return Object.fromEntries(
    PRODUCT_SEO_FIELDS.filter((field) => payload[field] !== undefined).map((field) => [
      field,
      payload[field],
    ])
  );
}

function normalizeSeoTextForComparison(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

/**
 * Prevent duplicate SEO titles/descriptions at the application boundary.
 * Titles and descriptions are derived into canonical URLs and metadata, so a
 * duplicate would create competing pages with the same search snippet.
 */
export async function assertUniqueProductSeo(db, payload = {}, excludeId) {
  const seoTitle = normalizeSeoTextForComparison(payload.seoTitle);
  const seoDescription = normalizeSeoTextForComparison(payload.seoDescription);

  const comparisons = [];
  if (seoTitle) {
    comparisons.push(
      sql`lower(trim(regexp_replace(coalesce(${products.seoTitle}, ''), '[[:space:]]+', ' ', 'g'))) = ${seoTitle}`
    );
  }
  if (seoDescription) {
    comparisons.push(
      sql`lower(trim(regexp_replace(coalesce(${products.seoDescription}, ''), '[[:space:]]+', ' ', 'g'))) = ${seoDescription}`
    );
  }

  if (!comparisons.length) return;

  const where = excludeId
    ? and(ne(products.id, excludeId), or(...comparisons))
    : or(...comparisons);

  const [conflict] = await db
    .select({ id: products.id })
    .from(products)
    .where(where)
    .limit(1);

  if (conflict) {
    throw new Error(
      "Another product already uses this SEO title or description. Please use unique values."
    );
  }
}

export async function loadRelatedRows(db, rows, { faqs = false, specifications = false } = {}) {
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
