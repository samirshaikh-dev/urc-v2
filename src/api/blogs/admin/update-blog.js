"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { getBlogByIdAdmin } from "@/services/blogs/admin/get-blog";
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
    const existing = await getBlogByIdAdmin(id);
    const updated = await updateBlogService(id, validation.data);

    updateTag("blogs");
    if (updated?.slug) {
      updateTag(`blog-${updated.slug}`);
    }
    if (existing?.slug && existing.slug !== updated?.slug) {
      updateTag(`blog-${existing.slug}`);
      revalidatePath(`/blog/${existing.slug}`);
    }

    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${id}/edit`);
    revalidatePath("/blog");
    if (updated?.slug) {
      revalidatePath(`/blog/${updated.slug}`);
    }
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
    updateTag("blogs");
    if (updated?.slug) {
      updateTag(`blog-${updated.slug}`);
      revalidatePath(`/blog/${updated.slug}`);
    }
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    return { success: true, published: updated.published };
  } catch (err) {
    return { success: false, error: err.message || "Failed to toggle publish state." };
  }
}

