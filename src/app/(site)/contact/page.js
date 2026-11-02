import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMain } from "@/components/contact/contact-main";
import { ContactMap } from "@/components/contact/contact-map";
import { ContactFinalCTA } from "@/components/contact/contact-final-cta";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us & Request a Quote | United Rubber Cork",
  description:
    "Get in touch with United Rubber Cork. Request a quotation or technical guidance for transformer gaskets, clutch plate materials, foundation slabs, or rubberised cork sheets.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
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
