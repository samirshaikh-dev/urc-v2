import { SITE_CONFIG } from "@/lib/constants";
import { COMPANY_INFO, HERITAGE_DATA } from "@/data/company";
import {
  ALL_KEYWORDS,
  VOICE_QUERIES,
  INDUSTRIES_SERVED,
  AREA_SERVED,
} from "./keywords";
import { CATEGORY_DETAILS, PRODUCTS } from "@/data/products";

const BASE_URL = SITE_CONFIG.url;

/**
 * Reusable Product / Category Offer nodes for OfferCatalog
 */
const CATEGORY_OFFERS = Object.values(CATEGORY_DETAILS).map((cat) => ({
  "@type": "Offer",
  url: `${BASE_URL}/products/${cat.slug}`,
  availability: "https://schema.org/InStock",
  itemOffered: {
    "@type": "Service",
    name: `${cat.name} Manufacturing & Fabrication`,
    description: cat.shortDescription,
    url: `${BASE_URL}/products/${cat.slug}`,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    areaServed: AREA_SERVED,
  },
}));

/**
 * Generate Root JSON-LD for LocalBusiness/ManufacturingBusiness, Organization, and WebSite
 * Establishes strong entity grounding in GIDC Vapi, Gujarat for Google Search & AI engines (AEO/GEO/AIO)
 */
export function getRootJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ManufacturingBusiness"],
      "@id": `${BASE_URL}/#manufacturer`,
      name: SITE_CONFIG.name,
      legalName: "United Rubber Cork",
      alternateName: ["URC", "United Rubber Cork Vapi"],
      url: BASE_URL,
      logo: `${BASE_URL}/united-rubber-cork-logo.png`,
      image: `${BASE_URL}/og-image.png`,
      description: SITE_CONFIG.description,
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      currenciesAccepted: "INR, USD",
      paymentAccepted: "Bank Transfer, NEFT, RTGS, Letter of Credit (LC)",
      priceRange: "₹₹ - ₹₹₹",
      foundingDate: "2013",
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.state,
        postalCode: COMPANY_INFO.address.pincode,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 20.3703,
        longitude: 72.9106,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:30",
        },
      ],
      areaServed: AREA_SERVED.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
      knowsAbout: [
        ...INDUSTRIES_SERVED,
        "IS: 4253 Standards",
        "ASTM F104 Gaskets",
        "Rubberised Cork Sheets",
        "Transformer Gaskets & Strips",
        "Agglomerated Natural Cork",
        "Hot Transformer Mineral Oil Resistance",
        "Foundation Vibration Damping Pads",
        "CNC Gasket Dovetail Fabrication",
      ],
      keywords: ALL_KEYWORDS.join(", "),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Industrial Cork & Rubberised Cork Product Families",
        itemListElement: CATEGORY_OFFERS,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_CONFIG.name,
      url: BASE_URL,
      logo: `${BASE_URL}/united-rubber-cork-logo.png`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: COMPANY_INFO.phone,
          contactType: "sales & technical support",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.state,
        postalCode: COMPANY_INFO.address.pincode,
        addressCountry: "IN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: SITE_CONFIG.name,
      url: BASE_URL,
      description: SITE_CONFIG.description,
      inLanguage: "en-IN",
      keywords: ALL_KEYWORDS.join(", "),
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".speakable"],
      },
    },
  ];
}

/**
 * Generate Product structured data (JSON-LD) for Level 3 product detail pages
 */
export function getProductJsonLd(product) {
  if (!product) return null;

  const productUrl = `${BASE_URL}/products/${product.category}/${product.slug}`;
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BASE_URL}${product.image}`
    : `${BASE_URL}/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description:
      product.shortDescription ||
      product.fullDescription?.replace(/<[^>]*>/g, " ").slice(0, 200) ||
      `${product.name} manufactured by United Rubber Cork in GIDC Vapi, Gujarat.`,
    image: imageUrl,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "INR",
      price: "0",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "0",
        priceCurrency: "INR",
        unitText: "Custom Quote / Wholesale B2B Batch",
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
    },
  };
}

/**
 * Generate CollectionPage + ItemList for Product Listing & Category Pages
 */
export function getCollectionPageJsonLd({ name, description, path, items = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${BASE_URL}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: BASE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
      })),
    },
  };
}

/**
 * BreadcrumbList structured data for hierarchical navigation & Google SERP breadcrumbs
 */
export function getBreadcrumbJsonLd(breadcrumbs = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith("http") ? crumb.url : `${BASE_URL}${crumb.url}`,
    })),
  };
}

/**
 * FAQPage structured data for Google rich snippets and AEO extraction
 */
export function getFaqPageJsonLd(faqs = []) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question || faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer || faq.a,
      },
    })),
  };
}

/**
 * AboutPage structured data for /about
 */
export function getAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE_CONFIG.name}`,
    url: `${BASE_URL}/about`,
    description: HERITAGE_DATA.statement,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      foundingDate: "2013",
      description: HERITAGE_DATA.statement,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.state,
        postalCode: COMPANY_INFO.address.pincode,
        addressCountry: "IN",
      },
      knowsAbout: HERITAGE_DATA.coreGrades,
    },
  };
}

/**
 * ContactPage structured data for /contact
 */
export function getContactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_CONFIG.name} — Technical Sales & Quotations`,
    url: `${BASE_URL}/contact`,
    description:
      "Get in touch with United Rubber Cork in GIDC Vapi, Gujarat for technical guidance, material specifications, and wholesale B2B quotations.",
    mainEntity: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.name,
      telephone: COMPANY_INFO.phone,
      email: COMPANY_INFO.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.state,
        postalCode: COMPANY_INFO.address.pincode,
        addressCountry: "IN",
      },
    },
  };
}

