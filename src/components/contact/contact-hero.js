import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const CONTACT_INDEX = [
  { label: "Request a Quotation", href: "#enquiry-form" },
  { label: "+91 9924304617", href: "tel:+919924304617" },
  { label: "admin@amcorkindia.com", href: "mailto:admin@amcorkindia.com" },
  { label: "GIDC Vapi Plant", href: "#locations" },
];

export function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
      <Container>
        {/* Main Hero Container — Maroon editorial panel inspired by industries-hero */}
        <div className="overflow-hidden rounded-3xl border border-line bg-maroon p-6 sm:p-10 lg:p-12 xl:p-16 text-white shadow-xs">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Category Eyebrow with yellow accent rules */}
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-white/80">
              <span className="h-px w-6 bg-yellow" aria-hidden="true" />
              <span>Direct Factory Communication</span>
              <span className="h-px w-6 bg-yellow" aria-hidden="true" />
            </p>

            {/* Main Headline */}
            <h1 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem]">
              Let&apos;s discuss your material requirements.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              Connect with our engineering and sales team in GIDC Vapi, Gujarat. Whether you require standard rubberised cork sheets, custom CAD-cut transformer frames, or vibration damping slabs, we provide fast technical guidance and transparent factory quotations.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button
                href="#enquiry-form"
                variant="inverse"
                size="md"
                className="rounded-full px-5 font-semibold sm:px-6"
              >
                Submit your enquiry
                <ArrowRight className="size-4 ml-1.5" aria-hidden="true" />
              </Button>

              <Link
                href="#locations"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 bg-white/5 px-5 text-sm font-medium text-white transition-colors duration-150 hover:border-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Factory location &amp; map
              </Link>
            </div>
          </div>
        </div>

        {/* Contact index — a compact editorial touchpoint list */}
        <div className="mt-6">
          <h2 id="contact-index-heading" className="sr-only">
            Contact channels index
          </h2>
          <nav aria-labelledby="contact-index-heading">
            <ol className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {CONTACT_INDEX.map((item, index) => (
                <li key={item.label} className="bg-page">
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-baseline gap-2 px-3 py-4 text-sm transition-colors duration-150 hover:bg-white"
                  >
                    <span className="text-xs tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-ink">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </Container>
    </section>
  );
}
