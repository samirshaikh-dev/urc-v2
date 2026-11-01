import { SITE_CONFIG } from "./constants";

/**
 * Generate standard page metadata
 */
export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  image = "/og-image.jpg",
  path = "",
  noIndex = false,
} = {}) {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;

  const canonicalUrl = `${SITE_CONFIG.url}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
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
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}

/**
 * Generates Organization structured data (JSON-LD)
 */
export function generateOrganizationSchema({ companyInfo }) {
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
          availableLanguage: ["English", "Hindi"],
        }
      : undefined,
  };
}

