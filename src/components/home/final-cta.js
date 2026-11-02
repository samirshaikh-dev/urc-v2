import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, FileCheck2, Truck, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/data/company";

const ASSURANCES = [
  {
    icon: Clock,
    title: "24-Hour Turnaround",
    detail: "Drawing analysis and formal commercial quotation delivered within one business day.",
  },
  {
    icon: FileCheck2,
    title: "CAD & Sample Matching",
    detail: "Submit PDF blueprints or physical gaskets for precision CNC tool formulation.",
  },
  {
    icon: ShieldCheck,
    title: "Batch Conformance",
    detail: "Every batch certified to IS: 4253, ASTM F104, and British Standards.",
  },
  {
    icon: Truck,
    title: "Pan-India Dispatch",
    detail: "Direct manufacturing from Vapi, Gujarat with secure freight across all states.",
  },
];

export function FinalCTA() {
  return (
    <section className="border-t border-line bg-page py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-maroon-deep bg-maroon p-8 text-white shadow-lg sm:p-12 lg:p-16">
          {/* Subtle architectural background texture accent */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-white/[0.03] blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 size-96 rounded-full bg-yellow/[0.04] blur-2xl"
            aria-hidden="true"
          />

          <div className="relative max-w-3xl">
            {/* Eyebrow kicker */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white/90 backdrop-blur-xs">
              <span className="size-2 rounded-full bg-yellow" aria-hidden="true" />
              <span>Direct Manufacturing Supply &bull; Vapi, Gujarat</span>
            </div>

            {/* Display Headline */}
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              Ready to engineer your industrial sealing solution?
            </h2>

            {/* Supporting Copy */}
            <p className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
              Whether you need standard 915 × 610 mm rubberised cork sheets, precision dovetail transformer gasket frames, or custom molded prototypes, our engineering desk is ready to review your specifications.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href="/contact"
                variant="inverse"
                size="md"
                className="rounded-full px-7 font-semibold shadow-md"
              >
                Request a formal quotation
                <ArrowRight className="size-4 ml-1.5" />
              </Button>

              <Link
                href="/industries"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-xs transition-colors hover:border-white hover:bg-white/15"
              >
                Browse industries we serve
              </Link>
            </div>
          </div>

          {/* 4 Guarantees Strip */}
          <div className="relative mt-12 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {ASSURANCES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex flex-col">
                  <div className="flex items-center gap-2 text-yellow">
                    <Icon className="size-4 shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      {item.title}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-white/70 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Direct Support Strip */}
          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-yellow" />
              <span>Direct sales email: <strong className="text-white">{COMPANY_INFO.email}</strong></span>
            </div>
            <div className="text-white/60">
              Operating hours: {COMPANY_INFO.workingHours}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
