import { Container } from "@/components/ui/container";
import { LegalPageHeader } from "@/components/legal/legal-page-header";
import { LegalSidebar } from "@/components/legal/legal-sidebar";
import { TermsContent, TERMS_TOC } from "@/components/legal/terms-content";
import { constructMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";
import { COMPANY_INFO } from "@/data/company";

export const metadata = constructMetadata({
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for United Rubber Cork. Read our official terms governing website usage, commercial quotations, custom gasket tolerances, freight terms, and supply contracts.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions | United Rubber Cork",
    description:
      "Standard terms and conditions of supply, website use, and commercial quotation for United Rubber Cork.",
    url: `${SITE_CONFIG.url}/terms-and-conditions`,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      email: COMPANY_INFO.email,
      telephone: COMPANY_INFO.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.state,
        postalCode: COMPANY_INFO.address.pincode,
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner */}
      <LegalPageHeader
        eyebrow="Commercial & Supply Framework"
        title="Terms & Conditions"
        description="Standard terms governing website evaluation, technical material data, commercial quotation issuance, custom CNC tooling, and batch manufacturing contracts."
        lastUpdated="November 2026"
        documentType="Official Commercial Terms & Conditions"
      />

      {/* Main Two-Column Document Section */}
      <section className="border-t border-line bg-page py-10 sm:py-14 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Left Column: Sidebar & Table of Contents */}
            <div className="lg:col-span-4 xl:col-span-4">
              <LegalSidebar tableOfContents={TERMS_TOC} />
            </div>

            {/* Right Column: Numbered Terms Document */}
            <div className="lg:col-span-8 xl:col-span-8">
              <TermsContent />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

