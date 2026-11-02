import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/data/industries";

export function IndustriesHero() {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-line bg-maroon p-6 sm:p-10 lg:p-12 xl:p-16 text-white shadow-xs">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-white/80">
            <span className="h-px w-6 bg-yellow" aria-hidden="true" />
            Industries &amp; applications
          </p>

          <h1 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem]">
            Engineered for the conditions your sector runs in.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Hot transformer oil, continuous powertrain vibration, saltwater exposure, and
            structural movement each impose different demands on a seal or isolator. Explore the
            sectors United Rubber Cork supplies and the components fabricated for them.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              href="/contact"
              variant="inverse"
              size="md"
              className="rounded-full px-5 font-semibold sm:px-6"
            >
              Request sector quotation
              <ArrowRight className="size-4 ml-1.5" aria-hidden="true" />
            </Button>

            <Link
              href="#sectors"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 bg-white/5 px-5 text-sm font-medium text-white transition-colors duration-150 hover:border-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Browse sectors
            </Link>
          </div>

        </div>

        {/* Sector index — a compact editorial contents list, not a card row. */}
        <div className="mt-6">
          <h2 id="sector-index-heading" className="sr-only">
            Sector index
          </h2>
          <nav aria-labelledby="sector-index-heading">
            <ol className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
              {INDUSTRIES.map((sector, index) => (
                <li key={sector.id} className="bg-page">
                  <Link
                    href={`#${sector.id}`}
                    className="flex min-h-11 items-baseline gap-2 px-3 py-4 text-sm transition-colors duration-150 hover:bg-white"
                  >
                    <span className="text-xs tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-ink">{sector.shortLabel}</span>
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
