"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { deleteProductService } from "@/services/products/admin/delete-product";

export async function deleteProductAction(productId) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  if (!productId) {
    return { success: false, error: "Product ID is required." };
  }

  try {
    const result = await deleteProductService(productId);

    revalidatePath("/products");
    if (result.categorySlug) {
      revalidatePath(`/products/${result.categorySlug}`);
    }
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: error.message || "Failed to delete product." };
  }
}

