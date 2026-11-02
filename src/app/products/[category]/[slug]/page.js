import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Check,
  FileCheck2,
  HelpCircle,
  Layers,
  Ruler,
} from "lucide-react";
import {
  PRODUCTS,
  CATEGORY_DETAILS,
  getProductBySlug,
  getCategoryBySlug,
  getProductByCategory,
} from "@/data/products";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductSpecTable } from "@/components/products/product-spec-table";
import { ProductsEnquiryCTA } from "@/components/products/products-enquiry-cta";
import { constructMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug: productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product || product.category !== categorySlug) {
    return constructMetadata({
      title: "Product Not Found",
      path: `/products/${categorySlug}/${productSlug}`,
    });
  }

  return constructMetadata({
    title: `${product.name} | United Rubber Cork`,
    description: product.shortDescription,
    path: `/products/${product.category}/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }) {
  const { category: categorySlug, slug: productSlug } = await params;
  const product = getProductBySlug(productSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!product || product.category !== categorySlug || !category) {
    notFound();
  }

  const quoteUrl = `/contact?product=${encodeURIComponent(product.name)}`;
  const relatedProducts = getProductByCategory(product.category).filter(
    (p) => p.id !== product.id
  );

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
              <div className="relative min-h-[320px] w-full bg-field lg:col-span-6 lg:min-h-full">
                <Image
                  src={product.image}
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

                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {product.fullDescription || product.shortDescription}
                  </p>

                  {/* Key Features List */}
                  <div className="mt-6 border-t border-line/70 pt-4">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-orange-ink mb-3">
                      Key Engineering Capabilities
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

      {/* 02. TECHNICAL SPECIFICATIONS & APPLICATIONS */}
      <section className="border-t border-line bg-page/40 py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left Column: Specifications Table */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                  Standard Conformance
                </span>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Technical Specifications
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Parameters adhere to verified industrial standards (IS: 4253 / ASTM F104 / BS Specifications).
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xs">
                <ProductSpecTable specifications={product.specifications} />
              </div>
            </div>

            {/* Right Column: Applications & What to Share */}
            <div className="lg:col-span-5 space-y-8">
              {/* Target Applications */}
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

              {/* What to share when requesting a quote (Psychology.md) */}
              <div className="rounded-2xl border border-line bg-white p-6 sm:p-7 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-ink">
                  <FileCheck2 className="size-4 text-maroon" />
                  <span>RFQ Guidance</span>
                </div>
                <h3 className="text-base font-semibold text-ink">
                  What information helps us quote faster?
                </h3>
                <p className="text-xs leading-relaxed text-muted">
                  {product.howToSpecify}
                </p>
                <div className="pt-2">
                  <Link
                    href={quoteUrl}
                    className="inline-flex text-xs font-semibold text-maroon hover:underline"
                  >
                    Open quotation form with prefilled product →
                  </Link>
                </div>
              </div>

              {/* Trust Signal Box */}
              <div className="rounded-2xl border border-maroon/20 bg-maroon/5 p-5 text-xs text-ink/80 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-maroon">
                  <ShieldCheck className="size-4" />
                  <span>Direct Works Guarantee</span>
                </div>
                <p className="leading-relaxed text-muted">
                  Manufactured and inspected at our Vapi facility. Physical material test certificates (MTC) and pre-production samples provided upon request.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 03. RELATED PRODUCTS IN THIS CATEGORY */}
      {relatedProducts.length > 0 && (
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
                  key={rel.id}
                  className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-line bg-page/30 hover:border-maroon/30 transition-colors"
                >
                  <div className="relative aspect-[16/10] sm:aspect-square w-full sm:w-40 shrink-0 bg-field">
                    <Image
                      src={rel.image}
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
                        {rel.shortDescription}
                      </p>
                    </div>
                    <div className="mt-3">
                      <Link
                        href={`/products/${rel.category}/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-maroon"
                      >
                        <span>Specifications</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 04. PRODUCT FINAL ENQUIRY CTA */}
      <ProductsEnquiryCTA
        headline={`Request a custom quotation for ${product.name}`}
        description="Submit your thickness, dimensional requirements, or drawing file. Our sales and engineering team will provide comprehensive pricing and lead times."
        productName={product.name}
        buttonText="Request a Quote"
      />
    </>
  );
}

