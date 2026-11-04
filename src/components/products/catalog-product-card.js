"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-url";

/**
 * Clean compact vertical product card:
 * - 4:3 Image with badge overlay
 * - Product name (links to details)
 * - Description snippet (auto-generated from DB HTML description)
 * - Footer with "Detailed specs" and "Request quote"
 */
export function CatalogProductCard({ product, onRequestQuote }) {
  const detailUrl = product.url || `/products/${product.categorySlug || "cork-products"}/${product.slug}`;
  const imageSrc = product.imageUrl
    ? optimizeCloudinaryUrl(product.imageUrl, { width: 800 })
    : "/images/placeholder-product.jpg";

  return (
    <article className="group flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-maroon/30 hover:shadow-lg focus-within:ring-2 focus-within:ring-maroon/20">
      <div>
        {/* 1. 4:3 Product Image with Badge Overlay */}
        <Link
          href={detailUrl}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[4/3] w-full overflow-hidden bg-field"
        >
          <Image
            src={imageSrc}
            alt={product.name || "United Rubber Cork Product"}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="lazy"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-maroon shadow-xs backdrop-blur-xs border border-line/60">
                {product.badge}
              </span>
            </div>
          )}
        </Link>

        {/* 2. Body Details: Name & Description Snippet */}
        <div className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold tracking-tight text-ink sm:text-xl group-hover:text-maroon transition-colors duration-150">
            <Link
              href={detailUrl}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 rounded-xs"
            >
              {product.name}
            </Link>
          </h3>

          {product.shortDescription && (
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted line-clamp-3">
              {product.shortDescription}
            </p>
          )}
        </div>
      </div>

      {/* 3. Footer Actions */}
      <div className="flex items-center justify-between border-t border-line bg-field/30 px-5 py-3.5 sm:px-6">
        <Link
          href={detailUrl}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-maroon transition-colors group/link focus-visible:outline-none focus-visible:underline"
        >
          <span>Detailed specs</span>
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
        </Link>

        <button
          type="button"
          onClick={() => onRequestQuote(product)}
          className="cursor-pointer rounded-full bg-maroon px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-maroon-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2"
        >
          Request quote
        </button>
      </div>
    </article>
  );
}
