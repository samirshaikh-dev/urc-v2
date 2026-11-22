import { CATEGORY_DETAILS } from "@/data/products";
import { SITE_CONFIG } from "@/lib/constants";
import { getFaqPageJsonLd } from "./structured-data";
import {
  buildAbsoluteUrl,
  getSiteUrl,
  normalizeSeoPath,
  resolveSeoUrl,
  sanitizeSeoText,
  truncateSeoText,
} from "./url";

function capitalizeWords(value) {
  return sanitizeSeoText(value)
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Return the human-readable category name without inventing a new label. */
export function getCategoryName(category) {
  if (!category) return "";

  if (typeof category === "string") {
    return CATEGORY_DETAILS[category]?.name || capitalizeWords(category);
  }

  return sanitizeSeoText(category.name) || getCategoryName(category.slug);
}

function getProductCategorySlug(product, category) {
  return sanitizeSeoText(category?.slug) || sanitizeSeoText(product?.category);
}

/** Canonical internal path for a product detail page. */
export function getProductCanonicalPath(product, category) {
  const categorySlug = getProductCategorySlug(product, category);
  const slug = sanitizeSeoText(product?.slug).replace(/^\/+|\/+$/g, "");

  if (!categorySlug || !slug) return "/products";
  return normalizeSeoPath(`/products/${categorySlug}/${slug}`);
}

/** Unique, factual product title derived from stored SEO/name data only. */
export function getProductTitle(product, category) {
  const seoTitle = sanitizeSeoText(product?.seoTitle);
  if (seoTitle) return seoTitle;

  const name = sanitizeSeoText(product?.name);
  const categoryName = getCategoryName(category || getProductCategorySlug(product, category));

  if (!name) return categoryName || SITE_CONFIG.name;
  if (!categoryName || name.toLocaleLowerCase().includes(categoryName.toLocaleLowerCase())) {
    return name;
  }

  return `${name} — ${categoryName}`;
}

/** Meta description derived from stored SEO/description data only. */
export function getProductMetaDescription(product) {
  const seoDescription = sanitizeSeoText(product?.seoDescription);
  if (seoDescription) return truncateSeoText(seoDescription, 160);

  const shortDescription = sanitizeSeoText(product?.shortDescription);
  if (shortDescription) return truncateSeoText(shortDescription, 160);

  const fullDescription = sanitizeSeoText(product?.fullDescription);
  if (fullDescription) return truncateSeoText(fullDescription, 160);

  return "";
}

function getProductDescriptionForSchema(product) {
  return (
    getProductMetaDescription(product) ||
    sanitizeSeoText(product?.introduction) ||
    sanitizeSeoText(product?.overview) ||
    ""
  );
}

/** Stored image source, kept relative when the CMS stores a local path. */
export function getProductImageSource(product) {
  return sanitizeSeoText(product?.seoImageUrl) || sanitizeSeoText(product?.image);
}

/** Absolute product image URL for metadata, JSON-LD and sitemap entries. */
export function getProductImageUrl(product) {
  const raw = getProductImageSource(product);
  return raw ? resolveSeoUrl(raw) : "";
}

/** OG image always falls back to the site-level OG image. */
export function getProductOgImageUrl(product) {
  return getProductImageUrl(product) || resolveSeoUrl("/og-image.png");
}

/** Descriptive alt text derived from stored imageAlt/name/category data. */
export function getProductImageAlt(product, category) {
  const provided = sanitizeSeoText(product?.imageAlt);
  if (provided) return provided;

  const name = sanitizeSeoText(product?.name);
  const categoryName = getCategoryName(category || getProductCategorySlug(product, category));

  if (name && categoryName) return `${name} — ${categoryName}`;
  return name || categoryName || SITE_CONFIG.name;
}

/** Explicit Open Graph fields for constructMetadata. */
export function getProductOpenGraph(product, category) {
  return {
    title: getProductTitle(product, category),
    description: getProductMetaDescription(product),
    image: getProductOgImageUrl(product),
    alt: getProductImageAlt(product, category),
  };
}

/** Explicit Twitter fields for constructMetadata. */
export function getProductTwitter(product, category) {
  const openGraph = getProductOpenGraph(product, category);

  return {
    title: openGraph.title,
    description: openGraph.description,
    image: openGraph.image,
    alt: openGraph.alt,
  };
}

function hasSupportingContent(value) {
  if (typeof value === "string") return Boolean(sanitizeSeoText(value));
  if (!value || typeof value !== "object") return false;

  return Object.values(value).some((item) => {
    if (typeof item === "string") return Boolean(sanitizeSeoText(item));
    if (Array.isArray(item)) return item.length > 0;
    return item !== undefined && item !== null && item !== "";
  });
}

/**
 * Central product indexing/sitemap policy.
 *
 * - visibility !== 'public' => hidden/not found, never indexable
 * - indexingStatus 'noindex' always wins
 * - indexingStatus 'index' explicitly opts in despite discontinued/thin data
 * - discontinued is noindex unless explicitly opted in
 * - 'active' and 'out_of_stock' are indexable by default
 * - thin products (no name/description or no unique supporting content) are
 *   noindex unless explicitly opted in
 */
export function getProductIndexability(product) {
  const reasons = [];
  const visibility = sanitizeSeoText(product?.visibility);
  const indexingStatus = sanitizeSeoText(product?.indexingStatus);
  const lifecycleStatus = sanitizeSeoText(product?.lifecycleStatus);
  const explicitIndex = indexingStatus === "index";

  const visible = visibility === "public";
  if (!visible) reasons.push("visibility-not-public");
  if (indexingStatus === "noindex") reasons.push("indexing-status-noindex");
  if (lifecycleStatus === "discontinued" && !explicitIndex) {
    reasons.push("lifecycle-discontinued");
  }

  const name = sanitizeSeoText(product?.name);
  const descriptiveText = [
    product?.seoDescription,
    product?.shortDescription,
    product?.fullDescription,
    product?.introduction,
    product?.overview,
  ]
    .map(sanitizeSeoText)
    .filter(Boolean)
    .join(" ");

  if (!name || !descriptiveText) {
    reasons.push("insufficient-description");
  }

  const supportingContent = [
    product?.introduction,
    product?.features,
    product?.applications,
    product?.benefits,
    product?.specifications,
    product?.faqs,
  ];

  if (!supportingContent.some(hasSupportingContent)) {
    reasons.push("insufficient-supporting-content");
  }

  const blockedByQuality =
    reasons.includes("lifecycle-discontinued") ||
    reasons.includes("insufficient-description") ||
    reasons.includes("insufficient-supporting-content");

  const indexable =
    visible &&
    !reasons.includes("indexing-status-noindex") &&
    (explicitIndex || !blockedByQuality);

  return { visible, indexable, reasons };
}

function getSortOrder(value) {
  const order = Number(value?.sortOrder);
  return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
}

/** FAQs that are non-empty and not explicitly hidden, in stored order. */
export function getVisibleFaqs(product) {
  return (Array.isArray(product?.faqs) ? product.faqs : [])
    .filter((faq) => {
      if (!faq || faq.visible === false || faq.isHidden === true) return false;
      if (faq.status && String(faq.status).toLowerCase() === "hidden") return false;
      return Boolean(sanitizeSeoText(faq.question) && sanitizeSeoText(faq.answer));
    })
    .sort((a, b) => getSortOrder(a) - getSortOrder(b));
}

/** Specifications in stored order, with empty rows removed. */
export function getVisibleSpecifications(product) {
  return (Array.isArray(product?.specifications) ? product.specifications : [])
    .filter(
      (spec) =>
        spec &&
        (sanitizeSeoText(spec.property) || sanitizeSeoText(spec.value))
    )
    .sort((a, b) => getSortOrder(a) - getSortOrder(b));
}

function getListContent(product, field) {
  return (Array.isArray(product?.[field]) ? product[field] : [])
    .map(sanitizeSeoText)
    .filter(Boolean);
}

/** Content sections that can be rendered without inventing any copy. */
export function getProductContentSections(product) {
  return {
    introduction: sanitizeSeoText(product?.introduction),
    overview: sanitizeSeoText(product?.overview),
    fullDescription: sanitizeSeoText(product?.fullDescription),
    features: getListContent(product, "features"),
    applications: getListContent(product, "applications"),
    benefits: getListContent(product, "benefits"),
    specifications: getVisibleSpecifications(product),
    faqs: getVisibleFaqs(product),
  };
}

/**
 * Product + FAQ schema nodes. No offers/price/availability are emitted because
 * the product data contract has no genuine price or availability fields.
 */
export function getProductJsonLd(product, category) {
  if (!product) return [];

  const siteUrl = getSiteUrl();
  const categoryName = getCategoryName(category || getProductCategorySlug(product, category));
  const name = sanitizeSeoText(product.name);
  if (!name) return [];

  const canonicalUrl = buildAbsoluteUrl(getProductCanonicalPath(product, category), siteUrl);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    name,
    description: getProductDescriptionForSchema(product),
    url: canonicalUrl,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: siteUrl,
    },
  };

  if (categoryName) {
    productSchema.category = categoryName;
  }

  const imageUrl = getProductImageUrl(product);
  if (imageUrl) {
    productSchema.image = imageUrl;
  }

  const sku = sanitizeSeoText(product.sku);
  if (sku) productSchema.sku = sku;

  const mpn = sanitizeSeoText(product.mpn);
  if (mpn) productSchema.mpn = mpn;

  const schemas = [productSchema];
  const faqSchema = getFaqPageJsonLd(getVisibleFaqs(product));
  if (faqSchema) schemas.push(faqSchema);

  return schemas;
}

