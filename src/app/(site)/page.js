import { HeroSection } from "@/components/home/hero-section";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { ProductBento } from "@/components/home/product-bento";
import { ProcessFlow } from "@/components/home/process-flow";
import { IndustrySlider } from "@/components/home/industry-slider";
import { TechnicalFAQ, HOME_FAQS } from "@/components/home/technical-faq";
import { FinalCTA } from "@/components/home/final-cta";
import { constructMetadata, getFaqPageJsonLd } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Rubberised Cork Manufacturer in Vapi, Gujarat | United Rubber Cork",
  description:
    "Leading manufacturer of IS: 4253 & ASTM certified rubberised cork sheets, transformer gaskets, clutch wads, foundation slabs, and acoustic cork in GIDC Vapi, Gujarat.",
  path: "",
});

export default function Home() {
  const faqJsonLd = getFaqPageJsonLd(HOME_FAQS);

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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