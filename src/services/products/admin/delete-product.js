import { eq } from "drizzle-orm";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { getDbClient } from "@/lib/db";
import { products } from "@/db/schema";

export async function deleteProductService(productId) {
  const db = getDbClient();
  if (!db) {
    throw new Error("Database is not configured. Product management is unavailable.");
  }

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product) {
    throw new Error("Product not found.");
  }

  if (product.imagePublicId) {
    await deleteFromCloudinary(product.imagePublicId);
  }

  await db.delete(products).where(eq(products.id, productId));

  return {
    success: true,
    deletedId: productId,
    categorySlug: product.categorySlug,
  };
}

