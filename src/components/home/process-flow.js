import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FileText, SearchCheck, Send, Truck } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: FileText,
    title: "Share Specification or Drawing",
    description:
      "Provide your required thickness, sheet dimensions, drawing or physical sample, operating media (oil/fuel/air), and expected order volume.",
    details: "Accepted formats: PDF, CAD drawings, physical gaskets, or dimension sketches.",
  },
  {
    step: "02",
    icon: SearchCheck,
    title: "Engineering Review & Material Match",
    description:
      "Our technical specialists evaluate fluid compatibility, compression requirements, and recommend the optimal elastomer binder matrix (NBR, Neoprene, or SBR).",
    details: "Verifies temperature limits, dielectric ratings, and sealing tolerances.",
  },
  {
    step: "03",
    icon: Send,
    title: "Sample Verification & Formal Quote",
    description:
      "Receive formal technical parameters, competitive volume pricing, and physical pre-production samples for flange fitment and bench testing.",
    details: "Includes test certificates and conformance standards declaration.",
  },
  {
    step: "04",
    icon: Truck,
    title: "Batch Production & Tracked Dispatch",
    description:
      "Precision CNC slicing, die cutting, or sheet molding executed under strict batch quality control, packaged securely, and dispatched across India.",
    details: "Full batch traceability, dimensional verification, and scheduled logistics.",
  },
];

export function ProcessFlow() {
  return (
    <section className="border-t border-line bg-page py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
            Transparent Procurement
          </span>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            From technical requirement to dependable dispatch
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            We make industrial component procurement predictable, technically grounded, and straightforward for engineers and purchasing managers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-3xl border border-line bg-white p-6 sm:p-7 shadow-2xs transition-all duration-200 hover:border-maroon/30 hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold tracking-tight text-maroon/20">
                      {step.step}
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-xl bg-page border border-line text-maroon">
                      <Icon className="size-4" />
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-ink sm:text-lg">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-line/60 pt-4 text-[11px] font-medium text-ink/75 leading-tight">
                  {step.details}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance banner */}
        <div className="mt-10 rounded-2xl border border-line bg-white/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-xs sm:text-sm text-ink/80">
            <span className="font-semibold text-ink">Have a custom drawing or urgent replacement requirement?</span>{" "}
            Our technical support team reviews drawings and answers technical questions directly.
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-maroon px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-maroon-deep shrink-0"
          >
            Start an enquiry
          </Link>
        </div>
      </Container>
    </section>
  );
}
