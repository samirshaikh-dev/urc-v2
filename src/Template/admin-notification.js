import { escapeHtml } from "./utils.js";

export function generateAdminNotificationEmail(lead) {
  const { name, company, email, phone, product, message } = lead;
  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F5F5F5; color: #111111;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F5F5F5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Admin Header -->
          <tr>
            <td style="background-color: #650510; padding: 28px; text-align: left;">
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #FCC813; display: block; margin-bottom: 4px;">
                Admin Portal Alert
              </span>
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #FFFFFF;">
                New Website Lead Received
              </h1>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 14px; line-height: 1.6;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; width: 140px; font-weight: 500;">Prospect Name:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; font-weight: 700; color: #111111;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 500;">Company:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; font-weight: 600; color: #111111;">${escapeHtml(company)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 500;">Email Address:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; color: #650510; font-weight: 600;">
                    <a href="mailto:${escapeHtml(email)}" style="color: #650510; text-decoration: none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 500;">Phone:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; color: #111111;">
                    ${phone ? `<a href="tel:${escapeHtml(phone)}" style="color: #111111; text-decoration: none;">${escapeHtml(phone)}</a>` : "<span style='color: #9CA3AF;'>Not provided</span>"}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 500;">Interested Product:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; font-weight: 600; color: #F58634;">${escapeHtml(product || "General Inquiry")}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 500;">Submitted At:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280;">${escapeHtml(submittedAt)} IST</td>
                </tr>
              </table>

              <!-- Requirement Box -->
              <div style="margin-top: 20px; padding: 16px; background-color: #F9FAFB; border-radius: 8px; border: 1px solid #E5E7EB;">
                <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6B7280; display: block; margin-bottom: 6px;">
                  Customer Requirements &amp; Message:
                </span>
                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1F2937; white-space: pre-line;">
                  ${escapeHtml(message)}
                </p>
              </div>

              <!-- Action Link -->
              <div style="margin-top: 24px; text-align: center;">
                <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Quotation Response — ${product || "United Rubber Cork"}`)}" style="display: inline-block; background-color: #650510; color: #FFFFFF; padding: 12px 24px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 9999px;">
                  Reply Directly to ${escapeHtml(name)}
                </a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

