import { ContactHero } from "@/components/contact/contact-hero";
import { ContactSection } from "@/components/contact/contact-section";
import { ContactLocations } from "@/components/contact/contact-locations";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us & Factory Locations",
  description:
    "Contact United Rubber Cork for material quotations, CAD drawing evaluations, technical sample requests, and bulk supply coordination.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* 1. CONTACT HERO */}
      <ContactHero />

      {/* 2. CONTACT FORM & PROCESS WORKFLOW */}
      <ContactSection />

      {/* 3. PHYSICAL LOCATIONS & DIRECT CHANNELS */}
      <ContactLocations />
    </>
  );
}