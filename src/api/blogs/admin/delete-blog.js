"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { deleteBlogService } from "@/services/blogs/admin/delete-blog";
import { getBlogByIdAdmin } from "@/services/blogs/admin/get-blog";

export async function deleteBlogAction(id) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  if (!id) {
    return { success: false, error: "Article ID is required." };
  }

  try {
    const existing = await getBlogByIdAdmin(id);
    const success = await deleteBlogService(id);
    if (!success) {
      return { success: false, error: "Article not found or could not be removed." };
    }

    updateTag("blogs");
    if (existing?.slug) {
      updateTag(`blog-${existing.slug}`);
      revalidatePath(`/blog/${existing.slug}`);
    }

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true };
  } catch (err) {
    console.error("deleteBlogAction error:", err);
    return { success: false, error: err.message || "Failed to delete article." };
  }
}

