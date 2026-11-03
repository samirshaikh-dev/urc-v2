"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import {
  addLeadNote,
  updateLeadStatus,
} from "@/services/contacts/admin/update-lead";
import {
  validateAddLeadNote,
  validateUpdateLeadStatus,
} from "@/validation/contacts";

export async function updateLeadStatusAction(id, status) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const validation = validateUpdateLeadStatus(id, status);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  try {
    const updated = await updateLeadStatus(id, validation.data.status);
    if (!updated) {
      return { success: false, error: "Lead not found." };
    }
    revalidatePath("/admin/leads");
    return { success: true, lead: updated };
  } catch (err) {
    return { success: false, error: err.message || "Failed to update status." };
  }
}

export async function addLeadNoteAction(id, noteText) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const validation = validateAddLeadNote(id, noteText);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  try {
    const updated = await addLeadNote(id, validation.data.noteText);
    if (!updated) {
      return { success: false, error: "Lead not found." };
    }
    revalidatePath("/admin/leads");
    return { success: true, lead: updated };
  } catch (err) {
    return { success: false, error: err.message || "Failed to add note." };
  }
}

