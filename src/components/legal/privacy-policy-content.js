import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  Eye,
  Server,
  UserCheck,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { SITE_CONFIG } from "@/lib/constants";

export const PRIVACY_TOC = [
  { id: "introduction", label: "Introduction & Scope" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "purpose-and-usage", label: "How We Use Your Information" },
  { id: "blueprint-confidentiality", label: "Confidentiality of Engineering Drawings" },
  { id: "cookies-and-tracking", label: "Cookies & Tracking Technologies" },
  { id: "data-protection-security", label: "Data Security & Storage Safeguards" },
  { id: "third-party-disclosure", label: "Third-Party Disclosures & Sharing" },
  { id: "data-retention", label: "Data Retention Periods" },
  { id: "user-rights", label: "Your Rights & Choices" },
  { id: "children-privacy", label: "Children's Privacy" },
  { id: "policy-updates", label: "Changes to This Privacy Policy" },
  { id: "grievance-contact", label: "Contact & Grievance Redressal" },
];

export function PrivacyPolicyContent() {
  return (
    <article className="rounded-3xl border border-line bg-white p-6 sm:p-10 lg:p-12 shadow-xs space-y-12 text-ink">
      {/* 01. Introduction */}
      <section id="introduction" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          1. Introduction &amp; Scope
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Welcome to <strong>{SITE_CONFIG.name}</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us,&rdquo; or &ldquo;URC&rdquo;). We are a dedicated Indian manufacturer and bulk supplier of engineered rubberised cork sheets, transformer gaskets, automotive fluid seals, and vibration damping slabs, operating from our manufacturing facility in Vapi, Gujarat, India.
          </p>
          <p>
            This Privacy Policy sets out how we collect, process, store, and safeguard business and personal information when you visit our website (<code>amcorkindia.com</code>), request technical specifications, submit drawings, or engage with our sales and engineering departments for commercial procurement.
          </p>
          <p>
            We are committed to respecting your privacy, protecting your commercial intelligence, and handling all shared engineering documents with strict industrial confidentiality.
          </p>
        </div>
      </section>

      {/* 02. Information We Collect */}
      <section id="information-we-collect" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          2. Information We Collect
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          Because our platform functions as a business-to-business (B2B) manufacturing interface, we collect only information that is necessary to evaluate engineering requirements, provide accurate commercial quotations, and fulfill supply contracts.
        </p>

        <div className="space-y-6 pt-2">
          <div className="rounded-2xl border border-line bg-page/60 p-5 space-y-2">
            <h3 className="text-sm font-semibold text-ink sm:text-base">
              A. Information You Provide Voluntarily
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
              <li>
                <strong>Contact &amp; Identification Data:</strong> Full name, professional email address, direct telephone or WhatsApp number, job designation, company name, and official facility or billing address.
              </li>
              <li>
                <strong>Technical Inquiry &amp; RFQ Information:</strong> Specific material requirements (such as NBR, Neoprene, or SBR bonded cork), sheet thicknesses (e.g., 1.0 mm to 25 mm), overall dimensions, target volume or batch frequency, operating fluid compatibility, and application constraints.
              </li>
              <li>
                <strong>Engineering Blueprints &amp; CAD Files:</strong> Customer-supplied technical drawings, 2D PDF specifications, DXF/DWG tooling files, or physical gasket samples sent for reverse engineering and CNC cut matching.
              </li>
              <li>
                <strong>Commercial Correspondence:</strong> Inquiries, quotation negotiations, purchase orders, delivery preferences, and payment or GST documentation.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-page/60 p-5 space-y-2">
            <h3 className="text-sm font-semibold text-ink sm:text-base">
              B. Automatically Collected Technical Data
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
              <li>
                <strong>Server Log &amp; Connection Data:</strong> Internet Protocol (IP) address, approximate geographic location (city/state level), browser type and version, operating system, referring URL, and pages visited.
              </li>
              <li>
                <strong>Operational Diagnostics:</strong> Timestamps of visits, page load performance metrics, and error logs collected solely to maintain server stability, prevent cyber threats, and monitor site availability.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 03. How We Use Your Information */}
      <section id="purpose-and-usage" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          3. How We Use Your Information
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          We use the information we collect strictly for legitimate industrial and commercial purposes, including:
        </p>

        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div className="rounded-xl border border-line bg-white p-4 space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-maroon">
              Quotation &amp; Engineering Review
            </h4>
            <p className="text-xs leading-relaxed text-muted">
              Analyzing your application parameters, verifying elastomer matrix suitability against transformer oil or fuels, and calculating formal pricing and tooling setup costs.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-4 space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-maroon">
              Sample Verification &amp; Dispatch
            </h4>
            <p className="text-xs leading-relaxed text-muted">
              Formulating material swatches or pilot CNC-cut test gaskets and coordinating physical courier dispatch to your inspection facility or testing laboratory.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-4 space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-maroon">
              Order Fulfillment &amp; Invoicing
            </h4>
            <p className="text-xs leading-relaxed text-muted">
              Processing purchase orders, generating statutory tax invoices with GSTIN compliance, coordinating freight transportation, and tracking delivery to your warehouse.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-4 space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-maroon">
              Platform Integrity &amp; Security
            </h4>
            <p className="text-xs leading-relaxed text-muted">
              Guarding against automated spam, denial-of-service attempts, fraudulent inquiries, and ensuring continuous HTTPS data encryption across all forms.
            </p>
          </div>
        </div>
      </section>

      {/* 04. Blueprint Confidentiality */}
      <section id="blueprint-confidentiality" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          4. Confidentiality of Engineering Drawings &amp; Blueprints
        </h2>
        <div className="rounded-2xl border border-line bg-field/80 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-ink font-semibold text-sm sm:text-base">
            <Lock className="size-4 text-maroon shrink-0" aria-hidden="true" />
            <span>Industrial Non-Disclosure Guarantee</span>
          </div>
          <p className="text-xs leading-relaxed text-muted sm:text-sm">
            We understand that CAD files, transformer cover blueprints, and custom automotive gasket designs represent critical intellectual property. When you upload or email engineering drawings to United Rubber Cork:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li>Your drawings are accessed solely by authorized manufacturing engineers and estimating staff directly involved in tooling and price quotation.</li>
            <li>We never publish, license, or share proprietary customer blueprints with third parties or competitors.</li>
            <li>Drawings are stored in secure directories and utilized strictly to verify dimensional fit, punch tooling, or CNC knife cutting programs.</li>
            <li>If your procurement policy requires a formal bilateral Non-Disclosure Agreement (NDA) prior to blueprint transmission, our management will review and execute standard mutual NDAs upon request.</li>
          </ul>
        </div>
      </section>

      {/* 05. Cookies & Tracking Technologies */}
      <section id="cookies-and-tracking" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          5. Cookies &amp; Tracking Technologies
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Our website uses small text files called cookies to facilitate basic site operation, maintain session security, and retain user preferences.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li>
              <strong>Strictly Necessary Cookies:</strong> Essential for routing, form submission state, security verification, and accessibility features. Without these cookies, the website cannot function properly.
            </li>
            <li>
              <strong>Performance &amp; Diagnostics Cookies:</strong> Aggregate, anonymized metrics used to gauge server load and response times. These do not track personal identifying information across external websites.
            </li>
            <li>
              <strong>No Advertising Trackers:</strong> We do not deploy third-party behavioral profiling cookies or cross-site commercial advertising trackers on this manufacturing website.
            </li>
          </ul>
          <p className="text-xs text-muted pt-1">
            You can configure your browser to reject all or some browser cookies, or to alert you when websites set cookies. If you disable cookies, certain core areas of the website may experience reduced responsiveness.
          </p>
        </div>
      </section>

      {/* 06. Data Security & Storage Safeguards */}
      <section id="data-protection-security" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          6. Data Security &amp; Storage Safeguards
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            We implement administrative, technical, and physical safeguards designed to protect personal and business data against accidental, unlawful, or unauthorized destruction, loss, alteration, access, disclosure, or misuse:
          </p>
          <div className="grid gap-3 sm:grid-cols-3 pt-1">
            <div className="rounded-xl border border-line bg-page/50 p-4 space-y-1">
              <span className="text-xs font-semibold uppercase text-ink block">TLS / HTTPS Encryption</span>
              <p className="text-xs text-muted">All web traffic and form inputs are encrypted in transit using industry-standard Transport Layer Security.</p>
            </div>
            <div className="rounded-xl border border-line bg-page/50 p-4 space-y-1">
              <span className="text-xs font-semibold uppercase text-ink block">Access Control</span>
              <p className="text-xs text-muted">Inquiry data and drawing files are restricted strictly to authorized sales and engineering personnel.</p>
            </div>
            <div className="rounded-xl border border-line bg-page/50 p-4 space-y-1">
              <span className="text-xs font-semibold uppercase text-ink block">Secure Infrastructure</span>
              <p className="text-xs text-muted">Hosted on monitored, high-availability server infrastructure with routine security patches and firewall protection.</p>
            </div>
          </div>
          <p className="text-xs text-muted">
            While we apply stringent security measures, please note that no electronic transmission over the internet or storage system can be guaranteed to be 100% immune from sophisticated intrusion. We urge you to exercise caution when transmitting sensitive credentials.
          </p>
        </div>
      </section>

      {/* 07. Third-Party Disclosures & Sharing */}
      <section id="third-party-disclosure" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          7. Third-Party Disclosures &amp; Sharing
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            <strong>We do not sell, rent, trade, or monetize your personal or commercial contact information to third-party marketing companies.</strong>
          </p>
          <p>
            We share business information only under the following limited circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li>
              <strong>Logistics &amp; Freight Carriers:</strong> Sharing shipping addresses and contact telephone numbers with trusted courier and logistics partners to deliver physical gasket samples, pallets, or container consignments from our Vapi works.
            </li>
            <li>
              <strong>Hosting &amp; Technical Infrastructure:</strong> With technology service providers who support our web hosting, database maintenance, and email delivery, bound by confidentiality requirements.
            </li>
            <li>
              <strong>Legal &amp; Statutory Compliance:</strong> When required by Indian law, judicial decree, or governmental authorities (such as GST or tax audit authorities), or to defend our legal rights and enforce contracts.
            </li>
          </ul>
        </div>
      </section>

      {/* 08. Data Retention Periods */}
      <section id="data-retention" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          8. Data Retention Periods
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            We retain personal and commercial data only for as long as necessary to fulfill the purposes outlined in this policy:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li>
              <strong>Commercial &amp; Tax Records:</strong> Invoices, purchase orders, and proof of delivery are retained for statutory periods mandated under Indian commercial, companies, and Goods and Services Tax (GST) laws (typically up to 8 financial years).
            </li>
            <li>
              <strong>Engineering Blueprints &amp; Tooling Profiles:</strong> Retained for active client accounts to facilitate repeat batch manufacturing, ensure dimensional consistency, and support warranty verification.
            </li>
            <li>
              <strong>Unconverted Inquiries:</strong> Inquiries that do not culminate in commercial orders are retained for periodic commercial follow-up and are purged when no longer operationally necessary, or upon verified deletion request.
            </li>
          </ul>
        </div>
      </section>

      {/* 09. Your Rights & Choices */}
      <section id="user-rights" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          9. Your Rights &amp; Choices
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Depending on your jurisdiction and in accordance with applicable Indian digital data protection principles, you possess rights regarding the personal information we maintain:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li><strong>Right to Access:</strong> You may request confirmation of whether we process your personal data and obtain a copy of the records held.</li>
            <li><strong>Right to Rectification:</strong> You may request correction of inaccurate, incomplete, or outdated business or contact information.</li>
            <li><strong>Right to Erasure:</strong> You may request the deletion of your contact records where statutory retention obligations (e.g., GST or audit rules) do not apply.</li>
            <li><strong>Right to Withdraw Consent:</strong> Where processing relies on voluntary consent, you may withdraw that consent at any time without retroactive impact.</li>
          </ul>
          <p className="text-xs text-muted pt-1">
            To exercise any of these rights, please submit a written request to <a href={`mailto:${COMPANY_INFO.email}`} className="text-maroon underline font-medium">{COMPANY_INFO.email}</a>. We respond to verified requests within reasonable commercial timeframes.
          </p>
        </div>
      </section>

      {/* 10. Children's Privacy */}
      <section id="children-privacy" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          10. Children&apos;s Privacy
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          Our website and manufacturing services are exclusively intended for industrial procurement professionals, engineers, corporate buyers, and institutional representatives aged 18 and above. We do not knowingly solicit or collect personal information from minors. If you believe a child has provided us with personal information, please notify us immediately for prompt deletion.
        </p>
      </section>

      {/* 11. Changes to This Privacy Policy */}
      <section id="policy-updates" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          11. Changes to This Privacy Policy
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          We may update this Privacy Policy from time to time to reflect amendments in manufacturing operations, statutory regulations, or digital platform features. The &ldquo;Last Updated&rdquo; date at the top of this document indicates when the latest revisions took effect. We encourage visitors to review this page periodically to stay informed about how we protect commercial data.
        </p>
      </section>

      {/* 12. Contact & Grievance Redressal */}
      <section id="grievance-contact" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          12. Contact &amp; Grievance Redressal
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          For any questions, concerns, feedback, or formal data requests relating to this Privacy Policy, please contact our compliance desk:
        </p>

        <div className="rounded-2xl border border-line bg-page/70 p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="font-semibold text-ink block">Entity Name:</span>
              <span className="text-muted">{SITE_CONFIG.name}</span>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-ink block">Official Email:</span>
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-maroon underline font-medium">
                {COMPANY_INFO.email}
              </a>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-ink block">Direct Telephone:</span>
              <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, "")}`} className="text-maroon underline font-medium">
                {COMPANY_INFO.phone}
              </a>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-ink block">Operating Hours:</span>
              <span className="text-muted">{COMPANY_INFO.workingHours}</span>
            </div>
          </div>

          <div className="border-t border-line pt-3 text-xs sm:text-sm space-y-1">
            <span className="font-semibold text-ink block">Manufacturing Works &amp; Office:</span>
            <span className="text-muted leading-relaxed block">
              {COMPANY_INFO.address.street}, {COMPANY_INFO.address.city} — {COMPANY_INFO.address.pincode} ({COMPANY_INFO.address.state}), {COMPANY_INFO.address.country}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}

