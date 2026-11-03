"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { createProductService } from "@/services/products/admin/create-product";
import { validateCreateProduct } from "@/validation/products";

export async function createProductAction(payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const validation = validateCreateProduct(payload);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  try {
    const result = await createProductService(validation.data);

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
    console.error("Failed to create product:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while saving the product.",
    };
  }
}
