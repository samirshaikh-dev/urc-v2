import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const PRODUCT_METRICS = [
  { label: "Standard Sheet Formats", value: "915 × 610 / 915 × 915 mm" },
  { label: "Thickness Availability", value: "1.0 mm to 25.0 mm" },
  { label: "Elastomer Polymers", value: "NBR / Neoprene / SBR" },
  { label: "Testing Standard", value: "IS: 4253 / ASTM F104" },
];

export function ProductsHero() {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
      <Container>
        <div className="relative rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-12 lg:p-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-page px-3.5 py-1 text-xs font-medium text-ink/80">
              <span className="size-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
              <span>Engineered Material Catalogue</span>
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem]">
              Industrial cork sheets &amp;{" "}
              <span className="text-maroon">cut components.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Standard dimension sheets and precision-fabricated gaskets engineered to withstand hot mineral transformer oils, severe automotive vibrations, and aggressive industrial fluids.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="md" className="rounded-full px-6 shadow-sm">
                Request custom quotation
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
              <Button href="#products" variant="secondary" size="md" className="rounded-full px-6">
                Browse product catalogue
              </Button>
            </div>
          </div>

          {/* Quick Specs Ticker */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-4 lg:gap-6">
            {PRODUCT_METRICS.map((metric) => (
              <div key={metric.label} className="flex flex-col text-center sm:text-left">
                <span className="text-xs text-muted font-normal">{metric.label}</span>
                <span className="mt-1 text-sm font-semibold text-ink sm:text-base">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
