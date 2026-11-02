import { Factory, Building2, MapPin, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { COMPANY_INFO } from "@/data/company";

export function ContactLocations() {
  return (
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
  );
}
