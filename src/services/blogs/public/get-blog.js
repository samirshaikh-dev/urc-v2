import { and, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { blogs } from "@/db/schema";
import { getDbClient } from "@/lib/db";
import { mapBlog } from "../helpers";

async function fetchPublishedBlogsFromDb() {
  "use cache";
  cacheLife("hours");
  cacheTag("blogs", "blogs-published");

  const db = getDbClient();
  if (!db) return [];

  try {
    const rows = await db
      .select()
      .from(blogs)
      .where(eq(blogs.published, true))
      .orderBy(desc(blogs.createdAt));
    return rows.map(mapBlog);
  } catch (error) {
    console.warn("[blogs] Published articles could not be loaded.", error);
    return [];
  }
}

async function fetchPublishedBlogBySlugFromDb(slug) {
  "use cache";
  cacheLife("hours");
  cacheTag("blogs", `blog-${slug}`);

  const db = getDbClient();
  if (!db) return null;

  try {
    const [row] = await db
      .select()
      .from(blogs)
      .where(and(eq(blogs.slug, slug), eq(blogs.published, true)))
      .limit(1);
    return mapBlog(row);
  } catch (error) {
    console.warn("[blogs] Article could not be loaded.", error);
    return null;
  }
}

export async function getPublishedBlogsPublic() {
  return fetchPublishedBlogsFromDb();
}

export async function getBlogBySlugPublic(slug) {
  return fetchPublishedBlogBySlugFromDb(slug);
}

export {
  getPublishedBlogsPublic as getPublishedBlogs,
  getBlogBySlugPublic as getBlogBySlug,
};
