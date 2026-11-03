import { uploadToCloudinary } from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";
import { blogsStore } from "../store.js";

export async function updateBlogService(id, payload) {
  const index = blogsStore.findIndex((b) => b.id === id);
  if (index === -1) {
    throw new Error("Blog not found.");
  }

  const existing = blogsStore[index];
  const {
    title,
    excerpt,
    content,
    tags,
    author,
    readTime,
    imageFileUri,
    published,
  } = payload;

  let finalImageUrl = existing.imageUrl;
  if (imageFileUri && imageFileUri.startsWith("data:image/")) {
    const uploadResult = await uploadToCloudinary(imageFileUri, "urc-v2/blogs");
    if (uploadResult.success) {
      finalImageUrl = uploadResult.secureUrl;
    }
  }

  blogsStore[index] = {
    ...existing,
    ...(title ? { title: title.trim(), slug: slugify(title) } : {}),
    ...(excerpt !== undefined ? { excerpt: excerpt.trim() } : {}),
    ...(content ? { content: content.trim() } : {}),
    ...(tags !== undefined ? { tags: tags.trim() } : {}),
    ...(author ? { author: author.trim() } : {}),
    ...(readTime ? { readTime: readTime.trim() } : {}),
    ...(finalImageUrl ? { imageUrl: finalImageUrl } : {}),
    ...(published !== undefined ? { published } : {}),
    updatedAt: new Date(),
  };

  return blogsStore[index];
}

export async function toggleBlogPublishService(id) {
  const index = blogsStore.findIndex((b) => b.id === id);
  if (index === -1) {
    throw new Error("Article not found.");
  }

  blogsStore[index] = {
    ...blogsStore[index],
    published: !blogsStore[index].published,
    updatedAt: new Date(),
  };

  return blogsStore[index];
}

