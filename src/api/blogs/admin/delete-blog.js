"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { deleteBlogService } from "@/services/blogs/admin/delete-blog";

export async function deleteBlogAction(id) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  if (!id) {
    return { success: false, error: "Article ID is required." };
  }

  try {
    const success = await deleteBlogService(id);
    if (!success) {
      return { success: false, error: "Article not found or could not be removed." };
    }
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (err) {
    console.error("deleteBlogAction error:", err);
    return { success: false, error: err.message || "Failed to delete article." };
  }
}

