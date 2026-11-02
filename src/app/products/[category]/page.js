import { notFound } from "next/navigation";
import {
  PRODUCT_CATEGORIES,
  CATEGORY_DETAILS,
  getProductByCategory,
  getCategoryBySlug,
} from "@/data/products";
import { CategoryHero } from "@/components/products/category-hero";
import { CategoryProductCard } from "@/components/products/category-product-card";
import { CategoryBenefits } from "@/components/products/category-benefits";
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

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductByCategory(category.id);

  return (
    <>
      {/* 01. CATEGORY HERO */}
      <CategoryHero category={category} />

      {/* 02. PRODUCT LISTING GRID */}
      <section id="products-list" className="scroll-mt-24 py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                Product Range
              </span>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {category.name} Range &amp; Profiles
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted">
              Showing {products.length} standard configurations &amp; custom fabrication grades
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <CategoryProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* 03. APPLICATIONS & ENGINEERING BENEFITS */}
      <CategoryBenefits category={category} />

      {/* 04. TECHNICAL SELECTION GUIDE */}
      <CategorySelectionGuide selectionGuide={category.selectionGuide} />

      {/* 05. CUSTOM FABRICATION & TOOLING CALLOUT */}
      <ProductsCustomTooling />

      {/* 06. ENQUIRY CTA */}
      <ProductsEnquiryCTA
        headline={`Need a specific ${category.name.toLowerCase()} specification?`}
        description="Contact our team for technical consultations, custom tolerances, and volume quotations."
        productName={category.name}
        buttonText="Request a Quote"
      />
    </>
  );
}

