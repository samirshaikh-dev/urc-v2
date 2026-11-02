import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/home/hero-section";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { ProductBento } from "@/components/home/product-bento";
import { ProcessFlow } from "@/components/home/process-flow";
import { IndustrySlider } from "@/components/home/industry-slider";
import { TechnicalFAQ } from "@/components/home/technical-faq";
import { QuoteForm } from "@/components/forms/quote-form";
import { FileCheck, Clock, Award, Shield } from "lucide-react";

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

      {/* 7. HIGH-CONVERSION B2B RFQ & QUOTE SECTION */}
      <section
        id="quote"
        tabIndex={-1}
        className="scroll-mt-24 border-t border-line bg-page py-16 sm:py-24 focus:outline-none"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
            {/* Left Narrative Guidance */}
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                Direct Manufacturing Quotation
              </span>
              <h2
                id="quote-title"
                className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl"
              >
                Request a technical quotation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Whether you need standard 915 × 610 mm sheets, custom CNC transformer gasket frames, or specialized automotive seals, our team reviews your exact drawings and operating conditions.
              </p>

              {/* Assurance Checklist */}
              <div className="mt-8 space-y-4 rounded-2xl border border-line bg-white p-6 shadow-2xs">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon">
                  What you can expect:
                </h3>
                
                <div className="flex items-start gap-3">
                  <Clock className="size-5 shrink-0 text-orange-ink mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-ink sm:text-sm">24-Hour Technical Turnaround</h4>
                    <p className="text-xs text-muted leading-tight mt-0.5">
                      Fast engineering assessment and commercial quote delivered to your inbox.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileCheck className="size-5 shrink-0 text-orange-ink mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-ink sm:text-sm">Drawing & Sample Verification</h4>
                    <p className="text-xs text-muted leading-tight mt-0.5">
                      Custom CAD files, PDF blueprints, or physical sample gaskets matched to exact tolerances.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Award className="size-5 shrink-0 text-orange-ink mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-ink sm:text-sm">IS: 4253 & ASTM Test Certificates</h4>
                    <p className="text-xs text-muted leading-tight mt-0.5">
                      Batch test certification covering compressibility, recovery, and oil immersion behavior.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="size-5 shrink-0 text-orange-ink mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-ink sm:text-sm">Direct Factory Supply</h4>
                    <p className="text-xs text-muted leading-tight mt-0.5">
                      Manufactured and dispatched from Vapi, Gujarat with nationwide transit coordination.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-8">
                <QuoteForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}