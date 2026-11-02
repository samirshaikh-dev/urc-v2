import { Factory, ShieldCheck, Award } from "lucide-react";
import { Container } from "@/components/ui/container";

const PILLARS = [
  {
    icon: Factory,
    title: "Direct Manufacturing Plant",
    desc: "Our production facility in GIDC Vapi, Gujarat houses heavy hydraulic hot-presses, automated granule grading, and specialized elastomer compounding lines.",
  },
  {
    icon: ShieldCheck,
    title: "Rigorous Batch Testing",
    desc: "Every batch is verified in our laboratory for compressibility, elastic recovery rate, tensile strength, and oil immersion volume change under ASTM oils.",
  },
  {
    icon: Award,
    title: "Drawing-Based Tooling",
    desc: "From endless circular rings to intricate rectangular transformer frames and dovetail joints, our CNC cutting tables fabricate parts directly from CAD blueprints.",
  },
];

export function AboutPillars() {
  return (
    <section id="pillars" className="scroll-mt-24 border-t border-line bg-page py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
            Our Principles
          </span>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            Engineered reliability across every production run
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            We operate on engineering discipline, transparent technical specifications, and predictable delivery schedules for our OEM and bulk procurement partners.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-3xl border border-line bg-white p-8 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-page border border-line text-maroon">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-ink sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-muted leading-relaxed sm:text-sm">
                    {item.desc}
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
