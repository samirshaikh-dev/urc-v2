import { Phone, Mail, MapPin, Clock, FileCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { COMPANY_INFO } from "@/data/company";

export function ContactMain() {
  return (
    <section id="enquiry-form" className="scroll-mt-24 border-b border-line bg-page py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-10 shadow-xs">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                Quick Enquiry
              </span>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Send your requirement
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Fill in your project specifications below. Our technical sales team reviews every submission and responds promptly with guidance and commercial pricing.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Right Column: Unified Contact Information (Single cohesive column, no disconnected cards) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-10 shadow-xs space-y-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                  Direct Contact
                </span>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Contact details
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Reach our works and sales offices directly for technical consultations, RFQs, or physical shipments.
                </p>
              </div>

              <div className="space-y-6 divide-y divide-line pt-2">
                {/* Phone */}
                <div className="pt-6 first:pt-0">
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
                    <Phone className="size-4 text-maroon" />
                    <span>Phone &amp; Direct Lines</span>
                  </div>
                  <div className="mt-2.5 flex flex-col gap-1.5 text-sm font-medium text-ink">
                    {COMPANY_INFO.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="transition-colors hover:text-maroon underline-offset-4 hover:underline"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="pt-6">
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
                    <Mail className="size-4 text-maroon" />
                    <span>Email Correspondence</span>
                  </div>
                  <div className="mt-2.5 flex flex-col gap-1.5 text-sm font-medium text-ink">
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="transition-colors hover:text-maroon underline-offset-4 hover:underline"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.secondaryEmail}`}
                      className="transition-colors hover:text-maroon underline-offset-4 hover:underline"
                    >
                      {COMPANY_INFO.secondaryEmail}
                    </a>
                  </div>
                </div>

                {/* Office & Works Address */}
                <div className="pt-6">
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
                    <MapPin className="size-4 text-maroon" />
                    <span>Office &amp; Manufacturing Works</span>
                  </div>
                  <address className="mt-2.5 text-sm not-italic leading-relaxed text-muted">
                    <span className="block font-medium text-ink">{COMPANY_INFO.name}</span>
                    <span className="block">{COMPANY_INFO.address.line1}</span>
                    <span className="block">{COMPANY_INFO.address.line2}</span>
                    <span className="block">{COMPANY_INFO.address.area}</span>
                    <span className="block">
                      {COMPANY_INFO.address.city} — {COMPANY_INFO.address.pincode} ({COMPANY_INFO.address.state}), {COMPANY_INFO.address.country}
                    </span>
                  </address>
                </div>

                {/* Business Hours */}
                <div className="pt-6">
                  <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-muted">
                    <Clock className="size-4 text-maroon" />
                    <span>Business Hours</span>
                  </div>
                  <div className="mt-2 text-sm text-ink font-medium">
                    {COMPANY_INFO.workingHours}
                  </div>
                  <div className="text-xs text-muted mt-0.5">
                    Closed on Sundays &amp; National Holidays
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

