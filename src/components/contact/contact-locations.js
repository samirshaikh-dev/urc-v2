import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { COMPANY_INFO } from "@/data/company";

/**
 * Physical locations and direct lines, kept as plain editorial detail.
 */
export function ContactLocations() {
  return (
    <section className="border-b border-line bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              kicker="Locations &amp; Direct Lines"
              title="Works facility &amp; correspondence"
              description="Use the details below for physical shipments, official correspondence, and order coordination."
            />
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="border-t border-line pt-5">
                <h3 className="text-sm font-semibold text-ink">Works &amp; Registered Facility</h3>
                <address className="mt-2 text-sm not-italic leading-relaxed text-muted">
                  <span className="block">{COMPANY_INFO.address.line1}</span>
                  <span className="block">{COMPANY_INFO.address.line2}</span>
                  <span className="block">{COMPANY_INFO.address.area}</span>
                  <span className="block">
                    {COMPANY_INFO.address.city} — {COMPANY_INFO.address.pincode} ({COMPANY_INFO.address.state}), {COMPANY_INFO.address.country}
                  </span>
                </address>
              </div>

              <div className="border-t border-line pt-5">
                <h3 className="text-sm font-semibold text-ink">Direct Communications</h3>
                <div className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
                  <div>
                    <span className="font-medium text-ink">Phone: </span>
                    <span className="inline-flex flex-wrap gap-x-2">
                      {COMPANY_INFO.phones.map((phone, idx) => (
                        <span key={phone}>
                          <a
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            className="hover:text-maroon underline-offset-2 hover:underline"
                          >
                            {phone}
                          </a>
                          {idx < COMPANY_INFO.phones.length - 1 && <span className="text-line ml-1">,</span>}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-ink">Email: </span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="hover:text-maroon underline-offset-2 hover:underline"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                  <div>
                    <span className="font-medium text-ink">Alternate: </span>
                    <a
                      href={`mailto:${COMPANY_INFO.secondaryEmail}`}
                      className="hover:text-maroon underline-offset-2 hover:underline"
                    >
                      {COMPANY_INFO.secondaryEmail}
                    </a>
                  </div>
                  <div className="pt-1 text-xs text-muted">
                    {COMPANY_INFO.workingHours}
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
