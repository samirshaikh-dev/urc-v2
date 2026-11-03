import { randomUUID } from "node:crypto";
import { asc, inArray } from "drizzle-orm";
import { productFaqs, productSpecifications } from "@/db/schema";
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
