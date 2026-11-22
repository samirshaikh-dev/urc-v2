import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, Layers, Ruler } from "lucide-react";
import { getCategoryBySlug } from "@/data/products";
import {
  getAllProducts,
  getProductBySlugWithStatus,
} from "@/services/products/public/get-product";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductSpecTable } from "@/components/products/product-spec-table";
import { ProductFaqAccordion } from "@/components/products/product-faq-accordion";
import { ProductsEnquiryCTA } from "@/components/products/products-enquiry-cta";
import {
  constructMetadata,
  getBreadcrumbJsonLd,
  getJsonLdScriptProps,
  getProductBreadcrumbs,
  getProductCanonicalPath,
  getProductContentSections,
  getProductImageAlt,
  getProductImageSource,
  getProductIndexability,
  getProductJsonLd,
  getProductMetaDescription,
  getProductOpenGraph,
  getProductTitle,
  getProductTwitter,
  getRelatedProducts,
} from "@/lib/seo";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-url";

// Cache Components requires at least one static param. When the catalog is
// unavailable at build time this placeholder is handled with notFound().
const BUILD_PLACEHOLDER = "__catalog_unavailable__";

export async function generateStaticParams() {
  try {
    const products = (await getAllProducts()) || [];
    const params = products
      .filter((product) => getProductIndexability(product).visible)
      .map((product) => ({
        category: product.category,
        slug: product.slug,
      }))
      .filter(({ category, slug }) => Boolean(category && slug));

    return params.length
      ? params
      : [{ category: BUILD_PLACEHOLDER, slug: BUILD_PLACEHOLDER }];
  } catch {
    return [{ category: BUILD_PLACEHOLDER, slug: BUILD_PLACEHOLDER }];
  }
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug: productSlug } = await params;
  const requestedPath = `/products/${categorySlug}/${productSlug}`;

  if (categorySlug === BUILD_PLACEHOLDER || productSlug === BUILD_PLACEHOLDER) {
    return constructMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      path: requestedPath,
      noIndex: true,
    });
  }

  let product = null;
  let unavailable = false;
  try {
    ({ product, unavailable } = await getProductBySlugWithStatus(productSlug, categorySlug));
  } catch {
    unavailable = true;
  }

  if (unavailable) {
    return constructMetadata({
      title: "Product Details Temporarily Unavailable",
      description: "Product information is temporarily unavailable.",
      path: requestedPath,
      noIndex: true,
    });
  }

  if (!product) {
    return constructMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      path: requestedPath,
      noIndex: true,
    });
  }

  const { visible, indexable } = getProductIndexability(product);
  if (!visible) {
    return constructMetadata({
      title: "Product Not Found",
      description: "The requested product could not be found.",
      path: requestedPath,
      noIndex: true,
    });
  }

  const openGraph = getProductOpenGraph(product, categorySlug);
  const twitter = getProductTwitter(product, categorySlug);

  return constructMetadata({
    title: getProductTitle(product, categorySlug),
    description: getProductMetaDescription(product),
    path: getProductCanonicalPath(product, categorySlug),
    noIndex: !indexable,
    index: indexable,
    follow: indexable,
    image: openGraph.image,
    imageAlt: openGraph.alt,
    openGraphTitle: openGraph.title,
    openGraphDescription: openGraph.description,
    openGraphImage: openGraph.image,
    openGraphImageAlt: openGraph.alt,
    twitterTitle: twitter.title,
    twitterDescription: twitter.description,
    twitterImage: twitter.image,
    twitterImageAlt: twitter.alt,
  });
}

