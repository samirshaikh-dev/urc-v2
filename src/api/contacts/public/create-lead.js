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
    console.log("[createLeadAction] Email dispatch results:", emailResult);
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

  revalidatePath("/admin/leads");
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
 * Submit via WhatsApp — attempts to save to DB, then returns a prefilled WhatsApp URL.
 * If DB save fails, the error is logged and WhatsApp is still opened — enquiry data
 * is never lost from the customer's perspective.
 */
export async function createWhatsAppEnquiryAction(payload) {
  const validation = validateCreateLead(payload);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  const { name, company, email, phone: rawPhone, product: rawProduct, message } = validation.data;
  const phone = rawPhone || "Not provided";
  const product = rawProduct || "General Inquiry / Other";

  // Attempt DB persistence — failure is non-blocking for the WhatsApp redirect.
  let enquiryId = null;
  let dbFailed = false;
  try {
    const enquiry = await createEnquiry({
      ...validation.data,
      submissionMethod: "whatsapp",
    });
    enquiryId = enquiry.id;
    revalidatePath("/admin/leads");
    revalidatePath("/admin/contact");
  } catch (err) {
    dbFailed = true;
    console.error("[createWhatsAppEnquiryAction] DB save failed — enquiry not persisted. Opening WhatsApp anyway.", err);
  }

  const whatsappMessage = [
    "Hello, I would like to enquire about your products.",
    "",
    ...(enquiryId ? [`Enquiry Reference: ${enquiryId}`, ""] : []),
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Product / Material: ${product}`,
    `Requirements: ${message}`,
    "",
    "Please review my requirements and get back to me.",
  ].join("\n");

  const whatsappNumber = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return {
    success: true,
    dbFailed,
    whatsappUrl,
    lead: {
      id: enquiryId,
      name,
      company,
      email,
      product,
    },
  };
}
