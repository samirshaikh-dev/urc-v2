import { and, eq, ne } from "drizzle-orm";
import { blogs } from "@/db/schema";
import { getDbClient } from "@/lib/db";
import { slugify } from "@/lib/utils";

export const BLOG_DB_ERROR =
  "The article store is temporarily unavailable. Please try again in a few moments.";

/**
 * Returns the database client for admin writes, which cannot fall back to the
 * old in-memory store when the database is not configured.
 */
export function getBlogDb() {
  const db = getDbClient();
  if (!db) {
    throw new Error("Database is not configured. Article management is unavailable.");
  }
  return db;
}

/** Keeps the shape consumed by the public site and the admin editor unchanged. */
export function mapBlog(row) {
  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    previewText: row.previewText || "",
    content: row.content,
    tags: row.tags || "",
    author: row.author || "URC Engineering Team",
    readTime: row.readTime || "4 min read",
    imageUrl: row.imageUrl || null,
    published: row.published,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Slugs drive public URLs, so they must be unique. Reuse the base slug when
 * possible and add a numeric suffix when another article already owns it.
 */
export async function resolveUniqueBlogSlug(db, title, excludeId) {
  const baseSlug = slugify(title) || "article";
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const conditions = [eq(blogs.slug, candidate)];
    if (excludeId) {
      conditions.push(ne(blogs.id, excludeId));
    }

    const [conflict] = await db
      .select({ id: blogs.id })
      .from(blogs)
      .where(and(...conditions))
      .limit(1);

    if (!conflict) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix++}`;
  }
}
