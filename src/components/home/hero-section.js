"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const SPEC_HIGHLIGHTS = [
  { label: "Thickness Range", value: "1.0 mm to 25.0 mm" },
  { label: "Elastomer Matrix", value: "NBR, Neoprene, SBR" },
  { label: "Standards Conformance", value: "IS: 4253 / ASTM / BS" },
  { label: "Standard Formats", value: "915 × 610 mm & Custom CNC" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
      <Container>
        {/* Main Hero Container — Rounded architectural card with refined light contrast */}
        <div className="relative rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-10 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Left Column: Narrative & Conversion Directives */}
            <div className="lg:col-span-7">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-page px-3 py-1 text-xs font-medium text-ink/80">
                <span className="size-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
                <span>B2B Industrial Material Manufacturing</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem]">
                Engineered rubberised cork for{" "}
                <span className="text-maroon">critical industrial sealing.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Precision-molded gaskets, high-resilience sheets, and custom CNC components formulated for hot dielectric transformer oil, severe automotive vibration, and heavy-duty flange containment.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/contact" size="md" className="rounded-full px-6 shadow-sm">
                  Request a quotation
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
                <Button
                  href="#products"
                  variant="secondary"
                  size="md"
                  className="rounded-full px-6"
                >
                  Explore product catalogue
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-xs font-medium text-muted">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-orange-ink" aria-hidden="true" />
                  <span>IS: 4253 & ASTM Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-orange-ink" aria-hidden="true" />
                  <span>Transformer-Oil Proof Sealing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="size-4 text-orange-ink" aria-hidden="true" />
                  <span>CAD / Drawing-Based CNC Tooling</span>
                </div>
              </div>
            </div>

            {/* Right Column: Layered Industrial Composition with Real Photography */}
            <div className="relative lg:col-span-5">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-field shadow-sm sm:aspect-[5/4] lg:aspect-square">
                <Image
                  src="/images/carousel-images/custom-molded-cork-components-manufacturing-vapi-gujarat-02.jpg"
                  alt="Precision molded rubberised cork components manufacturing at United Rubber Cork"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
                
                {/* Subtle scrim overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Technical Stat Chip */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-white/95 p-3.5 shadow-md backdrop-blur-md">
                  <p className="text-xs font-semibold text-ink">
                    Direct Manufacturing Facility Supply
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-muted">
                    Engineered elastomeric binder composites with zero continuous leakage under thermal cycling.
                  </p>
                  <div className="mt-2 flex items-center justify-between border-t border-line/60 pt-2 text-[10px] text-maroon font-semibold tracking-wide uppercase">
                    <span>915 × 610 mm / 915 × 915 mm</span>
                    <span>1.0 mm – 25.0 mm</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Specifications Strip Inside the Hero Card */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-4 lg:gap-6">
            {SPEC_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-xs text-muted font-normal">{item.label}</span>
                <span className="mt-1 text-sm font-semibold text-ink sm:text-base">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
