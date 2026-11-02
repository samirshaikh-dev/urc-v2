import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";

const HIGHLIGHTS = [
  "13+ years of continuous manufacturing experience in India",
  "Direct production plant based in GIDC Vapi, Gujarat",
  "Compounded to international ASTM & Indian Standard (IS) benchmarks",
];

export function AboutWhoWeAre() {
  return (
    <section id="who-we-are" className="scroll-mt-24 border-t border-line bg-page py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Company Introduction */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Who We Are
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Over 13 years of leadership in the Indian cork industry
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              <p>
                United Rubber Cork has been actively involved in the Indian cork industry for the past 13 years. Founded on an unwavering commitment to quality, customer satisfaction, and service, United Rubber Cork has established itself as a leading manufacturer of cork and rubberised cork products in India.
              </p>
              <p>
                Operating from our manufacturing facility in GIDC Vapi, Gujarat, we bridge technical elastomer compounding with high-grade natural cork grains. We partner closely with engineering teams, procurement managers, and industrial OEMs to supply materials that satisfy stringent operating criteria across electrical power systems, automotive assemblies, and heavy industrial machinery.
              </p>
            </div>

            {/* Structured Bullet Highlights */}
            <div className="mt-8 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-maroon" />
                  <span className="text-sm font-medium text-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Authentic Industrial Manufacturing Photography */}
          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-line bg-white p-2 shadow-xs transition-all duration-300 hover:shadow-md">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-field sm:aspect-5/4">
                <Image
                  src="/images/carousel-images/industrial-cork-granules-processing-manufacturer-vapi-gujarat-01.jpg"
                  alt="Industrial cork granule processing and compounding at United Rubber Cork plant in Vapi, Gujarat"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="font-medium text-ink">Direct Manufacturing Facility</span>
                  <span>GIDC Vapi, Gujarat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

