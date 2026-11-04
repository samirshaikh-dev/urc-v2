import { SITE_CONFIG } from "./constants";
import { ALL_KEYWORDS } from "./seo/keywords";

export * from "./seo/keywords";
export * from "./seo/structured-data";

/**
 * Standard Root Metadata for Next.js App Router (RootLayout)
 * Modeled after reference/seo/metadata.ts
 */
export const rootMetadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Leading manufacturer & supplier of rubberised cork sheets, transformer gaskets, clutch wads, foundation slabs, and acoustic cork materials based in GIDC Vapi, Gujarat. Conforming to IS: 4253 / ASTM F104.",
  keywords: ALL_KEYWORDS,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
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
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description:
      "Precision-engineered rubberised cork sheets, transformer gaskets, and industrial components manufactured in GIDC Vapi, Gujarat. Conforms to IS: 4253 and ASTM standards.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
      },
    ],
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description:
      "Precision-engineered rubberised cork sheets, transformer gaskets, and industrial components manufactured in GIDC Vapi, Gujarat.",
    images: ["/og-image.png"],
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
    canonical: SITE_CONFIG.url,
  },
};

/**
 * Generate standard page-level metadata
 */
export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  image = "/og-image.png",
  path = "",
  noIndex = false,
  keywords = ALL_KEYWORDS,
} = {}) {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

  const canonicalUrl = `${SITE_CONFIG.url}${path}`;

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: SITE_CONFIG.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Legacy Organization schema compatibility
 */
export function generateOrganizationSchema({ companyInfo } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
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
          availableLanguage: ["English", "Hindi", "Gujarati"],
        }
      : undefined,
  };
}
