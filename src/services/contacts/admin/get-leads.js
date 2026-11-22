import { getDbClient, isDatabaseConfigured } from "@/lib/db";
import { enquiries } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { leadsStore } from "../store.js";

function normalizeEnquiry(row) {
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
    status: row.leadStatus,
    notes: Array.isArray(row.notes) ? row.notes : [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function getAllLeads(status = "all") {
  const db = getDbClient();

  if (!db || !isDatabaseConfigured()) {
    let list = [...leadsStore];
    if (status && status !== "all") {
      list = list.filter((lead) => (lead.leadStatus || lead.status) === status);
    }
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  try {
    const query =
      status && status !== "all"
        ? db.select().from(enquiries).where(eq(enquiries.leadStatus, status)).orderBy(desc(enquiries.createdAt))
        : db.select().from(enquiries).orderBy(desc(enquiries.createdAt));

    const rows = await query;
    return rows.map(normalizeEnquiry);
  } catch (err) {
    console.error("[getAllLeads] Database query failed, falling back to memory store:", err);
    return leadsStore;
  }
}

export async function getLeadById(id) {
  const db = getDbClient();

  if (!db || !isDatabaseConfigured()) {
    return leadsStore.find((lead) => lead.id === id) || null;
  }

  try {
    const [row] = await db.select().from(enquiries).where(eq(enquiries.id, id));
    return row ? normalizeEnquiry(row) : null;
  } catch (err) {
    console.error("[getLeadById] Error:", err);
    return leadsStore.find((lead) => lead.id === id) || null;
  }
}
