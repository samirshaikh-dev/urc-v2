import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "How do I choose between Nitrile (NBR), Neoprene, and SBR binder matrices?",
    a: "Binder matrix selection depends strictly on contact fluids and operating temperature. NBR (Nitrile) provides optimal resistance against hot transformer mineral oils, synthetic ester liquids, kerosene, and diesel. Neoprene provides superior weather, ozone, and moderate oil resistance, making it suitable for outdoor electrical switchgear and marine environments. SBR is economical for general-purpose anti-vibration and dry mechanical flange seals where direct hydrocarbon immersion is not present.",
  },
  {
    q: "Can you manufacture endless one-piece gaskets or large transformer frames?",
    a: "Yes. For power and distribution transformers, we manufacture endless molded circular rings and rectangular frames without spliced joints to guarantee zero oil leakage. For very large perimeter gaskets, we provide interlocking precision dovetail joints or beveled lap joints cut with CNC precision to prevent weak seal seams.",
  },
  {
    q: "What technical parameters are required to generate an accurate quotation?",
    a: "To recommend the correct grade and provide transparent pricing, we need: 1) Material type or application; 2) Dimensions (sheet size or drawing/sketch with tolerances); 3) Required thickness (1.0 mm to 25.0 mm); 4) Operating conditions (fluid type, continuous operating temperature, bolt torque); and 5) Batch quantity.",
  },
  {
    q: "What testing and quality standards do your cork sheets conform to?",
    a: "Our industrial rubberised cork sheets conform to IS: 4253 (Parts 1 & 2), ASTM F104, and British Standards. Every production batch undergoes testing for compressibility, recovery rate, tensile strength, and oil immersion volume change (under ASTM Oil No. 1 and No. 3).",
  },
  {
    q: "Do you supply pre-production samples for flange fitment testing?",
    a: "Yes. For customized CAD drawings or OEM orders, we provide sample cuts and test strips to verify bolt hole alignment, compressibility, and sealing performance before commencing volume manufacturing.",
  },
];

export function TechnicalFAQ() {
  return (
    <section className="border-t border-line bg-page py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Summary */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Technical Clarity
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Engineering guidance for material selection
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Choosing the right cork composite starts with understanding your operating environment. Here are key answers to technical questions commonly asked by procurement and design engineers.
            </p>

            <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-maroon">
                <HelpCircle className="size-4" />
                <span>Need tailored engineering advice?</span>
              </div>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Send your equipment specifications or fluid type directly to our engineering team for validation.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-maroon px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-maroon-deep"
              >
                Discuss your application
              </Link>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-line bg-white p-5 transition-all duration-200 open:shadow-xs open:border-maroon/30"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-ink text-sm sm:text-base list-none focus:outline-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 group-open:text-maroon" />
                </summary>
                <div className="mt-3.5 border-t border-line/60 pt-3.5 text-xs sm:text-sm leading-relaxed text-muted">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
