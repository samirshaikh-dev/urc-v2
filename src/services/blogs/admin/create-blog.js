import { randomUUID } from "node:crypto";
import { blogs } from "@/db/schema";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { getBlogDb, mapBlog, resolveUniqueBlogSlug } from "../helpers";

export async function createBlogService(payload) {
  const db = getBlogDb();

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

  let finalImageUrl = null;
  if (imageFileUri) {
    if (imageFileUri.startsWith("data:image/")) {
      const uploadResult = await uploadToCloudinary(imageFileUri, "urc-v2/blogs");
      if (uploadResult.success) {
        finalImageUrl = uploadResult.secureUrl;
      } else {
        console.warn("[blogs] Image upload failed:", uploadResult.error);
      }
    } else {
      finalImageUrl = imageFileUri;
    }
  }

  const slug = await resolveUniqueBlogSlug(db, title);
  const now = new Date();

  const [row] = await db
    .insert(blogs)
    .values({
      id: randomUUID(),
      slug,
      title: title.trim(),
      excerpt: excerpt?.trim() || "",
      content: content.trim(),
      tags: tags?.trim() || "",
      author: author?.trim() || "URC Engineering Team",
      readTime: readTime?.trim() || "4 min read",
      imageUrl: finalImageUrl,
      published: published !== false,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return mapBlog(row);
}
