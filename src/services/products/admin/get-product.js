import { desc, eq } from "drizzle-orm";
import { products } from "@/db/schema";
import {
  ADMIN_FRIENDLY_DB_ERROR,
  getDatabase,
  handleDatabaseFailure,
  loadRelatedRows,
  markDatabaseAvailable,
} from "../helpers";

export async function getAllProductsAdmin() {
  const db = getDatabase();
  if (!db) {
    throw new Error(ADMIN_FRIENDLY_DB_ERROR);
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
    throw new Error(ADMIN_FRIENDLY_DB_ERROR);
  }
}

export async function getProductByIdAdmin(id) {
  const db = getDatabase();
  if (!db) {
    throw new Error(ADMIN_FRIENDLY_DB_ERROR);
  }

  try {
    const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
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
      categorySlug: product.categorySlug,
      imageUrl: product.imageUrl,
      imagePublicId: product.imagePublicId,
      badge: product.badge || "",
      description: product.description,
      faqs: product.faqs || [],
      specifications: product.specifications || [],
    };
  } catch (error) {
    handleDatabaseFailure(error);
    throw new Error(ADMIN_FRIENDLY_DB_ERROR);
  }
}

export {
  getAllProductsAdmin as getAllProducts,
  getProductByIdAdmin as getProductById,
};
