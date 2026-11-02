"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductSpecTable } from "@/components/products/product-spec-table";
import { cn } from "@/lib/utils";

export function ProductBento() {
  const pathname = usePathname();
  const isProductsPage = pathname === "/products";
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const syncHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        const matched = PRODUCT_CATEGORIES.find((c) => c.id === hash);
        if (matched) {
          setActiveCategory(matched.id);
        }
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="products" tabIndex={-1} className="scroll-mt-24 py-16 sm:py-24 focus:outline-none">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Product Catalogue
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Engineered cork materials & cut components
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Standard sheets and precision-fabricated parts manufactured to your technical drawings, dimensions, and operational media.
            </p>
          </div>

          <Button href="/contact" variant="secondary" size="sm" className="hidden rounded-full sm:inline-flex shrink-0">
            Request custom quotation
          </Button>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-line pb-4">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-150 sm:text-sm cursor-pointer",
                activeCategory === cat.id
                  ? "bg-maroon text-white shadow-xs"
                  : "bg-white text-muted border border-line hover:border-maroon/40 hover:text-ink"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Bento Grid - Single Column Layout */}
        <div className="mt-10 grid grid-cols-1 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-200 hover:border-maroon/30 hover:shadow-sm scroll-mt-28 md:flex-row md:items-stretch"
            >
              {/* Product Imagery */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-field md:aspect-auto md:w-5/12 lg:w-1/2 md:min-h-[320px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-maroon shadow-xs backdrop-blur-xs">
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Content details */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl group-hover:text-maroon transition-colors duration-150">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {product.shortDescription}
                  </p>

                  {/* Key Features Bullet List */}
                  <ul className="mt-4 space-y-1.5 border-t border-line/70 pt-4 text-xs sm:text-sm text-ink/80">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="size-4 shrink-0 text-orange-ink mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* On product page, display specifications table and application tags directly */}
                  {isProductsPage && product.specifications && (
                    <div className="mt-6 space-y-4 border-t border-line/70 pt-4">
                      <div>
                        <h4 className="text-xs font-semibold text-maroon uppercase tracking-wider mb-2">
                          Key Industrial Applications:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {product.applications.map((app) => (
                            <span
                              key={app}
                              className="rounded-full bg-field border border-line px-2.5 py-0.5 text-[11px] text-ink"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-maroon uppercase tracking-wider mb-2">
                          Technical Parameters:
                        </h4>
                        <ProductSpecTable specifications={product.specifications} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Hooks - Redirect to Product Page without opening dialog */}
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  {isProductsPage ? (
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-maroon transition-colors group/link"
                    >
                      <span>Custom drawing inquiry</span>
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </Link>
                  ) : (
                    <Link
                      href={`/products#${product.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-maroon transition-colors group/link"
                    >
                      <span>Detailed specifications</span>
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </Link>
                  )}

                  <Button
                    href="/contact"
                    size="sm"
                    className="rounded-full px-4 text-xs"
                  >
                    Request quote
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}