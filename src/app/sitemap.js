import { CATEGORY_DETAILS } from "@/data/products";
import { getAllProducts } from "@/services/products/public/get-product";
import { getPublishedBlogsPublic } from "@/services/blogs/public/get-blog";
import {
  buildAbsoluteUrl,
  getSiteUrl,
  normalizeSeoPath,
} from "@/lib/seo/url";
import {
  getProductCanonicalPath,
  getProductImageUrl,
  getProductIndexability,
} from "@/lib/seo/product-seo";

const STATIC_PAGES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "weekly", priority: 0.9 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
];

function toLastModified(value) {
  if (!value) return undefined;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap() {
  const siteUrl = getSiteUrl();
  const entries = [];
  const seenPaths = new Set();

  function addEntry(entry, path) {
    const key = normalizeSeoPath(path).toLocaleLowerCase();

    // Legacy /product/[slug] paths and non-public areas must not be listed.
    if (key.startsWith("/product/") || key.startsWith("/admin/") || key.startsWith("/api/")) {
      return;
    }
    if (seenPaths.has(key)) return;

    seenPaths.add(key);
    entries.push(entry);
  }

  for (const page of STATIC_PAGES) {
    addEntry(
      {
        url: buildAbsoluteUrl(page.path, siteUrl),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      },
      page.path
    );
  }

  for (const category of Object.values(CATEGORY_DETAILS)) {
    if (!category?.slug) continue;
    const path = `/products/${category.slug}`;
    addEntry(
      {
        url: buildAbsoluteUrl(path, siteUrl),
        changeFrequency: "weekly",
        priority: 0.85,
      },
      path
    );
  }

  let products = [];
  try {
    products = (await getAllProducts()) || [];
  } catch {
    // A catalog outage must not remove the stable static/category entries.
    products = [];
  }

  for (const product of products) {
    const { visible, indexable } = getProductIndexability(product);
    if (!visible || !indexable) continue;

    const path = getProductCanonicalPath(product);
    const imageUrl = getProductImageUrl(product);
    const lastModified = toLastModified(product.updatedAt || product.createdAt);

    addEntry(
      {
        url: buildAbsoluteUrl(path, siteUrl),
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "monthly",
        priority: 0.75,
        // Next's sitemap API accepts image URLs only (no title/alt fields).
        ...(imageUrl ? { images: [imageUrl] } : {}),
      },
      path
    );
  }

  let blogs = [];
  try {
    blogs = (await getPublishedBlogsPublic()) || [];
  } catch {
    blogs = [];
  }

  for (const blog of blogs) {
    if (!blog?.slug) continue;
    const path = `/blog/${blog.slug}`;
    const lastModified = toLastModified(blog.updatedAt || blog.createdAt);
    const imageUrl = blog.imageUrl ? buildAbsoluteUrl(blog.imageUrl, siteUrl) : undefined;

    addEntry(
      {
        url: buildAbsoluteUrl(path, siteUrl),
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "monthly",
        priority: 0.75,
        ...(imageUrl ? { images: [imageUrl] } : {}),
      },
      path
    );
  }

  return entries;
}
