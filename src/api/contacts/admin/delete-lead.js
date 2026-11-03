"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { deleteLead } from "@/services/contacts/admin/delete-lead";

export async function deleteLeadAction(id) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  if (!id || typeof id !== "string") {
    return { success: false, error: "Lead ID is required." };
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

