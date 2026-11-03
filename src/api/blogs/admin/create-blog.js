"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { createBlogService } from "@/services/blogs/admin/create-blog";
import { validateCreateBlog } from "@/validation/blogs";

export async function createBlogAction(payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const validation = validateCreateBlog(payload);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }

  try {
    const blog = await createBlogService(validation.data);
    revalidatePath("/admin/blogs");
    return { success: true, blog };
  } catch (err) {
    console.error("createBlogAction error:", err);
    return { success: false, error: err.message || "Failed to create article." };
  }
}

