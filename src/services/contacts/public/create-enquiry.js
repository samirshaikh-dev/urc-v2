import { nanoid } from "nanoid";
import { getDbClient, isDatabaseConfigured } from "@/lib/db";
import { enquiries } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Generate a human-readable enquiry reference.
 * Format: URC-YYYYMMDD-XXXXX (e.g. URC-20261122-A3B9K)
 */
function generateEnquiryId() {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
  const suffix = nanoid(5).toUpperCase();
  return `URC-${date}-${suffix}`;
}

/**
 * Persist an enquiry to the database.
 * Returns the saved enquiry row.
 *
 * @param {object} payload
 * @param {'email'|'whatsapp'} payload.submissionMethod
 */
export async function createEnquiry(payload) {
  const db = getDbClient();

  const id = generateEnquiryId();
  const now = new Date();

  const row = {
    id,
    fullName: payload.name.trim(),
    companyName: payload.company.trim(),
    businessEmail: payload.email.trim().toLowerCase(),
    phoneNumber: payload.phone?.trim() || "",
    productInterestedIn: payload.product?.trim() || "General Inquiry / Other",
    requirementDetails: payload.message.trim(),
    submissionMethod: payload.submissionMethod || "email",
    emailStatus: payload.submissionMethod === "whatsapp" ? "not_applicable" : "pending",
    whatsappStatus: payload.submissionMethod === "whatsapp" ? "initiated" : "not_sent",
    leadStatus: "new",
    notes: [],
    createdAt: now,
    updatedAt: now,
  };

  if (!db || !isDatabaseConfigured()) {
    // Fallback: in-memory store for development without a DB configured.
    // This must NOT be used in production.
    console.warn("[createEnquiry] Database not configured — using in-memory fallback.");
    return normalizeRow(row);
  }

  const [inserted] = await db
    .insert(enquiries)
    .values(row)
    .returning();

  return normalizeRow(inserted);
}

/**
 * Update emailStatus of a saved enquiry.
 */
export async function updateEnquiryEmailStatus(id, emailStatus) {
  const db = getDbClient();
  if (!db) return null;

  const [updated] = await db
    .update(enquiries)
    .set({ emailStatus, updatedAt: new Date() })
    .where(eq(enquiries.id, id))
    .returning();

  return updated ? normalizeRow(updated) : null;
}

/**
 * Map DB column names → camelCase shape consumed by the rest of the app.
 */
function normalizeRow(row) {
  return {
    id: row.id,
    name: row.fullName,
    company: row.companyName,
    email: row.businessEmail,
    phone: row.phoneNumber,
    product: row.productInterestedIn,
    message: row.requirementDetails,
    submissionMethod: row.submissionMethod,
    emailStatus: row.emailStatus,
    whatsappStatus: row.whatsappStatus,
    leadStatus: row.leadStatus,
    createdAt: row.createdAt,
  };
}
