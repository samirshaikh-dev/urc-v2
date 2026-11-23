import {
  generateAdminNotificationEmail,
  generateCustomerConfirmationEmail,
} from "@/Template";
import { getMailTransporter } from "@/lib/mail";

export async function sendContactInquiryEmails(lead) {
  const transporter = getMailTransporter();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "United Rubber Cork";
  const fromEmail = process.env.SMTP_EMAIL;

  // Use dedicated lead notification email if set; avoid dummy placeholder "admin@urc.com"
  const adminEmail =
    process.env.LEAD_NOTIFICATION_EMAIL ||
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    (process.env.ADMIN_EMAIL && !process.env.ADMIN_EMAIL.endsWith("@urc.com")
      ? process.env.ADMIN_EMAIL
      : null) ||
    process.env.SMTP_EMAIL;

  if (!transporter || !fromEmail) {
    console.warn(
      "[mail] SMTP credentials are not fully configured in environment. Skipped dispatching emails."
    );
    return { success: false, reason: "SMTP not configured" };
  }

  const results = {
    customerEmailSent: false,
    adminEmailSent: false,
  };

  // 1. Customer Confirmation Email
  try {
    if (lead.email) {
      console.log(`[mail] Dispatching customer confirmation to: ${lead.email}`);
      const info = await transporter.sendMail({
        from: `"${siteName}" <${fromEmail}>`,
        to: lead.email,
        subject: `Thank you for your enquiry | ${siteName}`,
        html: generateCustomerConfirmationEmail(lead),
      });
      console.log(`[mail] Customer confirmation sent. MessageId: ${info.messageId}`);
      results.customerEmailSent = true;
    }
  } catch (err) {
    console.error("[mail] Failed to send customer confirmation email:", err.message);
  }

  // 2. Admin Notification Email
  try {
    if (adminEmail) {
      console.log(`[mail] Dispatching admin lead alert to: ${adminEmail}`);
      const info = await transporter.sendMail({
        from: `"${siteName} Leads" <${fromEmail}>`,
        to: adminEmail,
        replyTo: lead.email,
        subject: `[New Lead] ${lead.company} - ${lead.product || "General Requirement"}`,
        html: generateAdminNotificationEmail(lead),
      });
      console.log(`[mail] Admin lead alert sent. MessageId: ${info.messageId}`);
      results.adminEmailSent = true;
    } else {
      console.warn("[mail] No admin destination email configured to receive lead alerts.");
    }
  } catch (err) {
    console.error("[mail] Failed to send admin notification email:", err.message);
  }

  return { success: true, ...results };
}
