import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/data/products";
import { TextLink } from "@/components/ui/text-link";

/**
 * Product shown as an editorial row rather than a card.
 * The product name is the only link; its overlay makes the whole row clickable
 * without introducing nested interactive elements.
 */
export function ProductCard({ product }) {
  const category = PRODUCT_CATEGORIES.find((item) => item.id === product.category);
  const specifications = (product.specifications ?? []).slice(0, 3);

  return (
    <li className="group relative">
      <div className="grid gap-5 py-8 sm:py-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          {category && <p className="text-xs text-muted">{category.name}</p>}
          <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            <Link
              href={`/products/${product.slug}`}
              className="transition-colors duration-150 after:absolute after:inset-0 after:content-[''] group-hover:text-maroon"
            >
              {product.name}
            </Link>
          </h3>
          <span
            aria-hidden="true"
            className="mt-3 hidden items-center gap-1.5 text-sm font-medium text-maroon sm:inline-flex"
          >
            View details
            <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:translate-x-0" />
          </span>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-muted lg:col-span-4">
          {product.shortDescription}
        </p>

        {specifications.length > 0 && (
          <dl className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {specifications.map((spec) => (
              <div key={spec.property}>
                <dt className="text-xs text-muted">{spec.property}</dt>
                <dd className="mt-0.5 text-sm text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Sits above the row-wide link so the enquiry path stays clickable. */}
        <div className="lg:col-span-12 lg:flex lg:justify-end">
          <TextLink href="#quote" className="relative z-10 mt-1">
            Request a quote
          </TextLink>
        </div>
      </div>
    </li>
  );
}
