import Image from "next/image";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/data/industries";

export function IndustriesList() {
  return (
    <section id="sectors-list" className="scroll-mt-24 border-t border-line bg-page py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
            Application Architecture
          </span>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Specialized materials for demanding operating environments
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            Every sector demands specific elastomeric formulations. We match your operating fluids, bolt torques, and vibration levels to the verified cork composite.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {INDUSTRIES.map((sector, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={sector.id}
                id={sector.id}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-white shadow-xs transition-all duration-200 hover:border-maroon/30 hover:shadow-sm"
              >
                <div className={`grid lg:grid-cols-12 ${isEven ? "lg:flex-row-reverse" : ""}`}>
                  
                  {/* Visual Media Column */}
                  <div className={`relative min-h-[280px] lg:col-span-5 ${isEven ? "lg:order-2" : ""}`}>
                    <div className="relative h-full w-full bg-field">
                      <Image
                        src={sector.image}
                        alt={sector.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover object-center"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-maroon shadow-xs backdrop-blur-xs">
                          {sector.tagline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Specifications Column */}
                  <div className={`p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between ${isEven ? "lg:order-1" : ""}`}>
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-orange-ink uppercase tracking-wider">
                        <ShieldCheck className="size-4" />
                        <span>Industry Focus: {sector.tagline}</span>
                      </div>

                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                        {sector.title}
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                        {sector.description}
                      </p>

                      {/* Critical Requirement Callout */}
                      <div className="mt-6 rounded-2xl border border-line bg-page/70 p-4">
                        <span className="text-xs font-semibold text-maroon uppercase tracking-wider">
                          Primary Engineering Challenge:
                        </span>
                        <p className="mt-1 text-xs sm:text-sm font-medium text-ink">
                          {sector.keyRequirement}
                        </p>
                      </div>

                      {/* Typical Components Produced */}
                      <div className="mt-6">
                        <h4 className="text-xs font-semibold text-ink uppercase tracking-wider">
                          Typical Fabricated Components:
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {sector.typicalComponents.map((comp) => (
                            <span
                              key={comp}
                              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-field px-3 py-1 text-xs font-medium text-ink/80"
                            >
                              <CheckCircle2 className="size-3 text-orange-ink" />
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line/80 pt-6">
                      <div className="text-xs text-muted">
                        Available in sheets (915 × 610 mm) or finished CNC components.
                      </div>

                      <Button
                        href="/contact"
                        size="sm"
                        className="rounded-full px-5 text-xs font-semibold"
                      >
                        Request quote for this sector
                        <ArrowUpRight className="size-3.5 ml-1" />
                      </Button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
