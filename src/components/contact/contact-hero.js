import { ArrowDown, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/data/company";

/**
 * Contact page introduction. Left-aligned editorial layout with the direct
 * contact channel kept visible above the fold — no centered card-in-card hero.
 */
export function ContactHero() {
  return (
    <section className="border-b border-line bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-ink">
              Contact &amp; quotation
            </p>

            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[3rem] lg:leading-[1.1]">
              Discuss your cork or rubberised-cork requirement.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Share the material, dimensions, quantity and application you have in mind.
              We will review the details and follow up with the questions or quotation you
              need.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#enquiry" size="md">
                Start an enquiry
                <ArrowDown className="size-4" aria-hidden="true" />
              </Button>
              <Button href="/products" variant="secondary" size="md">
                Explore products
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                Direct contact
              </h2>

              <dl className="mt-4 divide-y divide-line border-y border-line">
                <div className="flex items-start gap-3 py-4">
                  <Phone className="mt-0.5 size-4 shrink-0 text-orange-ink" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-medium text-muted">Phone</dt>
                    <dd className="mt-1 flex flex-col gap-1 text-sm font-medium text-ink">
                      {COMPANY_INFO.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                          className="rounded-control underline-offset-4 transition-colors hover:text-maroon hover:underline"
                        >
                          {phone}
                        </a>
                      ))}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <Mail className="mt-0.5 size-4 shrink-0 text-orange-ink" aria-hidden="true" />
                  <div className="min-w-0">
                    <dt className="text-xs font-medium text-muted">Email</dt>
                    <dd className="mt-1 flex flex-col gap-1 text-sm font-medium text-ink">
                      {COMPANY_INFO.emails.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="break-words rounded-control underline-offset-4 transition-colors hover:text-maroon hover:underline"
                        >
                          {email}
                        </a>
                      ))}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <Clock className="mt-0.5 size-4 shrink-0 text-orange-ink" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-muted">Working hours</dt>
                    <dd className="mt-1 text-sm text-ink">{COMPANY_INFO.workingHours}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-orange-ink" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-muted">Works &amp; Office</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink">
                      No. 5, Balaji Complex, 2nd Phase, GIDC, Vapi — 396195, Gujarat, India
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
