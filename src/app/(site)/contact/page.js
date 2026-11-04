import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMain } from "@/components/contact/contact-main";
import { ContactMap } from "@/components/contact/contact-map";
import { ContactFinalCTA } from "@/components/contact/contact-final-cta";
import {
  constructMetadata,
  getContactPageJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us & Request a Quote | United Rubber Cork — GIDC Vapi",
  description:
    "Get in touch with United Rubber Cork in GIDC Vapi, Gujarat. Request quotations or engineering guidance for transformer gaskets, clutch plate wads, foundation slabs, and rubberised cork sheets.",
  path: "/contact",
});

export default function ContactPage() {
  const contactJsonLd = getContactPageJsonLd();
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([contactJsonLd, breadcrumbJsonLd]),
        }}
      />
      {/* 01. CONTACT HERO */}
      <ContactHero />

      {/* 02. ENQUIRY FORM + CONTACT INFORMATION (TWO-COLUMN EDITORIAL) */}
      <ContactMain />

      {/* 03. FIND US (COMPACT GOOGLE MAPS + DIRECTIONS) */}
      <ContactMap />

      {/* 04. FINAL CTA */}
      <ContactFinalCTA />
    </>
  );
}
