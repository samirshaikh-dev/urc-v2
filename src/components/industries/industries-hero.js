import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const SECTOR_METRICS = [
  { label: "Transformer Oil Seepage", value: "Zero Permeability" },
  { label: "Thermal Cycling Limit", value: "-30°C to +120°C" },
  { label: "Standards Conformance", value: "IS: 4253 / ASTM / BS" },
  { label: "Tooling Capabilities", value: "CNC & Die Profile Cut" },
];

export function IndustriesHero() {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
      <Container>
        <div className="relative rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-12 lg:p-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-page px-3.5 py-1 text-xs font-medium text-ink/80">
              <span className="size-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
              <span>Sector-Specific Material Engineering</span>
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem]">
              Industries we <span className="text-maroon">engineer for.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Demanding industrial assemblies require sealing and vibration dampening materials calibrated specifically for their operating media, mechanical torques, and thermal environments. Explore how United Rubber Cork serves mission-critical industrial applications across India.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="md" className="rounded-full px-6 shadow-sm">
                Request sector quotation
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
              <Button href="#sectors-list" variant="secondary" size="md" className="rounded-full px-6">
                Browse industry sectors
              </Button>
            </div>
          </div>

          {/* Quick Sector Ticker */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-4 lg:gap-6">
            {SECTOR_METRICS.map((metric) => (
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
