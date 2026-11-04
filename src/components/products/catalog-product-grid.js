"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { CatalogProductCard } from "./catalog-product-card";
import { QuoteModal } from "./quote-modal";
import { cn } from "@/lib/utils";

const CATEGORY_CHIPS = [
  { id: "all", label: "All Products" },
  { id: "rubberised-cork", label: "Rubberised Cork" },
  { id: "cork-products", label: "Plain Natural Cork" },
  { id: "decorative-cork", label: "Acoustic & Decorative" },
  { id: "cork-gifts", label: "Office & Lifestyle" },
];

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-line bg-white animate-pulse">
      <div>
        <div className="aspect-[4/3] w-full bg-field/80" />
        <div className="p-5 sm:p-6">
          <div className="h-5 w-3/4 rounded bg-field" />
          <div className="mt-3 space-y-2">
            <div className="h-3.5 w-full rounded bg-field/70" />
            <div className="h-3.5 w-4/5 rounded bg-field/70" />
          </div>
          <div className="mt-4 space-y-2 border-t border-line/60 pt-3">
            <div className="h-3 w-5/6 rounded bg-field/60" />
            <div className="h-3 w-4/6 rounded bg-field/60" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line bg-field/20 px-5 py-3.5 sm:px-6">
        <div className="h-3.5 w-24 rounded bg-field" />
        <div className="h-7 w-24 rounded-full bg-field" />
      </div>
    </div>
  );
}

export function CatalogProductGrid() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(null);

  // Exactly 3 featured cards per view on homepage
  const limit = 3;

  const fetchProducts = useCallback(
    async (currentPage, category) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(limit),
        });

        if (category && category !== "all") {
          params.set("category", category);
        }

        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) {
          throw new Error(`Server returned HTTP ${res.status}`);
        }

        const json = await res.json();
        setProducts(json.data || []);
        setTotal(json.total || 0);
        setTotalPages(json.totalPages || 1);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to connect to the product database. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchProducts(page, activeCategory);
  }, [page, activeCategory, fetchProducts]);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
    setPage(1);
  };

  const handleRetry = () => {
    fetchProducts(page, activeCategory);
  };

  const catalogBrowseUrl =
    activeCategory === "all" ? "/products" : `/products/${activeCategory}`;

  return (
    <div className="w-full">
      {/* 2. Main Content: Single Row of 3 Cards */}
      <div className="mt-10">
        {/* Error State */}
        {error && !loading && (
          <div
            role="alert"
            className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center sm:p-12"
          >
            <AlertCircle className="size-8 text-maroon" />
            <h3 className="mt-3 text-base font-semibold text-ink sm:text-lg">
              Failed to load product catalogue
            </h3>
            <p className="mt-1 max-w-md text-xs sm:text-sm text-muted">
              {error}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-maroon px-5 py-2 text-xs font-semibold text-white hover:bg-maroon-deep transition-colors cursor-pointer"
            >
              <RefreshCw className="size-3.5" />
              <span>Retry connection</span>
            </button>
          </div>
        )}

        {/* Loading State: 3 Skeleton Cards in 1 Row */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white p-12 text-center">
            <h3 className="text-base font-semibold text-ink">
              No products found in this category
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              Try selecting another category or view all products.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className="mt-4 rounded-full border border-maroon/60 px-4 py-1.5 text-xs font-semibold text-maroon hover:bg-maroon hover:text-white transition-colors cursor-pointer"
            >
              View All Products
            </button>
          </div>
        )}

        {/* 3 Featured Products in a clean 1x3 desktop row */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <CatalogProductCard
                  key={product.id || product.slug}
                  product={product}
                  onRequestQuote={(p) => setSelectedProductForQuote(p)}
                />
              ))}
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-line pt-4 sm:flex-row">
              <div className="flex items-center gap-2 text-xs text-muted sm:text-sm">
                <span>
                  Showing{" "}
                  <strong className="font-semibold text-ink">
                    {(page - 1) * limit + 1}–{Math.min(page * limit, total)}
                  </strong>{" "}
                  of <strong className="font-semibold text-ink">{total}</strong> materials
                </span>
                {totalPages > 1 && (
                  <span className="text-muted/60">
                    (Page {page} of {totalPages})
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Subtle Prev/Next pagination buttons */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      aria-label="Previous 3 products"
                      className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-maroon hover:text-maroon disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      aria-label="Next 3 products"
                      className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-maroon hover:text-maroon disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                )}

                {/* Explore Full Catalogue Link */}
                <Link
                  href={catalogBrowseUrl}
                  className="inline-flex items-center gap-1.5 rounded-full border border-maroon/60 bg-white px-4 py-1.5 text-xs font-semibold text-maroon hover:bg-maroon hover:text-white transition-colors"
                >
                  <span>Explore all {total} materials</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. Quote Modal */}
      <QuoteModal
        product={selectedProductForQuote}
        isOpen={Boolean(selectedProductForQuote)}
        onClose={() => setSelectedProductForQuote(null)}
      />
    </div>
  );
}
