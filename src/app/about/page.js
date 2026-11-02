import { ArrowRight, ShieldCheck, Factory, Award, Building2, CheckCircle2, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { COMPANY_INFO } from "@/data/company";

export const metadata = constructMetadata({
  title: "About Us & Manufacturing Heritage",
  description:
    "Learn about United Rubber Cork — dedicated Indian manufacturer and bulk supplier of high-resilience rubberised cork sheets, transformer gaskets, and engineered cork composites.",
  path: "/about",
});

const HERITAGE_METRICS = [
  { label: "Manufacturing Facility", value: "Vapi, Gujarat, India" },
  { label: "Standards Conformance", value: "IS: 4253 / ASTM / BS" },
  { label: "Technical Turnaround", value: "Within 24 Working Hours" },
  { label: "Commercial Distribution", value: "Pan-India Logistics" },
];

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

export default function AboutPage() {
  return (
    <>
      {/* 1. HERO SECTION — Clean, minimal & centered */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
        <Container>
          <div className="relative rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-12 lg:p-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-page px-3.5 py-1 text-xs font-medium text-ink/80">
                <span className="size-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
                <span>Manufacturing Heritage &amp; Quality</span>
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem]">
                Specialized cork engineering for{" "}
                <span className="text-maroon">industrial excellence.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                United Rubber Cork is an established Indian manufacturer and bulk supplier of engineered cork and rubberised-cork materials, serving electrical transformer builders, automotive OEMs, and heavy equipment manufacturers.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact" size="md" className="rounded-full px-6 shadow-sm">
                  Request a quotation
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
                <Button href="#pillars" variant="secondary" size="md" className="rounded-full px-6">
                  Our capabilities
                </Button>
              </div>
            </div>

            {/* Quick Heritage Metrics */}
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-4 lg:gap-6">
              {HERITAGE_METRICS.map((metric) => (
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

      {/* 2. CORE MANUFACTURING PILLARS */}
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

      {/* 3. FINAL CALLOUT */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl border border-line bg-page/60 p-8 sm:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Looking for a dependable manufacturing partner?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Speak with our sales and technical team to discuss repeat supply contracts, custom dimension tooling, and material test certifications.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="md" className="rounded-full px-7 shadow-xs">
                Contact our team
              </Button>
              <Button href="/industries" variant="secondary" size="md" className="rounded-full px-7">
                View industries we serve
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
