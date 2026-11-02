import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function ProductsHero() {
  return (
    <section className="relative overflow-hidden pt-4 pb-10 sm:pt-8 sm:pb-14 lg:pb-16">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-maroon transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
          <span className="font-semibold text-ink" aria-current="page">
            Products
          </span>
        </nav>

        <div className="relative rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-12 lg:p-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-page px-3.5 py-1 text-xs font-medium text-ink/80">
              <span className="size-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
              <span>Engineered Material Catalogue</span>
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem]">
              Industrial Materials for{" "}
              <span className="text-maroon">Diverse Applications.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Reliable cork and rubberised-cork materials engineered for electrical transformers, automotive gaskets, acoustic insulation, and custom industrial applications across India and international markets.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" size="md" className="rounded-full px-6 shadow-sm">
                Request a Quote
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
              <Button href="#categories" variant="secondary" size="md" className="rounded-full px-6">
                Explore product categories
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
