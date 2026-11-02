import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CategoryProductCard({ product }) {
  const detailUrl = `/products/${product.category}/${product.slug}`;
  const quoteUrl = `/contact?product=${encodeURIComponent(product.name)}`;
  const topSpecs = (product.specifications || []).slice(0, 3);

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-200 hover:border-maroon/30 hover:shadow-md">
      {/* Product Image */}
      <Link
        href={detailUrl}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-field"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-maroon shadow-xs backdrop-blur-xs">
              {product.badge}
            </span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink sm:text-xl group-hover:text-maroon transition-colors duration-150">
            <Link href={detailUrl} className="focus:outline-none focus:underline">
              {product.name}
            </Link>
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Quick Specifications Snapshot */}
          {topSpecs.length > 0 && (
            <dl className="mt-4 space-y-1.5 border-t border-line/70 pt-3.5 text-xs">
              {topSpecs.map((spec) => (
                <div key={spec.property} className="flex items-baseline justify-between gap-2">
                  <dt className="text-muted shrink-0">{spec.property}:</dt>
                  <dd className="font-medium text-ink text-right truncate">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Dual Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-line pt-4 gap-2">
          <Link
            href={detailUrl}
            className="inline-flex items-center gap-1 text-xs font-semibold text-maroon hover:text-ink transition-colors group/link py-1"
          >
            <span>View details</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>

          <Button
            href={quoteUrl}
            size="sm"
            variant="secondary"
            className="rounded-full px-3.5 py-1 text-xs hover:bg-maroon hover:text-white hover:border-maroon"
          >
            Request quote
          </Button>
        </div>
      </div>
    </div>
  );
}

