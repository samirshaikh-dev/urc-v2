import { AboutHero } from "@/components/about/about-hero";
import { AboutPillars } from "@/components/about/about-pillars";
import { AboutCallout } from "@/components/about/about-callout";
import { FinalCTA } from "@/components/home/final-cta";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About Us & Manufacturing Heritage",
  description:
    "Learn about United Rubber Cork — dedicated Indian manufacturer and bulk supplier of high-resilience rubberised cork sheets, transformer gaskets, and engineered cork composites.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* 1. ABOUT HERO */}
      <AboutHero />

      {/* 2. CORE MANUFACTURING PILLARS */}
      <AboutPillars />

      {/* 3. CALLOUT */}
      <AboutCallout />

      {/* 4. FINAL CTA */}
      <FinalCTA />
    </>
  );
}