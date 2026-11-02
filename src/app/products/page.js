import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductBento } from "@/components/home/product-bento";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Industrial Cork Products & Custom Components",
  description:
    "Explore United Rubber Cork's full range of rubberised cork sheets, transformer gasket frames, automotive seals, and plain natural cork sheets.",
  path: "/products",
});

const PRODUCT_METRICS = [
  { label: "Standard Sheet Formats", value: "915 × 610 / 915 × 915 mm" },
  { label: "Thickness Availability", value: "1.0 mm to 25.0 mm" },
  { label: "Elastomer Polymers", value: "NBR / Neoprene / SBR" },
  { label: "Testing Standard", value: "IS: 4253 / ASTM F104" },
];

export default function ProductsPage() {
  return (
    <>
      {/* 1. HERO SECTION — Clean, minimal & centered */}
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

      {/* 2. PRODUCT BENTO CATALOGUE */}
      <ProductBento />

      {/* 3. DRAWING & CUSTOM TOOLING CALLOUT */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl border border-line bg-page/60 p-8 sm:p-12 text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center justify-center size-12 rounded-full bg-maroon/10 text-maroon mb-4">
              <Cpu className="size-6" />
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Need custom drawing profiles or endless molded rings?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              We fabricate custom-dimension circular rings, rectangular frames, dovetail joints, and complex gasket geometries with CNC precision directly from your technical drawings or physical samples.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="md" className="rounded-full px-7 shadow-xs">
                Submit drawing for quotation
              </Button>
              <Button href="/industries" variant="secondary" size="md" className="rounded-full px-7">
                Explore application sectors
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
