"use client";

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
        {/* Main Hero Container — Clean, spacious, and minimal */}
        <div className="relative rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-10 lg:p-14">
          <div className="max-w-3xl">
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
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
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

          </div>
        </div>
      </Container>
    </section>
  );
}