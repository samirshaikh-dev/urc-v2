import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { COMPANY_INFO } from "@/data/company";

export function ContactMap() {
  const encodedAddress = encodeURIComponent(
    `${COMPANY_INFO.name}, ${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.pincode}, ${COMPANY_INFO.address.country}`
  );
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <section className="border-b border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Find Us
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Visit our manufacturing facility
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              Located in the industrial corridor of 2nd Phase GIDC Vapi, Gujarat, our production plant is equipped for raw cork compounding, hot-press vulcanization, and CNC gasket fabrication.
            </p>

            <div className="rounded-2xl border border-line bg-page/60 p-5 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-maroon" />
                <address className="text-sm not-italic leading-relaxed text-muted">
                  <strong className="block text-ink font-semibold">{COMPANY_INFO.name}</strong>
                  <span>{COMPANY_INFO.address.line1}</span><br />
                  <span>{COMPANY_INFO.address.line2}</span><br />
                  <span>{COMPANY_INFO.address.area}</span><br />
                  <span>
                    {COMPANY_INFO.address.city} — {COMPANY_INFO.address.pincode} ({COMPANY_INFO.address.state}), {COMPANY_INFO.address.country}
                  </span>
                </address>
              </div>

              <div className="pt-2 border-t border-line/60">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-maroon hover:text-maroon-deep transition-colors"
                >
                  <Navigation className="size-3.5" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Compact Map Container */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-xs bg-field aspect-16/10 sm:aspect-16/9 w-full">
              <iframe
                title="United Rubber Cork Factory Location Map"
                src="https://maps.google.com/maps?q=Balaji+Complex+Opp+Hansa+Engg+GIDC+Vapi+Gujarat+396195&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

