import { SITE_CONFIG } from "@/lib/constants";
import { COMPANY_INFO } from "@/data/company";
import {
  buildAbsoluteUrl,
  getSiteUrl,
  sanitizeSeoText,
} from "./url";

function postalAddress(address = COMPANY_INFO.address) {
  if (!address) return undefined;

  return {
    "@type": "PostalAddress",
    streetAddress: address.street || undefined,
    addressLocality: address.city || undefined,
    addressRegion: address.state || undefined,
    postalCode: address.pincode || undefined,
    addressCountry: address.country || "IN",
  };
}

/**
 * Root organization and website schema using only verified company details.
 * No pricing, availability, certifications, ratings, or performance claims.
 */
export function getRootJsonLd() {
  const siteUrl = getSiteUrl();

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_CONFIG.name,
      url: siteUrl,
      description: sanitizeSeoText(SITE_CONFIG.description),
      address: postalAddress(),
      contactPoint: COMPANY_INFO.phone
        ? {
            "@type": "ContactPoint",
            telephone: COMPANY_INFO.phone,
            contactType: "sales",
            areaServed: "IN",
          }
        : undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: SITE_CONFIG.name,
      url: siteUrl,
      description: sanitizeSeoText(SITE_CONFIG.description),
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ];
}

/**
 * Generate CollectionPage + ItemList for category pages.
 */
export function getCollectionPageJsonLd({ name, description, path, items = [] } = {}) {
  const siteUrl = getSiteUrl();
  const listItems = (Array.isArray(items) ? items : [])
    .filter((item) => item && sanitizeSeoText(item.name) && sanitizeSeoText(item.url))
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sanitizeSeoText(item.name),
      url: buildAbsoluteUrl(item.url, siteUrl),
    }));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: sanitizeSeoText(name),
    description: sanitizeSeoText(description),
    url: buildAbsoluteUrl(path, siteUrl),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: listItems.length,
      itemListElement: listItems,
    },
  };
}

/**
 * BreadcrumbList structured data for hierarchical navigation.
 */
export function getBreadcrumbJsonLd(breadcrumbs = []) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: (Array.isArray(breadcrumbs) ? breadcrumbs : [])
      .filter((crumb) => crumb && sanitizeSeoText(crumb.name) && sanitizeSeoText(crumb.url))
      .map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: sanitizeSeoText(crumb.name),
        item: buildAbsoluteUrl(crumb.url, siteUrl),
      })),
  };
}

/**
 * FAQPage schema. Only questions and answers that are actually rendered may
 * be included; hidden or empty entries are filtered out.
 */
export function getFaqPageJsonLd(faqs = []) {
  const visibleFaqs = (Array.isArray(faqs) ? faqs : []).filter((faq) => {
    if (!faq || faq.visible === false || faq.isHidden === true) return false;
    if (faq.status && String(faq.status).toLowerCase() === "hidden") return false;
    return Boolean(sanitizeSeoText(faq.question) && sanitizeSeoText(faq.answer));
  });

  if (visibleFaqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visibleFaqs.map((faq) => ({
      "@type": "Question",
      name: sanitizeSeoText(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: sanitizeSeoText(faq.answer),
      },
    })),
  };
}

/**
 * AboutPage structured data. Kept factual: no unverified history or claims.
 */
export function getAboutPageJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE_CONFIG.name}`,
    url: buildAbsoluteUrl("/about", siteUrl),
    description: sanitizeSeoText(SITE_CONFIG.description),
    mainEntity: {
      "@id": `${siteUrl}/#organization`,
    },
  };
}

/**
 * ContactPage structured data using verified contact details only.
 */
export function getContactPageJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_CONFIG.name}`,
    url: buildAbsoluteUrl("/contact", siteUrl),
    description: `Contact ${SITE_CONFIG.name} for product enquiries and quotations.`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: siteUrl,
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      address: postalAddress(),
    },
  };
}

/**
 * Blog Listing / CollectionPage structured data for /blog
 */
export function getBlogListJsonLd(blogs = []) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blog#blog`,
    name: `Technical Blog & Engineering Guides | ${SITE_CONFIG.name}`,
    description:
      "Authoritative technical insights, material selection guides, and industry standards (IS 4253, ASTM F104) for rubberised cork and precision sealing materials.",
    url: buildAbsoluteUrl("/blog", siteUrl),
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: siteUrl,
      logo: buildAbsoluteUrl("/united-rubber-cork-logo.png", siteUrl),
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: sanitizeSeoText(blog.title),
      description: sanitizeSeoText(blog.excerpt),
      url: buildAbsoluteUrl(`/blog/${blog.slug}`, siteUrl),
      datePublished: new Date(blog.createdAt).toISOString(),
      dateModified: new Date(blog.updatedAt || blog.createdAt).toISOString(),
      author: {
        "@type": "Organization",
        name: blog.author || `${SITE_CONFIG.name} Engineering Team`,
      },
      image: blog.imageUrl?.startsWith("http")
        ? blog.imageUrl
        : buildAbsoluteUrl(blog.imageUrl || "/og-image.png", siteUrl),
    })),
  };
}

/**
 * Single Blog Article structured data for /blog/[slug]
 */
export function getBlogArticleJsonLd(blog) {
  if (!blog) return null;

  const siteUrl = getSiteUrl();
  const articleUrl = buildAbsoluteUrl(`/blog/${blog.slug}`, siteUrl);
  const imageUrl = blog.imageUrl
    ? blog.imageUrl.startsWith("http")
      ? blog.imageUrl
      : buildAbsoluteUrl(blog.imageUrl, siteUrl)
    : buildAbsoluteUrl("/og-image.png", siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "TechArticle"],
    "@id": `${articleUrl}#article`,
    headline: sanitizeSeoText(blog.title),
    description: sanitizeSeoText(blog.excerpt),
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: [imageUrl],
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt || blog.createdAt).toISOString(),
    author: {
      "@type": "Organization",
      name: blog.author || `${SITE_CONFIG.name} Engineering Team`,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: buildAbsoluteUrl("/united-rubber-cork-logo.png", siteUrl),
      },
    },
    keywords: blog.tags,
    articleSection: "Industrial Cork & Sealing Engineering",
    inLanguage: "en-IN",
    about: {
      "@type": "Thing",
      name: "Rubberised Cork and Industrial Gaskets",
    },
  };
}
