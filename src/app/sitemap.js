import { SITE_CONFIG } from "@/lib/constants";
import { PRODUCTS, CATEGORY_DETAILS } from "@/data/products";

export default function sitemap() {
  const baseUrl = SITE_CONFIG.url;
  const currentDate = new Date().toISOString();

  // 1. Core static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Core product category pages
  const categoryPages = Object.values(CATEGORY_DETAILS).map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Level 3 product detail pages
  const productPages = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.category}/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}

