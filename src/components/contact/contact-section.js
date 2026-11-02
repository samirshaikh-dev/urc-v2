import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Requirement Intake & Review",
    desc: "Our engineering desk reviews your operating media, sheet dimensions, or technical drawings.",
  },
  {
    step: "02",
    title: "Material Formulation Match",
    desc: "We match the optimal elastomer binder (NBR, Neoprene, SBR) and verify compression parameters.",
  },
  {
    step: "03",
    title: "Commercial Quote & Sample Dispatch",
    desc: "Receive formal pricing and physical pre-production test samples within 24–48 hours.",
  },
];

export function ContactSection() {
  return (
    <section className="border-t border-line bg-page py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column: What Happens Next & Guidelines */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                Predictable Process
              </span>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                What happens when you send an enquiry
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We don&apos;t send generic automated responses. An engineering specialist reviews your actual dimensional requirements and operating fluids before replying.
              </p>
            </div>

            {/* 3-Step Process List */}
            <div className="space-y-4">
              {PROCESS_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-2xs"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-page border border-line font-bold text-xs text-maroon">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What to include box */}
            <div className="rounded-2xl border border-line bg-white p-6 shadow-2xs">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon">
                Helpful information to include:
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-orange-ink mt-0.5" />
                  <span>Material type (Rubberised cork, Plain cork, or Custom Gaskets)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-orange-ink mt-0.5" />
                  <span>Thickness (1.0 mm to 25.0 mm) and sheet or cut dimensions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-orange-ink mt-0.5" />
                  <span>Contact medium (Transformer mineral oil, synthetic esters, fuel, air)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-orange-ink mt-0.5" />
                  <span>Operating temperature and estimated annual or batch volume</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-10 shadow-xs">
              <h2 id="contact-form-heading" className="text-xl font-semibold tracking-tight text-ink sm:text-2xl mb-1">
                Send a requirement or enquiry
              </h2>
              <p className="text-xs text-muted mb-6">
                Fill in your details below and our team will get in touch directly.
              </p>
              <ContactForm />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
