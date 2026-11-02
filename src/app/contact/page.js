import { ContactHero } from "@/components/contact/contact-hero";
import { ContactEnquiry } from "@/components/contact/contact-enquiry";
import { ContactLocations } from "@/components/contact/contact-locations";
import { ContactExplore } from "@/components/contact/contact-explore";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact & Request a Quote",
  description:
    "Contact United Rubber Cork to discuss rubberised cork sheets, gaskets, granules or custom components. Share dimensions, quantity and application details for a quotation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* 1. PAGE INTRO & DIRECT CONTACT */}
      <ContactHero />

      {/* 2. ENQUIRY FORM & WHAT HAPPENS NEXT */}
      <ContactEnquiry />

      {/* 3. MANUFACTURING & OFFICE LOCATIONS */}
      <ContactLocations />

      {/* 4. PRODUCT & INDUSTRY LINKS */}
      <ContactExplore />
    </>
  );
}
