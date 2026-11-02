import { HeroSection } from "@/components/home/hero-section";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { ProductBento } from "@/components/home/product-bento";
import { ProcessFlow } from "@/components/home/process-flow";
import { IndustrySlider } from "@/components/home/industry-slider";
import { TechnicalFAQ } from "@/components/home/technical-faq";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. INDUSTRIAL ENGINEERING METRICS STRIP */}
      <MetricsStrip />

      {/* 3. PRODUCT CATALOGUE BENTO SHOWCASE */}
      <ProductBento />

      {/* 4. TRANSPARENT B2B PROCUREMENT WORKFLOW */}
      <ProcessFlow />

      {/* 5. INDUSTRIAL APPLICATIONS EMBLA CAROUSEL */}
      <IndustrySlider />

      {/* 6. TECHNICAL FAQ & MATERIAL SELECTION GUIDANCE */}
      <TechnicalFAQ />

      {/* 7. ARCHITECTURAL FINAL CALL TO ACTION */}
      <FinalCTA />
    </>
  );
}