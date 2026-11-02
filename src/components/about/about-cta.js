import { ArrowRight, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/data/company";

export function AboutCTA() {
  return (
    <section className="border-t border-line bg-white py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-maroon p-8 text-white shadow-md sm:p-12 lg:p-16">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Small Kicker */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-yellow">
              <span className="size-2 rounded-full bg-yellow animate-pulse" aria-hidden="true" />
              <span>Direct Manufacturer Consultation</span>
            </span>

            {/* Headline */}
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Looking for the right material solution?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Discuss your requirements with our team. Share your application parameters, technical drawings, or target specifications for prompt technical guidance and direct factory quotations.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                href="/contact"
                variant="inverse"
                size="md"
                className="rounded-full px-7 shadow-xs group"
              >
                <span>Get a Quote</span>
                <ArrowRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button
                href="/products"
                variant="secondary"
                size="md"
                className="rounded-full border-white/30 text-white hover:bg-white/10 hover:border-white px-7"
              >
                Browse all products
              </Button>
            </div>

            {/* Direct Contact Coordinates */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/15 pt-8 text-xs text-white/80 sm:text-sm">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="size-4 text-orange" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <span className="hidden sm:inline text-white/30">•</span>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="size-4 text-orange" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

