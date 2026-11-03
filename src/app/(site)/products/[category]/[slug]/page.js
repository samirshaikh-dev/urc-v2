import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Check,
  FileCheck2,
  Layers,
  Ruler,
} from "lucide-react";
import {
  PRODUCTS,
  CATEGORY_DETAILS,
  getCategoryBySlug,
} from "@/data/products";
import { getProductBySlug, getProductsByCategory } from "@/services/products/public/get-product";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductSpecTable } from "@/components/products/product-spec-table";
import { ProductFaqAccordion } from "@/components/products/product-faq-accordion";
import { ProductsEnquiryCTA } from "@/components/products/products-enquiry-cta";
import { constructMetadata } from "@/lib/seo";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-url";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug: productSlug } = await params;
  const product = await getProductBySlug(productSlug, categorySlug);

  if (!product) {
    return constructMetadata({
      title: "Product Not Found",
      path: `/products/${categorySlug}/${productSlug}`,
    });
  }

  const cleanDescription = (product.shortDescription || product.fullDescription || "")
    .replace(/<[^>]*>/g, " ")
    .slice(0, 160);

  return constructMetadata({
    title: `${product.name} | United Rubber Cork`,
    description: cleanDescription,
    path: `/products/${product.category}/${product.slug}`,
  });
}

