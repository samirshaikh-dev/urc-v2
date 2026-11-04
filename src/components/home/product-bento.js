"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CatalogProductGrid } from "@/components/products/catalog-product-grid";

export function ProductBento() {
  return (
    <section
      id="products"
      tabIndex={-1}
      aria-labelledby="product-catalogue-heading"
      className="scroll-mt-24 py-16 sm:py-24 focus:outline-none"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Product Catalogue
            </span>
            <h2
              id="product-catalogue-heading"
              className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl"
            >
              Engineered cork materials &amp; cut components
            </h2>
          </div>

          <Button
            href="/contact"
            variant="secondary"
            size="sm"
            className="hidden rounded-full sm:inline-flex shrink-0"
          >
            Request custom quotation
          </Button>
        </div>

        {/* Dynamic 3x3 Grid with Categories, Pagination, Skeleton States & Quote Modal */}
        <CatalogProductGrid />
      </Container>
    </section>
  );
}
