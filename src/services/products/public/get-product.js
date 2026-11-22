import { and, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { products } from "@/db/schema";
import {
  getDatabase,
  getProductSeoValues,
  handleDatabaseFailure,
  loadRelatedRows,
  markDatabaseAvailable,
} from "../helpers";

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value, max = 160) {
  const text = stripHtml(value);
  if (!text) return "";
  if (text.length <= max) return text;

  const cut = text.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${text.slice(0, lastSpace > max * 0.75 ? lastSpace : max).trimEnd()}…`;
}

function mapPublicProduct(product) {
  const shortDescription = truncate(
    product.seoDescription || product.introduction || product.description,
    160
  );

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.categorySlug,
    image: product.imageUrl,
    imagePublicId: product.imagePublicId,
    badge: product.badge || "",
    shortDescription,
    fullDescription: product.description,
    introduction: product.introduction || shortDescription,
    overview: stripHtml(product.description),
    features: product.features || [],
    applications: product.applications || [],
    benefits: product.benefits || [],
    specifications: product.specifications || [],
    faqs: product.faqs || [],
    howToSpecify: "Contact us with your technical drawing or dimensional requirements for tailored fabrication.",
    ...getProductSeoValues(product),
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

async function fetchCategoryProducts(categorySlug) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `category-${categorySlug}`);

  const db = getDatabase();
  if (!db) return [];

  try {
    const rows = await db
      .select()
      .from(products)
      .where(and(eq(products.categorySlug, categorySlug), eq(products.visibility, "public")))
      .orderBy(desc(products.createdAt));
    await loadRelatedRows(db, rows, { faqs: true, specifications: true });
    markDatabaseAvailable();

    return rows.map(mapPublicProduct);
  } catch (error) {
    handleDatabaseFailure(error);
    return [];
  }
}

async function fetchProductBySlug(slug, categorySlug) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-${slug}`);

  const db = getDatabase();
  if (!db) {
    return { product: null, unavailable: true };
  }

  try {
    const conditions = [eq(products.slug, slug)];
    if (categorySlug) {
      conditions.push(eq(products.categorySlug, categorySlug));
    }

    const rows = await db
      .select()
      .from(products)
      .where(and(...conditions))
      .limit(1);
    await loadRelatedRows(db, rows, { faqs: true, specifications: true });
    markDatabaseAvailable();

    const product = rows[0];
    return { product: product ? mapPublicProduct(product) : null, unavailable: false };
  } catch (error) {
    handleDatabaseFailure(error);
    return { product: null, unavailable: true };
  }
}

async function fetchAllProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const db = getDatabase();
  if (!db) return [];

  try {
    const rows = await db.select().from(products).orderBy(desc(products.createdAt));
    await loadRelatedRows(db, rows, { faqs: true, specifications: true });
    markDatabaseAvailable();

    return rows.map(mapPublicProduct);
  } catch (error) {
    handleDatabaseFailure(error);
    return [];
  }
}

export async function getProductsByCategoryPublic(categorySlug) {
  return fetchCategoryProducts(categorySlug);
}

/**
 * Status-aware variant for pages that need to distinguish a missing product
 * from a catalog outage. Cached functions return fallback values instead of
 * throwing so a temporary database failure cannot break static generation.
 */
export async function getProductBySlugWithStatus(slug, categorySlug) {
  return fetchProductBySlug(slug, categorySlug);
}

export async function getProductBySlugPublic(slug, categorySlug) {
  const { product } = await fetchProductBySlug(slug, categorySlug);
  return product;
}

export async function getAllProductsPublic() {
  return fetchAllProducts();
}

export {
  getProductsByCategoryPublic as getProductsByCategory,
  getProductBySlugPublic as getProductBySlug,
  getAllProductsPublic as getAllProducts,
};
