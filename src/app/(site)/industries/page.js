import { IndustriesHero } from "@/components/industries/industries-hero";
import { IndustriesList } from "@/components/industries/industries-list";
import { IndustriesGuidance } from "@/components/industries/industries-guidance";
import { FinalCTA } from "@/components/home/final-cta";
import { constructMetadata, getBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Industries We Serve",
  description:
    "Engineered rubberised cork materials and precision gasket manufacturing solutions for electrical transformers, automotive OEMs, railways, aerospace, marine, and construction across India.",
  path: "/industries",
});

export default function IndustriesPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {/* 1. INDUSTRIES HERO */}
      <IndustriesHero />

      {/* 2. SECTORS DEEP-DIVE LIST */}
      <IndustriesList />

      {/* 3. MATERIAL FIT & ENQUIRY GUIDANCE */}
      <IndustriesGuidance />

      {/* 4. FINAL CTA */}
      <FinalCTA />
    </>
  );
}
