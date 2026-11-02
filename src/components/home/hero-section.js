import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const PRODUCT_INDEX = [
  { label: "Rubberised Cork", href: "/products/rubberised-cork" },
  { label: "Transformer Gaskets", href: "/products/rubberised-cork/transformer-cork-gaskets" },
  { label: "Natural Cork", href: "/products/cork-products" },
  { label: "Industrial Granules", href: "/products/cork-products/industrial-cork-granules" },
  { label: "Decorative Cork", href: "/products/decorative-cork" },
  { label: "Cork Gifts", href: "/products/cork-gifts" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
      <Container>
        {/* Main Hero Container — Maroon editorial panel inspired by industries-hero */}
        <div className="overflow-hidden rounded-3xl border border-line bg-maroon p-6 sm:p-10 lg:p-12 xl:p-16 text-white shadow-xs">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* Category Eyebrow with yellow accent rules */}
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-white/80">
              <span className="h-px w-6 bg-yellow" aria-hidden="true" />
              <span>B2B Industrial Material Manufacturing</span>
              <span className="h-px w-6 bg-yellow" aria-hidden="true" />
            </p>

            {/* Main Headline */}
            <h1 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem]">
              Engineered rubberised cork for critical industrial sealing.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              Precision-molded gaskets, high-resilience sheets, and custom CNC components formulated for hot dielectric transformer oil, severe automotive vibration, and heavy-duty flange containment.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button
                href="/contact"
                variant="inverse"
                size="md"
                className="rounded-full px-5 font-semibold sm:px-6"
              >
                Request a quotation
                <ArrowRight className="size-4 ml-1.5" aria-hidden="true" />
              </Button>

              <Link
                href="#products"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 bg-white/5 px-5 text-sm font-medium text-white transition-colors duration-150 hover:border-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore product catalogue
              </Link>
            </div>
          </div>
        </div>

        {/* Product index — a compact editorial contents list, not a card row */}
        <div className="mt-6">
          <h2 id="product-index-heading" className="sr-only">
            Product index
          </h2>
          <nav aria-labelledby="product-index-heading">
            <ol className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
              {PRODUCT_INDEX.map((item, index) => (
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
