import { and, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { products } from "@/db/schema";
import {
  USER_FRIENDLY_DB_ERROR,
  getDatabase,
  handleDatabaseFailure,
  loadRelatedRows,
  markDatabaseAvailable,
} from "../helpers";

export async function getProductsByCategoryPublic(categorySlug) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `category-${categorySlug}`);

  const db = getDatabase();
  if (!db) {
    throw new Error(USER_FRIENDLY_DB_ERROR);
  }

  try {
    const rows = await db
      .select()
      .from(products)
      .where(eq(products.categorySlug, categorySlug))
      .orderBy(desc(products.createdAt));
    await loadRelatedRows(db, rows, { faqs: true });
    markDatabaseAvailable();

    return rows.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.categorySlug,
      image: product.imageUrl,
      imagePublicId: product.imagePublicId,
      badge: product.badge || "",
      shortDescription:
        (product.description || "").replace(/<[^>]*>/g, "").slice(0, 160) + "...",
      fullDescription: product.description,
      faqs: product.faqs || [],
    }));
  } catch (error) {
    handleDatabaseFailure(error);
    throw new Error(USER_FRIENDLY_DB_ERROR);
  }
}

export async function getProductBySlugPublic(slug, categorySlug) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-${slug}`);

  const db = getDatabase();
  if (!db) {
    throw new Error(USER_FRIENDLY_DB_ERROR);
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
    if (!product) {
      return null;
    }

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.categorySlug,
      image: product.imageUrl,
      imagePublicId: product.imagePublicId,
      badge: product.badge || "",
      shortDescription:
        (product.description || "").replace(/<[^>]*>/g, "").slice(0, 160) + "...",
      fullDescription: product.description,
      faqs: product.faqs || [],
      specifications: product.specifications || [],
      features: [],
      applications: [],
      howToSpecify:
        "Contact us with your technical drawing or dimensional requirements for tailored fabrication.",
    };
  } catch (error) {
    handleDatabaseFailure(error);
    throw new Error(USER_FRIENDLY_DB_ERROR);
  }
}

export async function getAllProductsPublic() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const db = getDatabase();
  if (!db) {
    throw new Error(USER_FRIENDLY_DB_ERROR);
  }

  try {
    const rows = await db.select().from(products).orderBy(desc(products.createdAt));
    await loadRelatedRows(db, rows, { faqs: true });
    markDatabaseAvailable();

    return rows.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.categorySlug,
      image: product.imageUrl,
      imagePublicId: product.imagePublicId,
      badge: product.badge || "",
      description: product.description,
      faqs: product.faqs || [],
      createdAt: product.createdAt,
    }));
  } catch (error) {
    handleDatabaseFailure(error);
    throw new Error(USER_FRIENDLY_DB_ERROR);
  }
}

export {
  getProductsByCategoryPublic as getProductsByCategory,
  getProductBySlugPublic as getProductBySlug,
  getAllProductsPublic as getAllProducts,
};