/** Breadcrumb trail shared by the visible nav and JSON-LD. */
export function getProductBreadcrumbs(product, category) {
  const categorySlug = getProductCategorySlug(product, category);
  const categoryName = getCategoryName(category || categorySlug);

  return [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    ...(categorySlug && categoryName
      ? [{ name: categoryName, url: `/products/${categorySlug}` }]
      : []),
    {
      name: sanitizeSeoText(product?.name) || "Product",
      url: getProductCanonicalPath(product, category),
    },
  ];
}

/**
 * Related products: explicit relatedProductIds first, then same-category
 * items. Hidden/noindex products and the current product are always excluded.
 */
export function getRelatedProducts(product, allProducts, limit = 4) {
  if (!product || !Array.isArray(allProducts)) return [];

  const byId = new Map();
  const bySlug = new Map();
  for (const item of allProducts) {
    if (!item) continue;
    if (item.id) byId.set(String(item.id), item);
    if (item.slug) bySlug.set(String(item.slug), item);
  }

  const candidates = (Array.isArray(product.relatedProductIds) ? product.relatedProductIds : [])
    .map((id) => byId.get(String(id)) || bySlug.get(String(id)))
    .filter(Boolean);

  const categorySlug = getProductCategorySlug(product);
  if (categorySlug) {
    candidates.push(
      ...allProducts.filter(
        (item) => item && getProductCategorySlug(item) === categorySlug
      )
    );
  }

  const seen = new Set(
    [product.id, product.slug].filter(Boolean).map((value) => String(value))
  );
  const related = [];

  for (const item of candidates) {
    if (related.length >= limit) break;
    if (!item) continue;

    const keys = [item.id, item.slug].filter(Boolean).map((value) => String(value));
    if (keys.some((key) => seen.has(key))) continue;

    const { visible, indexable } = getProductIndexability(item);
    if (!visible || !indexable) continue;

    keys.forEach((key) => seen.add(key));
    related.push(item);
  }

  return related;
}
