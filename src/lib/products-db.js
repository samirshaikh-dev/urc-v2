import { getPrismaClient } from "@/lib/prisma";
import { PRODUCTS, CATEGORY_DETAILS } from "@/data/products";
import { cacheLife, cacheTag } from "next/cache";

export { slugify } from "@/lib/utils";

/**
 * Database connectivity is optional.
 *
 * When Supabase is unreachable or the products table is missing, every reader
 * below falls back to the static catalogue in `@/data/products`.
 *
 * A short per-process circuit breaker prevents the same failure from being
 * retried (and logged) for every page generated during a production build.
 */
const DB_RETRY_COOLDOWN_MS = 60_000;
let databaseUnavailableUntil = 0;
let databaseFailureReported = false;

function getDatabase() {
  if (Date.now() < databaseUnavailableUntil) {
    return null;
  }

  return getPrismaClient();
}

function markDatabaseAvailable() {
  databaseUnavailableUntil = 0;
  databaseFailureReported = false;
}

function handleDatabaseFailure(error) {
  databaseUnavailableUntil = Date.now() + DB_RETRY_COOLDOWN_MS;

  if (databaseFailureReported) {
    return;
  }

  databaseFailureReported = true;
  const firstLine = String(error?.message || error)
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean);

  console.warn(
    `[products] Database unavailable; using static product data.${
      firstLine ? ` (${firstLine})` : ""
    }`
  );
}

/**
 * Fetch all products for a specific category slug.
 * Reads from Supabase via Prisma, falling back to static data if database is
 * unconfigured, unreachable, or has no rows for the category.
 */
export async function getProductsByCategory(categorySlug) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `category-${categorySlug}`);

  try {
    const prisma = getDatabase();

    if (prisma) {
      const dbProducts = await prisma.product.findMany({
        where: { categorySlug },
        include: {
          faqs: {
            orderBy: { sortOrder: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      markDatabaseAvailable();

      if (dbProducts.length > 0) {
        return dbProducts.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          category: p.categorySlug,
          image: p.imageUrl,
          imagePublicId: p.imagePublicId,
          badge: p.badge || "",
          shortDescription: p.description.replace(/<[^>]*>/g, "").slice(0, 160) + "...",
          fullDescription: p.description,
          faqs: p.faqs || [],
        }));
      }
    }
  } catch (error) {
    handleDatabaseFailure(error);
  }

  // Fallback to static data
  return PRODUCTS.filter((p) => p.category === categorySlug);
}

/**
 * Fetch a single product by slug and category.
 */
export async function getProductBySlug(slug, categorySlug) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-${slug}`);

  try {
    const prisma = getDatabase();

    if (prisma) {
      const dbProduct = await prisma.product.findFirst({
        where: {
          slug,
          ...(categorySlug ? { categorySlug } : {}),
        },
        include: {
          faqs: {
            orderBy: { sortOrder: "asc" },
          },
          specifications: {
            orderBy: { sortOrder: "asc" },
          },
        },
      });

      markDatabaseAvailable();

      if (dbProduct) {
        return {
          id: dbProduct.id,
          slug: dbProduct.slug,
          name: dbProduct.name,
          category: dbProduct.categorySlug,
          image: dbProduct.imageUrl,
          imagePublicId: dbProduct.imagePublicId,
          badge: dbProduct.badge || "",
          shortDescription: dbProduct.description.replace(/<[^>]*>/g, "").slice(0, 160) + "...",
          fullDescription: dbProduct.description,
          faqs: dbProduct.faqs || [],
          specifications: dbProduct.specifications || [],
          features: [],
          applications: [],
          howToSpecify: "Contact us with your technical drawing or dimensional requirements for tailored fabrication.",
        };
      }
    }
  } catch (error) {
    handleDatabaseFailure(error);
  }

  // Fallback to static data
  return PRODUCTS.find(
    (p) => p.slug === slug && (!categorySlug || p.category === categorySlug)
  ) || null;
}

/**
 * Fetch all products grouped or flat for admin/sitemaps.
 */
export async function getAllProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  try {
    const prisma = getDatabase();

    if (prisma) {
      const dbProducts = await prisma.product.findMany({
        include: {
          faqs: {
            orderBy: { sortOrder: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      markDatabaseAvailable();

      if (dbProducts.length > 0) {
        return dbProducts.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          category: p.categorySlug,
          image: p.imageUrl,
          imagePublicId: p.imagePublicId,
          badge: p.badge || "",
          description: p.description,
          faqs: p.faqs || [],
          createdAt: p.createdAt,
        }));
      }
    }
  } catch (error) {
    handleDatabaseFailure(error);
  }

  return PRODUCTS.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    image: p.image,
    badge: p.badge || "",
    description: p.fullDescription || p.shortDescription,
    faqs: [],
    createdAt: new Date(),
  }));
}

/**
 * Fetch a single product by its database ID (or static fallback).
 */
export async function getProductById(id) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-id-${id}`);

  try {
    const prisma = getDatabase();

    if (prisma) {
      const dbProduct = await prisma.product.findUnique({
        where: { id },
        include: {
          faqs: { orderBy: { sortOrder: "asc" } },
          specifications: { orderBy: { sortOrder: "asc" } },
        },
      });

      markDatabaseAvailable();

      if (dbProduct) {
        return {
          id: dbProduct.id,
          slug: dbProduct.slug,
          name: dbProduct.name,
          categorySlug: dbProduct.categorySlug,
          imageUrl: dbProduct.imageUrl,
          imagePublicId: dbProduct.imagePublicId,
          badge: dbProduct.badge || "",
          description: dbProduct.description,
          faqs: dbProduct.faqs || [],
          specifications: dbProduct.specifications || [],
        };
      }
    }
  } catch (error) {
    handleDatabaseFailure(error);
  }

  const staticProduct = PRODUCTS.find((p) => p.id === id);
  if (staticProduct) {
    return {
      id: staticProduct.id,
      slug: staticProduct.slug,
      name: staticProduct.name,
      categorySlug: staticProduct.category,
      imageUrl: staticProduct.image,
      imagePublicId: null,
      badge: staticProduct.badge || "",
      description: staticProduct.fullDescription || staticProduct.shortDescription,
      faqs: [],
      specifications: (staticProduct.specifications || []).map((s, idx) => ({
        property: s.property,
        value: s.value,
        sortOrder: idx,
      })),
    };
  }

  return null;
}
