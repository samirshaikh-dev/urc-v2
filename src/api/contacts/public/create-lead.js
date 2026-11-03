"use server";

import { revalidatePath } from "next/cache";
import { createLead } from "@/services/contacts/public/create-lead";
import { validateCreateLead } from "@/validation/contacts";

export async function createLeadAction(payload) {
  const validation = validateCreateLead(payload);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  try {
    const lead = await createLead(validation.data);
    revalidatePath("/admin/leads");
    return { success: true, lead };
  } catch (err) {
    console.error("createLeadAction error:", err);
    return { success: false, error: err.message || "Failed to submit enquiry." };
  }
}

