import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Building,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { SITE_CONFIG } from "@/lib/constants";

export const TERMS_TOC = [
  { id: "acceptance-of-terms", label: "Acceptance of Terms" },
  { id: "permitted-website-use", label: "Permitted Commercial Use" },
  { id: "intellectual-property", label: "Intellectual Property Rights" },
  { id: "specifications-data", label: "Technical Specifications & Material Guidance" },
  { id: "quotations-contract", label: "Quotations, Pricing & Contract Formation" },
  { id: "custom-tooling-drawings", label: "Customer Blueprints & Manufacturing Tolerances" },
  { id: "delivery-freight-taxes", label: "Delivery, Freight & Applicable Taxes" },
  { id: "inspection-claims", label: "Receiving Inspection & Batch Claims" },
  { id: "limitation-of-liability", label: "Limitation of Liability & Warranty Disclaimer" },
  { id: "third-party-links", label: "External & Third-Party Links" },
  { id: "governing-law", label: "Governing Law & Jurisdiction" },
  { id: "amendments-updates", label: "Amendments to Terms" },
  { id: "contact-inquiries", label: "Contact Information" },
];

export function TermsContent() {
  return (
    <article className="rounded-3xl border border-line bg-white p-6 sm:p-10 lg:p-12 shadow-xs space-y-12 text-ink">
      {/* 01. Acceptance of Terms */}
      <section id="acceptance-of-terms" className="scroll-mt-28 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          1. Acceptance of Terms
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the website located at <code>amcorkindia.com</code> and all subdomains, as well as any commercial inquiries, sample requests, Request for Quotations (RFQs), or purchase contracts entered into with <strong>{SITE_CONFIG.name}</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;URC&rdquo;).
          </p>
          <p>
            By accessing or browsing this website, downloading technical material specifications, submitting RFQ forms, or issuing a purchase order to United Rubber Cork, you acknowledge that you have read, understood, and agree to be legally bound by these Terms. If you do not agree to these Terms, please discontinue use of this website and our quoting facilities immediately.
          </p>
        </div>
      </section>

      {/* 02. Permitted Commercial Use */}
      <section id="permitted-website-use" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          2. Permitted Commercial Use &amp; User Responsibilities
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            This website is provided as an informational and commercial interface for engineers, procurement officers, OEMs, distributors, and manufacturing professionals evaluating industrial cork, rubberised cork sheets, transformer gaskets, and elastomer composites.
          </p>
          <p>
            You agree to use the website only for lawful, professional business purposes. You explicitly agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li>Engage in automated scraping, data mining, harvesting, or extraction of catalog parameters, pricing structures, or photography without our prior written consent.</li>
            <li>Submit fraudulent, deceptive, or misleading inquiry data, fabricated contact details, or false commercial RFQ submissions.</li>
            <li>Attempt to probe, scan, or breach the vulnerability of any system, network, or server hosting this website.</li>
            <li>Transmit malicious code, viruses, or disruptive scripts designed to compromise website integrity or user sessions.</li>
            <li>Use the website or its published data in any manner that infringes applicable Indian or international intellectual property laws.</li>
          </ul>
        </div>
      </section>

      {/* 03. Intellectual Property Rights */}
      <section id="intellectual-property" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          3. Intellectual Property Rights
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            All content published on this website—including but not limited to brand names, wordmarks, logos, product photographs, technical specifications, comparison tables, test matrices, engineering diagrams, copy, and layout code—is the exclusive intellectual property of United Rubber Cork or its authorized licensors and is protected under Indian Copyright and Trademark laws.
          </p>
          <p>
            You may download or print technical data sheets or specification previews solely for internal commercial evaluation and procurement review. Any commercial reproduction, public republishing, modification, distribution, or licensing of our proprietary content without express prior written permission from United Rubber Cork is strictly prohibited.
          </p>
        </div>
      </section>

      {/* 04. Technical Specifications & Material Guidance */}
      <section id="specifications-data" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          4. Technical Specifications &amp; Material Guidance
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Our manufactured products adhere to verified industrial benchmarks, including <strong>IS: 4253 (Part 1 &amp; Part 2)</strong>, <strong>ASTM F104</strong>, and relevant British Standards where indicated on specific product grade data.
          </p>
          <div className="rounded-2xl border border-line bg-page/60 p-5 space-y-2">
            <h3 className="text-sm font-semibold text-ink sm:text-base">
              Standard Manufacturing Dimensions &amp; Tolerances
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
              <li><strong>Standard Sheet Format:</strong> 915 mm × 610 mm (36&Prime; × 24&Prime;) unless custom block dimensions are explicitly confirmed.</li>
              <li><strong>Thickness Availability:</strong> Standard sheet thicknesses range from 1.0 mm to 25.0 mm. Finished components, continuous rolls, and molded rings are fabricated to order.</li>
              <li><strong>Test Values &amp; Guidance:</strong> Published physical parameters (compressibility, recovery, tensile strength, oil immersion swelling) represent typical factory laboratory test averages.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-field/80 p-4 text-xs text-muted leading-relaxed">
            <strong className="text-ink block mb-1">Customer Engineering Duty:</strong>
            Because actual operating conditions vary—including fluid compositions (mineral transformer oil, midel, synthetic esters, fuel blends), flange rigidity, operating bolt torque, and temperature cycles (-30°C to +120°C)—customers must evaluate material suitability and test representative samples in their specific operating assemblies prior to full-scale deployment.
          </div>
        </div>
      </section>

      {/* 05. Quotations, Pricing & Contract Formation */}
      <section id="quotations-contract" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          5. Quotations, Pricing &amp; Contract Formation
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Information, catalog specifications, and estimate request forms displayed on this website constitute an <em>invitation to treat</em> and do not represent a binding commercial offer to supply.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li>
              <strong>Quotation Issuance:</strong> Formal quotations are issued in writing (via email or official PDF) by our sales desk following engineering review of your required grade, dimensions, and batch volume.
            </li>
            <li>
              <strong>Validity of Quotations:</strong> Unless stated otherwise on the official quote, commercial quotations remain valid for thirty (30) calendar days from the date of issuance, subject to market fluctuations in virgin cork granules and synthetic elastomeric binders.
            </li>
            <li>
              <strong>Order Confirmation:</strong> A binding contract is formed only when United Rubber Cork formally acknowledges and accepts a customer&apos;s written Purchase Order (PO) via an official Order Confirmation or Proforma Invoice.
            </li>
          </ul>
        </div>
      </section>

      {/* 06. Customer Blueprints & Manufacturing Tolerances */}
      <section id="custom-tooling-drawings" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          6. Customer Blueprints &amp; Manufacturing Tolerances
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Where goods are manufactured to custom customer blueprints, CAD drawings, or physical sample gaskets:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li><strong>Accuracy of Drawings:</strong> The customer bears sole responsibility for the dimensional accuracy, tolerance specifications, and engineering adequacy of submitted blueprints.</li>
            <li><strong>Tooling &amp; Setup:</strong> Tooling formulation (steel-rule dies, CNC knife programming, or compression molds) is initiated following formal drawing sign-off. Any post-approval revisions requested by the customer may incur additional setup costs and production lead-time adjustments.</li>
            <li><strong>Third-Party IP Warranty:</strong> The customer warrants that blueprints, patterns, and specifications provided to United Rubber Cork do not infringe on any third-party patent, registered design, or proprietary rights.</li>
          </ul>
        </div>
      </section>

      {/* 07. Delivery, Freight & Applicable Taxes */}
      <section id="delivery-freight-taxes" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          7. Delivery, Freight &amp; Applicable Taxes
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Commercial orders are manufactured and dispatched directly from our works located in <strong>2nd Phase GIDC, Vapi — 396195, Gujarat, India</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li><strong>Delivery Terms:</strong> Unless explicitly agreed otherwise in writing (e.g., CIF, FOB, or door-delivery), commercial supplies are quoted on an Ex-Works (EXW Vapi) basis. Freight, insurance, and transit risk are borne by the purchaser.</li>
            <li><strong>Taxes &amp; Statutory Duties:</strong> Prices quoted are exclusive of Goods and Services Tax (GST), customs duties, and local octroi or entry levies, which will be billed at prevailing statutory rates on the official tax invoice.</li>
            <li><strong>Dispatch Schedules:</strong> Dispatch timelines communicated during quotation are good-faith estimates based on factory loading. We shall not be held liable for transit delays caused by courier disruptions, regional transport strikes, customs checkpoints, or Force Majeure events beyond our reasonable control.</li>
          </ul>
        </div>
      </section>

      {/* 08. Receiving Inspection & Batch Claims */}
      <section id="inspection-claims" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          8. Receiving Inspection &amp; Batch Claims
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Upon receipt of any consignment of cork sheets, rolls, or finished gaskets, the purchaser must promptly inspect the goods for quantity, physical transit condition, and dimensional conformity:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted sm:text-sm">
            <li><strong>Notice Period:</strong> Any claim regarding shortage, transit damage, or deviation from agreed technical specifications must be notified in writing to United Rubber Cork within <strong>seven (7) business days</strong> of delivery.</li>
            <li><strong>Supporting Documentation:</strong> Claims must include the invoice number, batch identifier, photographic documentation of packaging and defects, and representative samples if requested.</li>
            <li><strong>Remedy:</strong> If a defect is verified and attributable to manufacturing deviation, United Rubber Cork will, at its sole discretion, replace the non-conforming batch or issue a credit note for the invoice value of the affected material.</li>
          </ul>
        </div>
      </section>

      {/* 09. Limitation of Liability */}
      <section id="limitation-of-liability" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          9. Limitation of Liability &amp; Warranty Disclaimer
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Except as explicitly provided in an executed supply contract, all materials, data sheets, and services are supplied &ldquo;as is&rdquo; without implied warranties of merchantability or fitness for an unstated particular purpose.
          </p>
          <div className="rounded-2xl border border-line bg-page/60 p-5 space-y-2 text-xs text-muted sm:text-sm">
            <p>
              To the maximum extent permitted by applicable Indian law:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>United Rubber Cork&apos;s cumulative liability for any claim arising out of the sale, delivery, or use of our products shall not exceed the total net invoice price paid by the customer for the specific batch of goods giving rise to the claim.</li>
              <li>Under no circumstances shall United Rubber Cork, its partners, or employees be liable for indirect, incidental, special, punitive, or consequential damages—including loss of profits, downtime, equipment damage, plant shutdowns, or third-party fluid contamination.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10. External & Third-Party Links */}
      <section id="third-party-links" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          10. External &amp; Third-Party Links
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          This website may contain hyperlinks to external sites, such as Google Maps for facility directions or logistics carriers for consignment tracking. These links are provided solely for visitor convenience. We do not control, endorse, or accept responsibility for the content, privacy practices, or availability of third-party platforms.
        </p>
      </section>

      {/* 11. Governing Law & Jurisdiction */}
      <section id="governing-law" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          11. Governing Law &amp; Jurisdiction
        </h2>
        <div className="space-y-3.5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            These Terms &amp; Conditions and all commercial supply contracts entered into with United Rubber Cork shall be governed by, interpreted, and construed in accordance with the <strong>laws of India</strong>.
          </p>
          <p>
            In the event of any legal dispute, controversy, or claim arising out of or in connection with website use or material supply, the parties agree that the competent courts having jurisdiction over <strong>Vapi / Valsad district, Gujarat, India</strong> shall have exclusive jurisdiction.
          </p>
        </div>
      </section>

      {/* 12. Amendments to Terms */}
      <section id="amendments-updates" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          12. Amendments to Terms
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          We reserve the right to revise, modify, or update these Terms &amp; Conditions at our sole discretion. Any changes will become effective immediately upon posting to this website, with an updated &ldquo;Last Updated&rdquo; date. Continued access or submission of RFQs following posted updates constitutes your acceptance of the revised Terms.
        </p>
      </section>

      {/* 13. Contact Information */}
      <section id="contact-inquiries" className="scroll-mt-28 space-y-4 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          13. Contact Information
        </h2>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          For commercial terms inquiries, formal quotation validation, or legal notices, please contact United Rubber Cork:
        </p>

        <div className="rounded-2xl border border-line bg-page/70 p-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="font-semibold text-ink block">Manufacturing Entity:</span>
              <span className="text-muted">{SITE_CONFIG.name}</span>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-ink block">Official Email:</span>
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-maroon underline font-medium">
                {COMPANY_INFO.email}
              </a>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-ink block">Sales &amp; Inquiry Desk:</span>
              <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, "")}`} className="text-maroon underline font-medium">
                {COMPANY_INFO.phone}
              </a>
            </div>

            <div className="space-y-1">
              <span className="font-semibold text-ink block">Working Hours:</span>
              <span className="text-muted">{COMPANY_INFO.workingHours}</span>
            </div>
          </div>

          <div className="border-t border-line pt-3 text-xs sm:text-sm space-y-1">
            <span className="font-semibold text-ink block">Factory &amp; Works Address:</span>
            <span className="text-muted leading-relaxed block">
              {COMPANY_INFO.address.street}, {COMPANY_INFO.address.city} — {COMPANY_INFO.address.pincode} ({COMPANY_INFO.address.state}), {COMPANY_INFO.address.country}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}

