import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CategoryPills } from "./category-pills";

export function CategoryHero({ category }) {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-maroon transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
          <Link href="/products" className="hover:text-maroon transition-colors">
            Products
          </Link>
          <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
          <span className="font-semibold text-ink" aria-current="page">
            {category.name}
          </span>
        </nav>

        {/* Category Pill Navigation */}
        <div className="mb-8">
          <CategoryPills activeCategory={category.id} />
        </div>

        {/* Hero Card Container */}
        <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Content Column */}
            <div className="p-6 sm:p-10 lg:p-12 lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-line bg-field px-3 py-1 text-xs font-semibold text-ink/80">
                  <span className="size-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
                  <span>{category.badge}</span>
                </div>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                  {category.name}
                </h1>

                <p className="mt-2 text-base font-medium text-maroon sm:text-lg">
                  {category.tagline}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {category.shortDescription}
                </p>

                {/* Quality & Standard Conformance Pill */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line/80 bg-page/60 px-3.5 py-2 text-xs font-medium text-ink">
                  <ShieldCheck className="size-4 text-maroon shrink-0" aria-hidden="true" />
                  <span>{category.standard}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-line/60">
                <Button
                  href={`/contact?product=${encodeURIComponent(category.name)}`}
                  size="md"
                  className="rounded-full px-6 shadow-xs"
                >
                  Request a quote
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
                <Button
                  href="#products-list"
                  variant="secondary"
                  size="md"
                  className="rounded-full px-6"
                >
                  Explore products below
                </Button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="relative min-h-[300px] w-full bg-field lg:col-span-5 lg:min-h-full">
              <Image
                src={category.heroImage}
                alt={`${category.name} - United Rubber Cork manufacturing`}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

