"use server";

import { revalidatePath } from "next/cache";
import { createLead } from "@/services/contacts/public/create-lead";
import { validateCreateLead } from "@/validation/contacts";
import { sendContactInquiryEmails } from "@/services/mail";

export async function createLeadAction(payload) {
  const validation = validateCreateLead(payload);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  try {
    const lead = await createLead(validation.data);

    // Fire email notifications to customer and admin asynchronously
    sendContactInquiryEmails(lead).catch((err) => {
      console.error("[createLeadAction] Email dispatch background error:", err);
    });

    revalidatePath("/admin/leads");
    return { success: true, lead };
  } catch (err) {
    console.error("createLeadAction error:", err);
    return { success: false, error: err.message || "Failed to submit enquiry." };
  }
}
