import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CATEGORY_DETAILS } from "@/data/products";
import { Container } from "@/components/ui/container";

const CATEGORIES_LIST = [
  CATEGORY_DETAILS["cork-products"],
  CATEGORY_DETAILS["rubberised-cork"],
  CATEGORY_DETAILS["decorative-cork"],
  CATEGORY_DETAILS["cork-gifts"],
];

export function ProductsOverviewGrid() {
  return (
    <section id="categories" className="scroll-mt-24 py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Core Categories
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Engineered Product Families
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Select a dedicated category to explore verified specifications, standard dimensions, applications, and custom manufacturing options.
            </p>
          </div>
        </div>

        {/* 2x2 Clean Editorial Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {CATEGORIES_LIST.map((category) => (
            <div
              key={category.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-200 hover:border-maroon/30 hover:shadow-md"
            >
              {/* Image Container */}
              <Link
                href={`/products/${category.slug}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-field"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={category.heroImage}
                  alt={`${category.name} - United Rubber Cork`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-maroon shadow-xs backdrop-blur-xs">
                    {category.badge}
                  </span>
                </div>
              </Link>

              {/* Content Block */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl group-hover:text-maroon transition-colors duration-150">
                    <Link href={`/products/${category.slug}`}>
                      {category.name}
                    </Link>
                  </h3>

                  <p className="mt-1 text-xs font-medium text-orange-ink uppercase tracking-wider">
                    {category.tagline}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {category.shortDescription}
                  </p>

                  {/* Key Highlights */}
                  <ul className="mt-4 space-y-1.5 border-t border-line/70 pt-4 text-xs sm:text-sm text-ink/80">
                    {category.benefits.slice(0, 2).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="size-4 shrink-0 text-orange-ink mt-0.5" aria-hidden="true" />
                        <span>{benefit.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-xs text-muted">
                    {category.standard}
                  </span>

                  <Link
                    href={`/products/${category.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-maroon hover:text-ink transition-colors group/link"
                  >
                    <span>Explore category</span>
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