function RelatedProductsSection({ category, currentProduct, products }) {
  const relatedProducts = getRelatedProducts(currentProduct, products, 4);
  if (relatedProducts.length === 0) return null;

  return (
    <section className="border-t border-line bg-white py-14 sm:py-16">
      <Container>
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              More in {category.name}
            </span>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              Related Products
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-maroon hover:text-ink"
          >
            <span>Browse all products</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {relatedProducts.map((related) => {
            const relatedUrl = getProductCanonicalPath(related);
            const relatedImage =
              optimizeCloudinaryUrl(getProductImageSource(related), { width: 800 }) ||
              "/images/placeholder-product.jpg";

            return (
              <article
                key={related.id || related.slug}
                className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-line bg-page/30 transition-colors hover:border-maroon/30"
              >
                <div className="relative aspect-[16/10] sm:aspect-square w-full sm:w-40 shrink-0 bg-field">
                  <Image
                    src={relatedImage}
                    alt={getProductImageAlt(related, related.category)}
                    fill
                    sizes="(min-width: 640px) 160px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <h3 className="text-sm font-semibold text-ink group-hover:text-maroon transition-colors">
                      <Link href={relatedUrl}>{related.name}</Link>
                    </h3>
                    <p className="mt-1.5 text-xs text-muted line-clamp-2">
                      {getProductMetaDescription(related)}
                    </p>
                  </div>
                  <div className="mt-3">
                    <Link
                      href={relatedUrl}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-maroon"
                    >
                      <span>View details</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default async function ProductDetailPage({ params }) {
  const { category: categorySlug, slug: productSlug } = await params;

  if (categorySlug === BUILD_PLACEHOLDER || productSlug === BUILD_PLACEHOLDER) {
    notFound();
  }

  let product = null;
  let dbUnavailable = false;
  try {
    ({ product, unavailable: dbUnavailable } = await getProductBySlugWithStatus(
      productSlug,
      categorySlug
    ));
  } catch {
    dbUnavailable = true;
  }

  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    notFound();
  }

  if (dbUnavailable) {
    return (
      <section className="py-16 sm:py-24">
        <Container>
          <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-xs sm:p-14">
            <h1 className="text-xl font-semibold text-ink sm:text-2xl">
              Product Details Temporarily Unavailable
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted">
              We are currently updating our product catalog. Please browse the
              category or contact our team for product information.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={`/products/${categorySlug}`} variant="secondary" size="sm" className="rounded-full">
                View Category
              </Button>
              <Button href="/contact" size="sm" className="rounded-full">
                Contact Us
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

  const { visible } = getProductIndexability(product);
  if (!visible) {
    notFound();
  }

  const sections = getProductContentSections(product);
  const breadcrumbs = getProductBreadcrumbs(product, category);
  const schemas = [getBreadcrumbJsonLd(breadcrumbs), ...getProductJsonLd(product, category)];
  const heroImage =
    optimizeCloudinaryUrl(getProductImageSource(product), { width: 1600 }) ||
    "/images/placeholder-product.jpg";
  const heroImageAlt = getProductImageAlt(product, category);
  const quoteUrl = `/contact?product=${encodeURIComponent(product.name)}`;

  const overviewParagraphs = [
    sections.introduction,
    sections.overview,
    sections.fullDescription,
    sections.fullDescription ? "" : getProductMetaDescription(product),
  ].filter((paragraph, index, all) => paragraph && all.indexOf(paragraph) === index);

  let allProducts = [];
  try {
    allProducts = (await getAllProducts()) || [];
  } catch {
    allProducts = [];
  }

  const hasTechnicalSection =
    sections.specifications.length > 0 ||
    sections.applications.length > 0 ||
    sections.benefits.length > 0;

  return (
    <>
      <script {...getJsonLdScriptProps(schemas)} />

      {/* Breadcrumbs and product overview */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-muted">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <span key={`${crumb.name}-${index}`} className="inline-flex items-center gap-1.5">
                  {isLast ? (
                    <span className="font-semibold text-ink" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.url} className="hover:text-maroon transition-colors">
                      {crumb.name}
                    </Link>
                  )}
                  {!isLast && (
                    <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
                  )}
                </span>
              );
            })}
          </nav>

          <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-maroon">
            <Link href={`/products/${category.slug}`} className="hover:text-ink">
              More in {category.name}
            </Link>
            <Link href="/products" className="hover:text-ink">
              All products
            </Link>
            <Link href="/industries" className="hover:text-ink">
              Industries
            </Link>
            <Link href={quoteUrl} className="hover:text-ink">
              Request a quote
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xs">
            <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
              <div className="relative min-h-[340px] w-full bg-field lg:col-span-6 lg:min-h-full">
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center"
                />
                {product.badge && (
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-maroon shadow-xs backdrop-blur-xs">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-6 lg:p-12">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-line bg-field px-3 py-1 text-xs font-medium text-ink">
                    <Layers className="size-3.5 text-maroon" aria-hidden="true" />
                    <span>{category.name}</span>
                  </div>

                  <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                    {product.name}
                  </h1>

                  {getProductMetaDescription(product) && (
                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted sm:text-base">
                      {getProductMetaDescription(product)}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                  <Button href={quoteUrl} size="md" className="rounded-full px-6 shadow-xs">
                    Request quote for this product
                    <ArrowRight className="ml-1.5 size-4" />
                  </Button>
                  <Button href="/contact" variant="secondary" size="md" className="rounded-full px-6">
                    Ask about this product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview */}
      {overviewParagraphs.length > 0 && (
        <section className="border-t border-line bg-page/40 py-14 sm:py-16">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Overview
            </h2>
            <div className="mt-5 max-w-3xl space-y-4">
              {overviewParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="whitespace-pre-line text-sm leading-relaxed text-muted sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Features */}
      {sections.features.length > 0 && (
        <section className="border-t border-line bg-white py-14 sm:py-16">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Key Features
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {sections.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-ink/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-orange-ink" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Technical details, applications and benefits */}
      {hasTechnicalSection && (
        <section className="border-t border-line bg-page/40 py-16 sm:py-20">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Technical Details
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="space-y-8 lg:col-span-7">
                {sections.specifications.length > 0 && (
                  <div>
                    <h3 className="text-base font-semibold text-ink">Specifications</h3>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white shadow-2xs">
                      <ProductSpecTable specifications={sections.specifications} />
                    </div>
                  </div>
                )}

                {sections.applications.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                      <Ruler className="size-4 text-maroon" aria-hidden="true" />
                      Applications
                    </h3>
                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-ink/80">
                      {sections.applications.map((application, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                          <span>{application}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-8 lg:col-span-5">
                {sections.benefits.length > 0 && (
                  <div className="rounded-2xl border border-line bg-white p-6 shadow-2xs sm:p-7">
                    <h3 className="text-base font-semibold text-ink">Benefits</h3>
                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-ink/80">
                      {sections.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-orange-ink" aria-hidden="true" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-2xl border border-maroon/20 bg-maroon/5 p-5 text-xs text-ink/80">
                  <h3 className="font-semibold text-maroon">Request specification details</h3>
                  <p className="mt-2 leading-relaxed text-muted">
                    Share your application, dimensions and quantity so we can
                    understand the requirement for {product.name}.
                  </p>
                  <Link
                    href={quoteUrl}
                    className="mt-3 inline-flex items-center gap-1 font-semibold text-maroon hover:text-ink"
                  >
                    Contact us about this product
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* FAQs (only stored, non-hidden entries are rendered and marked up) */}
      {sections.faqs.length > 0 && (
        <ProductFaqAccordion faqs={sections.faqs} productName={product.name} />
      )}

      <RelatedProductsSection
        category={category}
        currentProduct={product}
        products={allProducts}
      />

      <ProductsEnquiryCTA
        headline={`Request a quotation for ${product.name}`}
        description="Share your application, dimensions and quantity to help us understand the requirement."
        productName={product.name}
        buttonText="Request a Quote"
      />
    </>
  );
}
