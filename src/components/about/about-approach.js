import { ShieldCheck, Target, Truck } from "lucide-react";
import { Container } from "@/components/ui/container";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Material Quality",
    description:
      "Carefully graded cork granules combined with premium synthetic elastomers. Each production run is verified for compressibility, recovery rate, and dielectric oil resistance conforming to ASTM and IS standards.",
  },
  {
    icon: Target,
    title: "Application-Focused Solutions",
    description:
      "We tailor material grades to specific mechanical and chemical operating environments—from high-voltage transformer frames and vibration foundation slabs to clutch plates and food-grade bottle cap wads.",
  },
  {
    icon: Truck,
    title: "Reliable Supply",
    description:
      "Direct manufacturing at our GIDC Vapi facility provides transparent production control, CAD-driven tooling for custom dimensions, and dependable delivery schedules for bulk OEM contracts.",
  },
];

export function AboutApproach() {
  return (
    <section className="border-t border-line bg-page py-16 sm:py-24">
      <Container>
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
            Our Approach
          </span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Built on engineering rigor and dependable service
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Three guiding principles define how we formulate, manufacture, and partner with industrial clients across India.
          </p>
        </div>

        {/* Three concise principles in a clean horizontal layout */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="relative rounded-3xl border border-line bg-white p-8 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-page border border-line text-maroon">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-muted">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-ink sm:text-xl">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

