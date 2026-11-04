import { AboutHero } from "@/components/about/about-hero";
import { AboutWhoWeAre } from "@/components/about/about-who-we-are";
import { AboutWhatWeDo } from "@/components/about/about-what-we-do";
import { AboutApproach } from "@/components/about/about-approach";
import { AboutCTA } from "@/components/about/about-cta";
import {
  constructMetadata,
  getAboutPageJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About Us | United Rubber Cork — Indian Cork & Rubberised Cork Manufacturer",
  description:
    "Over 13 years of manufacturing expertise in GIDC Vapi, Gujarat. United Rubber Cork manufactures specialized cork sheets, transformer gaskets, clutch plate materials, and generator foundation slabs.",
  path: "/about",
});

export default function AboutPage() {
  const aboutJsonLd = getAboutPageJsonLd();
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([aboutJsonLd, breadcrumbJsonLd]),
        }}
      />
      {/* 01. HERO – ABOUT UNITED RUBBER CORK */}
      <AboutHero />

      {/* 02. WHO WE ARE (2-COLUMN EDITORIAL + IMAGE) */}
      <AboutWhoWeAre />

      {/* 03. WHAT WE DO (CORE PRODUCT & GRADE HIGHLIGHTS) */}
      <AboutWhatWeDo />

      {/* 04. OUR APPROACH (3 PRINCIPLES: MATERIAL QUALITY, APPLICATION SOLUTIONS, RELIABLE SUPPLY) */}
      <AboutApproach />

      {/* 05. CONTACT CTA */}
      <AboutCTA />
    </>
  );
}
