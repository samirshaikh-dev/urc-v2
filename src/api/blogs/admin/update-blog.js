"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import {
  toggleBlogPublishService,
  updateBlogService,
} from "@/services/blogs/admin/update-blog";
import { validateUpdateBlog } from "@/validation/blogs";

export async function updateBlogAction(id, payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const validation = validateUpdateBlog(id, payload);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  try {
    const updated = await updateBlogService(id, validation.data);
    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${id}/edit`);
    return { success: true, blog: updated };
  } catch (err) {
    console.error("updateBlogAction error:", err);
    return { success: false, error: err.message || "Failed to update article." };
  }
}

export async function toggleBlogPublishAction(id) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  if (!id) {
    return { success: false, error: "Article ID is required." };
  }

  try {
    const updated = await toggleBlogPublishService(id);
    revalidatePath("/admin/blogs");
    return { success: true, published: updated.published };
  } catch (err) {
    return { success: false, error: err.message || "Failed to toggle publish state." };
  }
}

