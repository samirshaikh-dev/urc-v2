import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Truck,
  Building2,
  Factory,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { COMPANY_INFO } from "@/data/company";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us & Factory Locations",
  description:
    "Contact United Rubber Cork for material quotations, CAD drawing evaluations, technical sample requests, and bulk supply coordination.",
  path: "/contact",
});

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

export default function ContactPage() {
  return (
    <>
      {/* 1. HERO HEADER — Clean, minimal & centered */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
        <Container>
          <div className="relative rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-12 lg:p-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-page px-3.5 py-1 text-xs font-medium text-ink/80">
                <span className="size-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
                <span>Direct Engineering &amp; Commercial Support</span>
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem]">
                Contact our <span className="text-maroon">technical team.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Have a new equipment design, custom drawing requirement, or bulk material inquiry? Speak directly with our material specialists to discuss specifications, test samples, and scheduled supply.
              </p>
            </div>

            {/* Quick Contact Metrics */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3 border-t border-line pt-8">
              <div className="rounded-2xl border border-line bg-page/50 p-5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-maroon">
                  <Clock className="size-4" />
                  <span>Response Time</span>
                </div>
                <p className="mt-1.5 text-lg font-semibold text-ink">Within 24 Hours</p>
                <p className="mt-0.5 text-xs text-muted">Technical and commercial feedback</p>
              </div>

              <div className="rounded-2xl border border-line bg-page/50 p-5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-maroon">
                  <ShieldCheck className="size-4" />
                  <span>Drawing Privacy</span>
                </div>
                <p className="mt-1.5 text-lg font-semibold text-ink">100% Confidential</p>
                <p className="mt-0.5 text-xs text-muted">Protected OEM &amp; tooling specifications</p>
              </div>

              <div className="rounded-2xl border border-line bg-page/50 p-5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-maroon">
                  <Truck className="size-4" />
                  <span>Nationwide Logistics</span>
                </div>
                <p className="mt-1.5 text-lg font-semibold text-ink">Pan-India Dispatch</p>
                <p className="mt-0.5 text-xs text-muted">Vapi plant with multimodal transit</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FORM & PROCESS SECTION */}
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
                  We don't send generic automated responses. An engineering specialist reviews your actual dimensional requirements and operating fluids before replying.
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

      {/* 3. PHYSICAL LOCATIONS & DIRECT CHANNELS */}
      <section className="border-t border-line bg-white py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Direct Contact &amp; Facilities
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Manufacturing plants &amp; corporate offices
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Visit our facilities or reach out directly to the respective department for commercial and technical coordination.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Manufacturing Facility */}
            <div className="rounded-3xl border border-line bg-page/40 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white border border-line text-maroon">
                    <Factory className="size-5" />
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-maroon border border-line">
                    Manufacturing Facility
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-ink">
                  Vapi Production Works
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                  Bulk cork granule processing, elastomeric compounding, hydraulic hot-press sheeting, and high-speed CNC gasket profiling.
                </p>

                <div className="mt-6 space-y-3 border-t border-line/80 pt-6 text-xs text-ink/80 sm:text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-4 shrink-0 text-orange-ink mt-0.5" />
                    <span>GIDC Industrial Estate, Vapi, Gujarat — 396195, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 shrink-0 text-orange-ink" />
                    <span>Manufacturing Operations: 8:30 AM – 7:00 PM IST (Mon–Sat)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-line/60 pt-4 text-xs text-muted">
                Facility audits and on-site drawing reviews welcomed by prior appointment.
              </div>
            </div>

            {/* Corporate & Supply Office */}
            <div className="rounded-3xl border border-line bg-page/40 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white border border-line text-maroon">
                    <Building2 className="size-5" />
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-maroon border border-line">
                    Sales &amp; Supply Office
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-ink">
                  Corporate &amp; Billing Office
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                  Commercial inquiries, contracts, account management, billing, and regional stock distribution across North India.
                </p>

                <div className="mt-6 space-y-3 border-t border-line/80 pt-6 text-xs text-ink/80 sm:text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-4 shrink-0 text-orange-ink mt-0.5" />
                    <span>{COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} — {COMPANY_INFO.address.pincode}, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-orange-ink" />
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 shrink-0 text-orange-ink" />
                    <span>{COMPANY_INFO.workingHours}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-line/60 pt-4 text-xs text-muted">
                Direct phone and WhatsApp inquiries supported during business hours.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
