import { getDbClient, isDatabaseConfigured } from "@/lib/db";
import { enquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
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

export async function updateLeadStatus(id, newStatus) {
  const db = getDbClient();

  if (!db || !isDatabaseConfigured()) {
    const index = leadsStore.findIndex((l) => l.id === id);
    if (index === -1) return null;

    leadsStore[index] = {
      ...leadsStore[index],
      status: newStatus,
      leadStatus: newStatus,
    };
    return leadsStore[index];
  }

  try {
    const [updated] = await db
      .update(enquiries)
      .set({ leadStatus: newStatus, updatedAt: new Date() })
      .where(eq(enquiries.id, id))
      .returning();

    return updated ? normalizeEnquiry(updated) : null;
  } catch (err) {
    console.error("[updateLeadStatus] Database update failed:", err);
    return null;
  }
}

export async function addLeadNote(id, noteText, author = "Admin") {
  const db = getDbClient();
  const newNote = {
    id: `note-${Date.now()}`,
    author,
    text: noteText,
    createdAt: new Date().toISOString(),
  };

  if (!db || !isDatabaseConfigured()) {
    const index = leadsStore.findIndex((l) => l.id === id);
    if (index === -1) return null;

    leadsStore[index] = {
      ...leadsStore[index],
      notes: [newNote, ...(leadsStore[index].notes || [])],
    };

    return leadsStore[index];
  }

  try {
    const [current] = await db.select().from(enquiries).where(eq(enquiries.id, id));
    if (!current) return null;

    const existingNotes = Array.isArray(current.notes) ? current.notes : [];
    const updatedNotes = [newNote, ...existingNotes];

    const [updated] = await db
      .update(enquiries)
      .set({ notes: updatedNotes, updatedAt: new Date() })
      .where(eq(enquiries.id, id))
      .returning();

    return updated ? normalizeEnquiry(updated) : null;
  } catch (err) {
    console.error("[addLeadNote] Database update failed:", err);
    return null;
  }
}