async function RelatedProductsSection({ category, currentSlug }) {
  let categoryProducts = [];
  try {
    categoryProducts = await getProductsByCategory(category.slug || category.id);
  } catch {
    return null;
  }
  const relatedProducts = (categoryProducts || []).filter((p) => p.slug !== currentSlug);

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-line bg-white py-14 sm:py-16">
      <Container>
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              More in {category.name}
            </span>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              Related Materials &amp; Profiles
            </h2>
          </div>
          <Link
            href={`/products/${category.slug}`}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-maroon hover:text-ink"
          >
            <span>View all in category</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {relatedProducts.slice(0, 2).map((rel) => (
            <div
              key={rel.id || rel.slug}
              className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-line bg-page/30 hover:border-maroon/30 transition-colors"
            >
              <div className="relative aspect-[16/10] sm:aspect-square w-full sm:w-40 shrink-0 bg-field">
                <Image
                  src={
                    optimizeCloudinaryUrl(rel.image, { width: 800 }) ||
                    "/images/placeholder-product.jpg"
                  }
                  alt={rel.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                  <h3 className="text-sm font-semibold text-ink group-hover:text-maroon transition-colors">
                    <Link href={`/products/${rel.category}/${rel.slug}`}>
                      {rel.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-xs text-muted line-clamp-2">
                    {rel.shortDescription || rel.description}
                  </p>
                </div>
                <div className="mt-3">
                  <Link
                    href={`/products/${rel.category}/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-maroon"
                  >
                    <span>View details</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default async function ProductDetailPage({ params }) {
  const { category: categorySlug, slug: productSlug } = await params;
  let product = null;
  let dbError = null;

  try {
    product = await getProductBySlug(productSlug, categorySlug);
  } catch (err) {
    dbError = err;
  }

  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  if (dbError) {
    return (
      <section className="py-16 sm:py-24">
        <Container>
          <div className="rounded-3xl border border-line bg-white p-8 text-center sm:p-14 shadow-xs">
            <h1 className="text-xl font-semibold text-ink sm:text-2xl">
              Product Details Temporarily Unavailable
            </h1>
            <p className="mt-3 text-sm text-muted max-w-md mx-auto">
              {dbError.message ||
                "We are currently updating our product catalog. Please reach out to our team directly for material specifications and quotations."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={`/products/${categorySlug}`} variant="secondary" size="sm" className="rounded-full">
                View Category
              </Button>
              <Button href={`/contact?product=${encodeURIComponent(productSlug)}`} size="sm" className="rounded-full">
                Request Quote Directly
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (!product) {
    notFound();
  }

  const quoteUrl = `/contact?product=${encodeURIComponent(product.name)}`;
  const hasHtml = typeof product.fullDescription === "string" && /<[a-z][\s\S]*>/i.test(product.fullDescription);

  return (
    <>
      {/* 01. BREADCRUMBS & PRODUCT OVERVIEW HERO */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16">
        <Container>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="hover:text-maroon transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
            <Link href="/products" className="hover:text-maroon transition-colors">
              Products
            </Link>
            <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
            <Link href={`/products/${category.slug}`} className="hover:text-maroon transition-colors">
              {category.name}
            </Link>
            <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
            <span className="font-semibold text-ink" aria-current="page">
              {product.name}
            </span>
          </nav>

          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Product Imagery */}
              <div className="relative min-h-[340px] w-full bg-field lg:col-span-6 lg:min-h-full">
                <Image
                  src={
                    optimizeCloudinaryUrl(product.image, { width: 1600 }) ||
                    "/images/placeholder-product.jpg"
                  }
                  alt={product.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-maroon shadow-xs backdrop-blur-xs">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Primary Information */}
              <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 lg:col-span-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-line bg-field px-3 py-1 text-xs font-medium text-ink">
                    <Layers className="size-3.5 text-maroon" aria-hidden="true" />
                    <span>{category.name}</span>
                  </div>

                  <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                    {product.name}
                  </h1>

                  {/* Description: Rich-Text or Plain */}
                  <div className="mt-4">
                    {hasHtml ? (
                      <div
                        className="text-sm leading-relaxed text-muted sm:text-base [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_strong]:text-ink"
                        dangerouslySetInnerHTML={{ __html: product.fullDescription }}
                      />
                    ) : (
                      <p className="text-sm leading-relaxed text-muted sm:text-base whitespace-pre-line">
                        {product.fullDescription || product.shortDescription}
                      </p>
                    )}
                  </div>

                  {/* Key Features List (if available) */}
                  {Array.isArray(product.features) && product.features.length > 0 && (
                    <div className="mt-6 border-t border-line/70 pt-4">
                      <h2 className="text-xs font-semibold uppercase tracking-wider text-orange-ink mb-3">
                        Key Features &amp; Capabilities
                      </h2>
                      <ul className="space-y-2 text-xs sm:text-sm text-ink/90">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="size-4 shrink-0 text-orange-ink mt-0.5" aria-hidden="true" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-8 border-t border-line pt-6 flex flex-wrap items-center gap-4">
                  <Button href={quoteUrl} size="md" className="rounded-full px-6 shadow-xs">
                    Request quote for this product
                    <ArrowRight className="size-4 ml-1.5" />
                  </Button>
                  <Button href="/contact" variant="secondary" size="md" className="rounded-full px-6">
                    Submit custom drawing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02. TECHNICAL SPECIFICATIONS & APPLICATIONS (if specifications exist) */}
      {Array.isArray(product.specifications) && product.specifications.length > 0 && (
        <section className="border-t border-line bg-page/40 py-16 sm:py-20">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
              {/* Left Column: Specifications Table */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                    Technical Data
                  </span>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    Specifications &amp; Standards
                  </h2>
                </div>

                <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xs">
                  <ProductSpecTable specifications={product.specifications} />
                </div>
              </div>

              {/* Right Column: Applications */}
              <div className="lg:col-span-5 space-y-8">
                {Array.isArray(product.applications) && product.applications.length > 0 && (
                  <div className="rounded-2xl border border-line bg-white p-6 sm:p-7 shadow-2xs space-y-4">
                    <h3 className="text-base font-semibold text-ink flex items-center gap-2">
                      <Ruler className="size-4 text-maroon" />
                      <span>Industrial Applications</span>
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-ink/80">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-orange shrink-0" aria-hidden="true" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Trust Signal Box */}
                <div className="rounded-2xl border border-maroon/20 bg-maroon/5 p-5 text-xs text-ink/80 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-maroon">
                    <ShieldCheck className="size-4" />
                    <span>Direct Works Guarantee</span>
                  </div>
                  <p className="leading-relaxed text-muted">
                    Manufactured and inspected at our Vapi facility. Material test certificates (MTC) and pre-production samples provided upon request.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 03. UNLIMITED PRODUCT FAQS ACCORDION */}
      {Array.isArray(product.faqs) && product.faqs.length > 0 && (
        <ProductFaqAccordion faqs={product.faqs} productName={product.name} />
      )}

      {/* 04. RELATED PRODUCTS IN THIS CATEGORY */}
      <Suspense fallback={null}>
        <RelatedProductsSection category={category} currentSlug={product.slug} />
      </Suspense>

      {/* 05. PRODUCT FINAL ENQUIRY CTA */}
      <ProductsEnquiryCTA
        headline={`Request a custom quotation for ${product.name}`}
        description="Submit your thickness, dimensional requirements, or drawing file. Our sales and engineering team will provide comprehensive pricing and lead times."
        productName={product.name}
        buttonText="Request a Quote"
      />
    </>
  );
}
