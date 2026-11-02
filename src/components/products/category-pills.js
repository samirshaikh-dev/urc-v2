import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Reusable rounded pill navigation for product categories.
 * Horizontally scrollable on small screens with clean active indicators.
 * Fully accessible with aria-current="page".
 */
export function CategoryPills({ activeCategory = "all", className = "" }) {
  return (
    <nav
      aria-label="Product categories navigation"
      className={cn("w-full overflow-hidden", className)}
    >
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] text-sm">
        {PRODUCT_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <Link
              key={cat.id}
              href={cat.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-150 sm:text-sm",
                isActive
                  ? "bg-maroon text-white shadow-xs"
                  : "bg-white text-ink/80 border border-line hover:border-maroon/30 hover:bg-field hover:text-maroon"
              )}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

