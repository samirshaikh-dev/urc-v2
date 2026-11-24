import { escapeHtml } from "./utils.js";

/**
 * Customer confirmation email — United RubCork.
 *
 * Design: minimal, white background, clean typography, mobile-friendly.
 * Brand: Deep Maroon (#650510), Orange (#F58634), Yellow (#FCC813).
 * No gradients, no banners. Comfortable spacing throughout.
 */
export function generateCustomerConfirmationEmail(lead) {
  const { name, company, email, phone, product, message } = lead;

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Enquiry Received — United RubCork</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
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
            <td style="background-color: #650510; padding: 28px 32px;">
              <p style="margin: 0 0 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #FCC813;">United RubCork</p>
              <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.75); letter-spacing: 0.2px;">GIDC Vapi · Gujarat, India</p>
            </td>
          </tr>

          <!-- ── Greeting ── -->
          <tr>
            <td style="padding: 36px 32px 0;">
              <h1 style="margin: 0 0 12px; font-size: 22px; font-weight: 700; color: #111111; line-height: 1.3;">
                Thank you, ${escapeHtml(name)}.
              </h1>
              <p style="margin: 0; font-size: 15px; line-height: 1.65; color: #4B5563;">
                We've received your enquiry and your requirements have been saved. Our technical sales team will review your submission and get back to you as soon as possible.
              </p>
            </td>
          </tr>

          <!-- ── Divider ── -->
          <tr>
            <td style="padding: 24px 32px 0;">
              <hr style="border: none; border-top: 1px solid #F3F4F6; margin: 0;">
            </td>
          </tr>

          <!-- ── Enquiry summary ── -->
          <tr>
            <td style="padding: 24px 32px 0;">
              <p style="margin: 0 0 16px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9CA3AF;">Enquiry Summary</p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">

                <!-- Company -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; width: 36%; font-size: 13px; color: #6B7280;">Company</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; font-weight: 600; color: #111111;">${escapeHtml(company)}</td>
                </tr>

                <!-- Product -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; color: #6B7280;">Product / Material</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; font-weight: 600; color: #111111;">${escapeHtml(product || "General Inquiry / Other")}</td>
                </tr>

                ${phone ? `
                <!-- Phone -->
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; color: #6B7280;">Phone</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; vertical-align: top; font-size: 13px; color: #111111;">${escapeHtml(phone)}</td>
                </tr>` : ""}

                ${message ? `
                <!-- Requirements -->
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; font-size: 13px; color: #6B7280;">Requirements</td>
                  <td style="padding: 10px 0; vertical-align: top; font-size: 13px; color: #374151; line-height: 1.6; white-space: pre-line;">${escapeHtml(message)}</td>
                </tr>` : ""}

              </table>
            </td>
          </tr>

          <!-- ── What happens next ── -->
          <tr>
            <td style="padding: 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="background-color: #F9FAFB; border-radius: 8px; padding: 20px 20px; border-left: 3px solid #F58634;">
                    <p style="margin: 0 0 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #F58634;">What happens next</p>
                    <p style="margin: 0; font-size: 13px; line-height: 1.65; color: #4B5563;">
                      Our team will review your dimensional, material, and quantity requirements. If we need any clarification, we'll reach out to <strong style="color: #111111;">${escapeHtml(email)}</strong>. Expect a response within <strong style="color: #111111;">24 business hours</strong>.
                    </p>
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
            <td style="padding: 24px 32px; background-color: #FAFAFA;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 2px; font-size: 13px; font-weight: 700; color: #111111;">United RubCork</p>
                    <p style="margin: 0 0 10px; font-size: 12px; color: #6B7280;">No. 5, Balaji Complex, 2nd Phase GIDC, Vapi — 396195, Gujarat, India</p>
                    <p style="margin: 0; font-size: 12px; color: #9CA3AF; line-height: 1.6;">
                      Rubberised Cork Sheets &amp; Rolls &nbsp;·&nbsp; Transformer Gaskets &nbsp;·&nbsp;
                      Vibration Damping Pads &nbsp;·&nbsp; Custom Cork Fabrications
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Email card -->

        <!-- Legal note -->
        <p style="margin: 20px 0 0; font-size: 11px; color: #9CA3AF; text-align: center; line-height: 1.6;">
          You are receiving this email because you submitted an enquiry on unitedrubcork.com.<br>
          If this was not you, please disregard this message.
        </p>

      </td>
    </tr>
  </table>
  <!-- /Outer wrapper -->

</body>
</html>
  `.trim();
}
