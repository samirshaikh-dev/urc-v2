"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import {
  createBlogRecord,
  updateBlogRecord,
  deleteBlogRecord,
  getBlogById,
} from "@/lib/blogs-db";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function createBlogAction(payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const { title, excerpt, content, tags, author, readTime, imageFileUri, published } = payload;

  if (!title || !title.trim()) {
    return { success: false, error: "Article title is required." };
  }

  if (!content || !content.trim()) {
    return { success: false, error: "Article content is required." };
  }

  let finalImageUrl = "/images/placeholder-product.jpg";
  if (imageFileUri) {
    if (imageFileUri.startsWith("data:image/")) {
      const uploadResult = await uploadToCloudinary(imageFileUri, "urc-v2/blogs");
      if (uploadResult.success) {
        finalImageUrl = uploadResult.secureUrl;
      }
    } else {
      finalImageUrl = imageFileUri;
    }
  }

  try {
    const blog = await createBlogRecord({
      title: title.trim(),
      excerpt: excerpt?.trim() || "",
      content: content.trim(),
      tags: tags?.trim() || "",
      author: author?.trim() || "URC Engineering Team",
      readTime: readTime?.trim() || "4 min read",
      imageUrl: finalImageUrl,
      published: published !== false,
    });

    revalidatePath("/admin/blogs");
    return { success: true, blog };
  } catch (err) {
    console.error("createBlogAction error:", err);
    return { success: false, error: err.message || "Failed to create article." };
  }
}

export async function updateBlogAction(id, payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const existing = await getBlogById(id);
  if (!existing) {
    return { success: false, error: "Blog not found." };
  }

  const { title, excerpt, content, tags, author, readTime, imageFileUri, published } = payload;

  let finalImageUrl = existing.imageUrl;
  if (imageFileUri && imageFileUri.startsWith("data:image/")) {
    const uploadResult = await uploadToCloudinary(imageFileUri, "urc-v2/blogs");
    if (uploadResult.success) {
      finalImageUrl = uploadResult.secureUrl;
    }
  }

  try {
    const updated = await updateBlogRecord(id, {
      ...(title ? { title: title.trim() } : {}),
      ...(excerpt !== undefined ? { excerpt: excerpt.trim() } : {}),
      ...(content ? { content: content.trim() } : {}),
      ...(tags !== undefined ? { tags: tags.trim() } : {}),
      ...(author ? { author: author.trim() } : {}),
      ...(readTime ? { readTime: readTime.trim() } : {}),
      ...(finalImageUrl ? { imageUrl: finalImageUrl } : {}),
      ...(published !== undefined ? { published } : {}),
    });

    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${id}/edit`);
    return { success: true, blog: updated };
  } catch (err) {
    console.error("updateBlogAction error:", err);
    return { success: false, error: err.message || "Failed to update article." };
  }
}

export async function deleteBlogAction(id) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  try {
    const success = await deleteBlogRecord(id);
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

export async function toggleBlogPublishAction(id) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const blog = await getBlogById(id);
  if (!blog) return { success: false, error: "Article not found." };

  const updated = await updateBlogRecord(id, { published: !blog.published });
  revalidatePath("/admin/blogs");
  return { success: true, published: updated.published };
}
