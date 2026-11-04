"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductBento() {
  const [activeCategory, setActiveCategory] = useState("all");

  // When "all" is active on home, show 4 flagship products (one representing each category)
  const filteredProducts =
    activeCategory === "all"
      ? [
          PRODUCTS.find((p) => p.id === "rubber-cork-sheets"),
          PRODUCTS.find((p) => p.id === "plain-cork-sheets"),
          PRODUCTS.find((p) => p.id === "acoustic-cork-wall-tiles"),
          PRODUCTS.find((p) => p.id === "cork-desk-accessories"),
        ].filter(Boolean)
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
              Engineered cork materials &amp; cut components
            </h2>
          </div>

          <Button href="/contact" variant="secondary" size="sm" className="hidden rounded-full sm:inline-flex shrink-0">
            Request custom quotation
          </Button>
        </div>

        {/* Product Bento Grid */}
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
                    <Link href={`/products/${product.category}/${product.slug}`}>
                      {product.name}
                    </Link>
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

                {/* Action Hooks */}
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <Link
                    href={`/products/${product.category}/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-maroon transition-colors group/link"
                  >
                    <span>Detailed specifications</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                  </Link>

                  <Button
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
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
