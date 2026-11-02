import { IndustriesHero } from "@/components/industries/industries-hero";
import { IndustriesList } from "@/components/industries/industries-list";
import { IndustriesCallout } from "@/components/industries/industries-callout";
import { FinalCTA } from "@/components/home/final-cta";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Industries We Serve",
  description:
    "Engineered rubberised cork materials and precision gasket manufacturing solutions for electrical transformers, automotive OEMs, railways, aerospace, marine, and construction across India.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      {/* 1. INDUSTRIES HERO */}
      <IndustriesHero />

      {/* 2. SECTORS DEEP-DIVE LIST */}
      <IndustriesList />

      {/* 3. CUSTOM SPECIFICATION & TOOLING CALLOUT */}
      <IndustriesCallout />

      {/* 4. FINAL CTA */}
      <FinalCTA />
    </>
  );
}