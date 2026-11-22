"use server";

import { revalidatePath } from "next/cache";
import { createEnquiry, updateEnquiryEmailStatus } from "@/services/contacts/public/create-enquiry";
import { validateCreateLead } from "@/validation/contacts";
import { sendContactInquiryEmails } from "@/services/mail";
import { COMPANY_INFO } from "@/data/company";

/**
 * Submit Enquiry — saves to DB first, then sends confirmation email.
 * Email failure never loses the enquiry.
 */
export async function createLeadAction(payload) {
  const validation = validateCreateLead(payload);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  let enquiry;
  try {
    enquiry = await createEnquiry({
      ...validation.data,
      submissionMethod: "email",
    });
  } catch (err) {
    console.error("[createLeadAction] DB save failed:", err);
    return { success: false, error: "Failed to save your enquiry. Please try again." };
  }

  // Fire email after confirmed DB persistence — failure must NOT surface as a lost enquiry.
  let emailFailed = false;
  try {
    const emailResult = await sendContactInquiryEmails(enquiry);
    const sent = emailResult?.customerEmailSent;
    await updateEnquiryEmailStatus(enquiry.id, sent ? "sent" : "failed").catch((e) => {
      console.error("[createLeadAction] Failed to update emailStatus:", e);
    });
    if (!sent) emailFailed = true;
  } catch (err) {
    console.error("[createLeadAction] Email dispatch error:", err);
    await updateEnquiryEmailStatus(enquiry.id, "failed").catch(() => {});
    emailFailed = true;
  }

  revalidatePath("/admin/contact");

  return {
    success: true,
    emailFailed,
    lead: {
      id: enquiry.id,
      name: enquiry.name,
      company: enquiry.company,
      email: enquiry.email,
      product: enquiry.product,
    },
  };
}

/**
 * Submit via WhatsApp — saves to DB first, then returns a prefilled WhatsApp URL.
 * WhatsApp is never opened before the enquiry is persisted.
 */
export async function createWhatsAppEnquiryAction(payload) {
  const validation = validateCreateLead(payload);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  let enquiry;
  try {
    enquiry = await createEnquiry({
      ...validation.data,
      submissionMethod: "whatsapp",
    });
  } catch (err) {
    console.error("[createWhatsAppEnquiryAction] DB save failed:", err);
    return { success: false, error: "Failed to save your enquiry. Please try again." };
  }

  revalidatePath("/admin/contact");

  const phone = validation.data.phone || "Not provided";
  const product = validation.data.product || "General Inquiry / Other";

  const whatsappMessage = [
    "Hello, I would like to enquire about your products.",
    "",
    `Enquiry Reference: ${enquiry.id}`,
    "",
    `Name: ${validation.data.name}`,
    `Company: ${validation.data.company}`,
    `Email: ${validation.data.email}`,
    `Phone: ${phone}`,
    `Product / Material: ${product}`,
    `Requirements: ${validation.data.message}`,
    "",
    "Please review my requirements and get back to me.",
  ].join("\n");

  const whatsappNumber = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return {
    success: true,
    whatsappUrl,
    lead: {
      id: enquiry.id,
      name: enquiry.name,
      company: enquiry.company,
      email: enquiry.email,
      product: enquiry.product,
    },
  };
}
