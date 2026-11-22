import { eq } from "drizzle-orm";
import { blogs } from "@/db/schema";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { getBlogDb, mapBlog, resolveUniqueBlogSlug } from "../helpers";

export async function updateBlogService(id, payload) {
  const db = getBlogDb();

  const [existing] = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
  if (!existing) {
    throw new Error("Blog not found.");
  }

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
  if (imageFileUri === null || imageFileUri === "") {
    finalImageUrl = null;
  } else if (typeof imageFileUri === "string" && imageFileUri.startsWith("data:image/")) {
    const uploadResult = await uploadToCloudinary(imageFileUri, "urc-v2/blogs");
    if (uploadResult.success) {
      finalImageUrl = uploadResult.secureUrl;
    } else {
      console.warn("[blogs] Image upload failed:", uploadResult.error);
    }
  } else if (imageFileUri) {
    finalImageUrl = imageFileUri;
  }

  const values = {
    imageUrl: finalImageUrl,
    updatedAt: new Date(),
  };

  if (title) {
    values.title = title.trim();
    values.slug = await resolveUniqueBlogSlug(db, title, id);
  }
  if (excerpt !== undefined) {
    values.excerpt = excerpt?.trim() || "";
  }
  if (content) {
    values.content = content.trim();
  }
  if (tags !== undefined) {
    values.tags = tags?.trim() || "";
  }
  if (author) {
    values.author = author.trim();
  }
  if (readTime) {
    values.readTime = readTime.trim();
  }
  if (published !== undefined) {
    values.published = published;
  }

  const [row] = await db
    .update(blogs)
    .set(values)
    .where(eq(blogs.id, id))
    .returning();

  return mapBlog(row);
}

export async function toggleBlogPublishService(id) {
  const db = getBlogDb();

  const [existing] = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
  if (!existing) {
    throw new Error("Article not found.");
  }

  const [row] = await db
    .update(blogs)
    .set({ published: !existing.published, updatedAt: new Date() })
    .where(eq(blogs.id, id))
    .returning();

  return mapBlog(row);
}
