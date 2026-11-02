import prisma from "@/lib/prisma";
import { PRODUCTS, CATEGORY_DETAILS } from "@/data/products";

export { slugify } from "@/lib/utils";

/**
 * Fetch all products for a specific category slug.
 * Reads from Supabase via Prisma, falling back to static data if database is unconfigured.
 */
export async function getProductsByCategory(categorySlug) {
  try {
    if (process.env.DATABASE_URL) {
      const dbProducts = await prisma.product.findMany({
        where: { categorySlug },
        include: {
          faqs: {
            orderBy: { sortOrder: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });

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
    console.warn("Database fetch fallback to static data:", error.message);
  }

  // Fallback to static data
  return PRODUCTS.filter((p) => p.category === categorySlug);
}

/**
 * Fetch a single product by slug and category.
 */
export async function getProductBySlug(slug, categorySlug) {
  try {
    if (process.env.DATABASE_URL) {
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
    console.warn("Database fetch single product fallback:", error.message);
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
  try {
    if (process.env.DATABASE_URL) {
      const dbProducts = await prisma.product.findMany({
        include: {
          faqs: {
            orderBy: { sortOrder: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });

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
    console.warn("Database getAllProducts fallback:", error.message);
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
  try {
    if (process.env.DATABASE_URL) {
      const dbProduct = await prisma.product.findUnique({
        where: { id },
        include: {
          faqs: { orderBy: { sortOrder: "asc" } },
          specifications: { orderBy: { sortOrder: "asc" } },
        },
      });

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
    console.warn("Database getProductById fallback:", error.message);
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
