import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  PRODUCT_CATEGORIES,
  CATEGORY_DETAILS,
  getCategoryBySlug,
} from "@/data/products";
import { getProductsByCategory } from "@/lib/products-db";
import { CategoryHero } from "@/components/products/category-hero";
import { CategoryProductCard } from "@/components/products/category-product-card";
import { CategorySelectionGuide } from "@/components/products/category-selection-guide";
import { ProductsCustomTooling } from "@/components/products/products-custom-tooling";
import { ProductsEnquiryCTA } from "@/components/products/products-enquiry-cta";
import { Container } from "@/components/ui/container";
import { constructMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return Object.keys(CATEGORY_DETAILS).map((categorySlug) => ({
    category: categorySlug,
  }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return constructMetadata({
      title: "Product Category Not Found",
      path: `/products/${categorySlug}`,
    });
  }

  return constructMetadata({
    title: `${category.name} | United Rubber Cork`,
    description: category.metaDescription,
    path: `/products/${category.slug}`,
  });
}

function CategoryProductSkeleton({ categoryName }) {
  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
            Products in {categoryName}
          </span>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {categoryName} Range
          </h2>
        </div>
        <div className="h-4 w-28 animate-pulse rounded bg-line/60" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white animate-pulse"
          >
            <div className="aspect-[16/10] w-full bg-field/80" />
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="h-5 w-3/4 rounded bg-field" />
                <div className="mt-3 space-y-2">
                  <div className="h-3.5 w-full rounded bg-field/70" />
                  <div className="h-3.5 w-4/5 rounded bg-field/70" />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <div className="h-3.5 w-20 rounded bg-field" />
                <div className="h-3.5 w-4 rounded bg-field" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

async function CategoryProductList({ category }) {
  const products = await getProductsByCategory(category.id);

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
            Products in {category.name}
          </span>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {category.name} Range
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted">
          {products.length} {products.length === 1 ? "product" : "products"} available
        </p>
      </div>

      {products.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-line bg-white p-12 text-center">
          <p className="text-sm font-medium text-ink">No products currently listed in this category.</p>
          <p className="mt-1 text-xs text-muted">New products added in the Admin Portal will appear here instantly.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <CategoryProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <>
      {/* 01. CATEGORY HERO */}
      <CategoryHero category={category} />

      {/* 02. DYNAMIC PRODUCT LISTING (STREAMED IN SUSPENSE) */}
      <section id="products-list" className="scroll-mt-24 py-12 sm:py-16">
        <Container>
          <Suspense fallback={<CategoryProductSkeleton categoryName={category.name} />}>
            <CategoryProductList category={category} />
          </Suspense>
        </Container>
      </section>

      {/* 03. TECHNICAL SELECTION GUIDE */}
      {category.selectionGuide && (
        <CategorySelectionGuide selectionGuide={category.selectionGuide} />
      )}

      {/* 04. CUSTOM FABRICATION & TOOLING CALLOUT */}
      <ProductsCustomTooling />

      {/* 05. ENQUIRY CTA */}
      <ProductsEnquiryCTA
        headline={`Need custom ${category.name} specifications?`}
        description="Contact our team for technical consultations, custom tolerances, and volume quotations."
        productName={category.name}
        buttonText="Request a Quote"
      />
    </>
  );
}
