import { escapeHtml } from "./utils.js";

/**
 * Customer confirmation email template.
 * Follows United Rubber Cork brand guidelines:
 * Deep Maroon (#650510), Orange (#F58634), Clean typography & surfaces.
 */
export function generateCustomerConfirmationEmail(lead) {
  const { name, company, product, message } = lead;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Received - United Rubber Cork</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F5F5F5; color: #111111;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F5F5F5; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #650510; padding: 32px 28px; text-align: left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #FCC813; display: block; margin-bottom: 6px;">
                      Direct Works Manufacturing
                    </span>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                      United Rubber Cork
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 28px 24px;">
              <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #111111;">
                Thank you for your enquiry, ${escapeHtml(name)}
              </h2>
              <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #4B5563;">
                We have received your requirement submitted for <strong>${escapeHtml(company)}</strong>. Our engineering and technical sales desk in GIDC Vapi is reviewing your material specifications.
              </p>

              <!-- Requirement Summary Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F9FAFB; border-radius: 12px; border: 1px solid #E5E7EB; margin-bottom: 24px; padding: 20px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 14px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #F58634;">
                      Enquiry Summary
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 13px; line-height: 1.5;">
                      <tr>
                        <td style="padding-bottom: 8px; color: #6B7280; width: 140px; vertical-align: top;">Product / Material:</td>
                        <td style="padding-bottom: 8px; font-weight: 600; color: #111111;">${escapeHtml(product || "Industrial Cork Solution")}</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 8px; color: #6B7280; vertical-align: top;">Company:</td>
                        <td style="padding-bottom: 8px; font-weight: 600; color: #111111;">${escapeHtml(company)}</td>
                      </tr>
                      ${
                        message
                          ? `<tr>
                        <td style="color: #6B7280; vertical-align: top;">Requirement Notes:</td>
                        <td style="color: #374151; white-space: pre-line;">${escapeHtml(message)}</td>
                      </tr>`
                          : ""
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps Callout -->
              <div style="border-left: 3px solid #650510; padding: 14px 16px; background-color: #FDF4F5; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
                <h4 style="margin: 0 0 6px; font-size: 13px; font-weight: 700; color: #650510;">
                  What to expect next:
                </h4>
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #4B5563;">
                  A technical representative will verify your dimensional tolerances, volume requirements, and standards conformance (IS: 4253 / ASTM F104), and reply with an official factory quotation within <strong>24 business hours</strong>.
                </p>
              </div>

              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #6B7280;">
                If your requirement is urgent or involves CAD drawings / custom tooling, you can also reach us directly by replying to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 24px 28px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #6B7280; text-align: center; line-height: 1.6;">
              <p style="margin: 0 0 6px; font-weight: 600; color: #111111;">
                United Rubber Cork — Works &amp; Headquarters
              </p>
              <p style="margin: 0 0 6px;">
                Phase II, GIDC Industrial Estate, Vapi - 396195, Gujarat, India
              </p>
              <p style="margin: 0; color: #9CA3AF;">
                Natural Cork Sheets • Rubberised Cork Gaskets • Vibration Damping • Custom CNC Fabrications
              </p>
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
