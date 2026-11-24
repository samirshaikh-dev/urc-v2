import { escapeHtml } from "./utils.js";

/**
 * Admin notification email — United RubCork internal alert.
 *
 * Design: clean, functional, all lead fields visible at a glance.
 * Includes enquiry reference, submission method, and quick-reply CTA.
 */
export function generateAdminNotificationEmail(lead) {
  const { id, name, company, email, phone, product, message, submissionMethod } = lead;
  const refId = id || "—";
  const submittedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const methodLabel = submissionMethod === "whatsapp" ? "WhatsApp" : "Email Form";
  const methodColor = submissionMethod === "whatsapp" ? "#25D366" : "#F58634";

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Enquiry — ${escapeHtml(company)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F5F5F5;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Email card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E5E7EB;">

          <!-- ── Header ── -->
          <tr>
            <td style="background-color: #650510; padding: 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 2px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #FCC813;">United RubCork · Admin Alert</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #FFFFFF;">New Enquiry Received</p>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="display: inline-block; background-color: ${methodColor}; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">${escapeHtml(methodLabel)}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Reference + timestamp strip ── -->
          <tr>
            <td style="background-color: #FAFAFA; padding: 14px 32px; border-bottom: 1px solid #F3F4F6;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 11px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.8px;">Reference</p>
                    <p style="margin: 2px 0 0; font-size: 14px; font-weight: 700; font-family: 'Courier New', Courier, monospace; color: #650510;">${escapeHtml(refId)}</p>
                  </td>
                  <td align="right">
                    <p style="margin: 0; font-size: 11px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.8px;">Submitted</p>
                    <p style="margin: 2px 0 0; font-size: 12px; color: #6B7280;">${escapeHtml(submittedAt)} IST</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Lead details ── -->
          <tr>
            <td style="padding: 28px 32px 0;">
              <p style="margin: 0 0 16px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9CA3AF;">Contact Details</p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">

                <!-- Name -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; width: 34%; font-size: 13px; color: #6B7280;">Full Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; font-weight: 700; color: #111111;">${escapeHtml(name)}</td>
                </tr>

                <!-- Company -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; color: #6B7280;">Company</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; font-weight: 600; color: #111111;">${escapeHtml(company)}</td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; color: #6B7280;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px;">
                    <a href="mailto:${escapeHtml(email)}" style="color: #650510; font-weight: 600; text-decoration: none;">${escapeHtml(email)}</a>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; color: #6B7280;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; color: #111111;">
                    ${phone
                      ? `<a href="tel:${escapeHtml(phone)}" style="color: #111111; text-decoration: none;">${escapeHtml(phone)}</a>`
                      : `<span style="color: #9CA3AF;">Not provided</span>`
                    }
                  </td>
                </tr>

                <!-- Product -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; color: #6B7280;">Product / Material</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; font-weight: 600; color: #F58634;">${escapeHtml(product || "General Inquiry / Other")}</td>
                </tr>

                <!-- Submission method -->
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; font-size: 13px; color: #6B7280;">Submitted via</td>
                  <td style="padding: 10px 0; vertical-align: top; font-size: 13px; color: #111111;">
                    <span style="display: inline-block; background-color: ${methodColor}1A; color: ${methodColor === "#25D366" ? "#1a9e4e" : "#c26a1a"}; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px;">${escapeHtml(methodLabel)}</span>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ── Requirements ── -->
          <tr>
            <td style="padding: 24px 32px;">
              <p style="margin: 0 0 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9CA3AF;">Customer Requirements</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background-color: #F9FAFB; border-radius: 8px; padding: 16px 18px; border: 1px solid #F3F4F6;">
                    <p style="margin: 0; font-size: 13px; line-height: 1.7; color: #1F2937; white-space: pre-line;">${escapeHtml(message)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── CTA ── -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius: 999px; background-color: #650510;">
                    <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: Enquiry ${refId} — ${product || "United RubCork"}`)}&body=${encodeURIComponent(`Hi ${name},\n\nThank you for your enquiry (Ref: ${refId}).\n\n`)}"
                       style="display: inline-block; padding: 12px 24px; font-size: 13px; font-weight: 600; color: #FFFFFF; text-decoration: none; border-radius: 999px;">
                      Reply to ${escapeHtml(name)} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Divider ── -->
          <tr>
            <td style="padding: 0 32px;">
              <hr style="border: none; border-top: 1px solid #F3F4F6; margin: 0;">
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="padding: 20px 32px; background-color: #FAFAFA;">
              <p style="margin: 0; font-size: 11px; color: #9CA3AF; line-height: 1.6; text-align: center;">
                This is an internal notification generated by unitedrubcork.com.<br>
                Enquiry Ref: <strong style="color: #6B7280;">${escapeHtml(refId)}</strong> &nbsp;·&nbsp; United RubCork, Vapi, Gujarat
              </p>
            </td>
          </tr>

        </table>
        <!-- /Email card -->

      </td>
    </tr>
  </table>
  <!-- /Outer wrapper -->

</body>
</html>
  `.trim();
}
