import { SITE_CONFIG } from "./constants";
import { ALL_KEYWORDS } from "./seo/keywords";
import {
  buildAbsoluteUrl,
  getSiteUrl,
  normalizeSeoPath,
  resolveSeoUrl,
  sanitizeSeoText,
} from "./seo/url";

export * from "./seo/keywords";
export * from "./seo/url";
export * from "./seo/jsonld";
export * from "./seo/structured-data";
export * from "./seo/product-seo";

const DEFAULT_DESCRIPTION = sanitizeSeoText(SITE_CONFIG.description);
const DEFAULT_TITLE = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

function titleIncludesBrand(title) {
  const normalized = sanitizeSeoText(title).toLocaleLowerCase();
  return normalized.includes(SITE_CONFIG.name.toLocaleLowerCase());
}

/**
 * Standard Root Metadata for Next.js App Router (RootLayout).
 * Uses only verified site-level facts from SITE_CONFIG.
 */
export const rootMetadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ALL_KEYWORDS,
  authors: [{ name: SITE_CONFIG.name, url: getSiteUrl() }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: getSiteUrl(),
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: resolveSeoUrl("/og-image.png"),
        alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
      },
    ],
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [resolveSeoUrl("/og-image.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: getSiteUrl(),
  },
};

/**
 * Generate page-level metadata with a single canonical URL and no duplicated
 * brand suffix. `title.absolute` bypasses the root title template on purpose.
 */
export function constructMetadata({
  title,
  description,
  image,
  imageAlt,
  path = "",
  noIndex = false,
  index,
  follow,
  keywords = ALL_KEYWORDS,
  openGraphTitle,
  openGraphDescription,
  openGraphImage,
  openGraphImageAlt,
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterImageAlt,
  twitterCard = "summary_large_image",
} = {}) {
  const siteUrl = getSiteUrl();
  const canonicalPath = normalizeSeoPath(path);
  const canonicalUrl = buildAbsoluteUrl(canonicalPath, siteUrl);

  const cleanTitle = sanitizeSeoText(title) || DEFAULT_TITLE;
  const finalTitle = titleIncludesBrand(cleanTitle)
    ? cleanTitle
    : `${cleanTitle} | ${SITE_CONFIG.name}`;

  const finalDescription =
    sanitizeSeoText(description) || DEFAULT_DESCRIPTION || "";

  const ogTitle = sanitizeSeoText(openGraphTitle) || finalTitle;
  const ogDescription =
    sanitizeSeoText(openGraphDescription) || finalDescription;
  const ogImage = resolveSeoUrl(openGraphImage || image || "/og-image.png");
  const ogImageAlt =
    sanitizeSeoText(openGraphImageAlt || imageAlt) || finalTitle;

  const twTitle = sanitizeSeoText(twitterTitle) || ogTitle;
  const twDescription =
    sanitizeSeoText(twitterDescription) || ogDescription;
  const twImage = resolveSeoUrl(twitterImage || openGraphImage || image || "/og-image.png");

  const shouldIndex = noIndex ? false : typeof index === "boolean" ? index : true;
  const shouldFollow = noIndex ? false : typeof follow === "boolean" ? follow : true;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          alt: ogImageAlt,
        },
      ],
      locale: SITE_CONFIG.locale,
      type: "website",
    },
    twitter: {
      card: twitterCard,
      title: twTitle,
      description: twDescription,
      images: [
        {
          url: twImage,
          ...(sanitizeSeoText(twitterImageAlt || openGraphImageAlt || imageAlt)
            ? { alt: sanitizeSeoText(twitterImageAlt || openGraphImageAlt || imageAlt) }
            : {}),
        },
      ],
    },
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Legacy Organization schema compatibility.
 */
export function generateOrganizationSchema({ companyInfo } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: getSiteUrl(),
    description: DEFAULT_DESCRIPTION,
    address: companyInfo?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: companyInfo.address.street,
          addressLocality: companyInfo.address.city,
          addressRegion: companyInfo.address.state,
          postalCode: companyInfo.address.pincode,
          addressCountry: "IN",
        }
      : undefined,
    contactPoint: companyInfo?.phone
      ? {
          "@type": "ContactPoint",
          telephone: companyInfo.phone,
          contactType: "sales",
        }
      : undefined,
  };
}
