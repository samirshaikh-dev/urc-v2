"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { updateProductService } from "@/services/products/admin/update-product";
import { validateUpdateProduct } from "@/validation/products";

export async function updateProductAction(productId, payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const validation = validateUpdateProduct(productId, payload);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  try {
    const result = await updateProductService(productId, validation.data);

    revalidatePath("/products");
    revalidatePath(`/products/${result.categorySlug}`);
    revalidatePath(`/products/${result.categorySlug}/${result.slug}`);
    revalidatePath("/admin/products");

    return {
      success: true,
      slug: result.slug,
      categorySlug: result.categorySlug,
      productName: result.productName,
    };
  } catch (error) {
    console.error("Failed to update product:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while updating the product.",
    };
  }
}
