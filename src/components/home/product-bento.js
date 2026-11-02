"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Check, FileSpreadsheet, X } from "lucide-react";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductSpecTable } from "@/components/products/product-spec-table";
import { cn } from "@/lib/utils";

export function ProductBento() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

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

        {/* Product Bento Grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white transition-all duration-200 hover:border-maroon/30 hover:shadow-sm scroll-mt-28"
            >
              <div>
                {/* Product Imagery */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-field">
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
                <div className="p-6 sm:p-8">
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
                </div>
              </div>

              {/* Action Hooks */}
              <div className="flex items-center justify-between border-t border-line bg-page/30 px-6 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={() => setSelectedProductForModal(product)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-maroon transition-colors cursor-pointer"
                >
                  <span>Detailed specifications</span>
                  <ArrowRight className="size-3.5" />
                </button>

                <Button
                  href="/contact"
                  size="sm"
                  className="rounded-full px-4 text-xs"
                >
                  Request quote
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Specification Modal */}
        {selectedProductForModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-spec-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-200"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                    Technical Specification Sheet
                  </span>
                  <h3 id="modal-spec-title" className="text-xl font-semibold text-ink sm:text-2xl mt-0.5">
                    {selectedProductForModal.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProductForModal(null)}
                  className="rounded-full p-2 text-muted hover:bg-field hover:text-ink transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-maroon uppercase tracking-wider">
                    Primary Applications:
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProductForModal.applications.map((app) => (
                      <span
                        key={app}
                        className="rounded-full bg-field border border-line px-3 py-1 text-xs text-ink"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-maroon uppercase tracking-wider mb-2">
                    Verified Technical Parameters:
                  </h4>
                  <ProductSpecTable specifications={selectedProductForModal.specifications} />
                </div>

                <div className="rounded-2xl border border-line bg-page p-4 text-xs text-muted leading-relaxed">
                  <span className="font-semibold text-ink">Custom dimensions or CAD profiling?</span> We manufacture custom endless rings, cut frames, and die-cut gaskets according to provided engineering drawings.
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProductForModal(null)}
                  className="rounded-full px-5 py-2 text-xs font-medium text-muted hover:text-ink cursor-pointer"
                >
                  Close
                </button>
                <Button
                  href="/contact"
                  size="sm"
                  className="rounded-full px-5 text-xs"
                  onClick={() => setSelectedProductForModal(null)}
                >
                  Request quote for this product
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}