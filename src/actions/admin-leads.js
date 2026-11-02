"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import {
  updateLeadStatus,
  addLeadNote,
  deleteLead,
  getLeadById,
} from "@/lib/leads-db";

export async function updateLeadStatusAction(id, status) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  try {
    const updated = await updateLeadStatus(id, status);
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

  if (!noteText || !noteText.trim()) {
    return { success: false, error: "Note cannot be empty." };
  }

  try {
    const updated = await addLeadNote(id, noteText.trim());
    if (!updated) {
      return { success: false, error: "Lead not found." };
    }
    revalidatePath("/admin/leads");
    return { success: true, lead: updated };
  } catch (err) {
    return { success: false, error: err.message || "Failed to add note." };
  }
}

export async function deleteLeadAction(id) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  try {
    const success = await deleteLead(id);
    if (!success) {
      return { success: false, error: "Lead not found." };
    }
    revalidatePath("/admin/leads");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || "Failed to delete lead." };
  }
}

