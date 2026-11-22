import { desc, eq } from "drizzle-orm";
import { blogs } from "@/db/schema";
import { getBlogDb, mapBlog } from "../helpers";

export async function getAllBlogsAdmin() {
  const db = getBlogDb();
  const rows = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
  return rows.map(mapBlog);
}

export async function getBlogByIdAdmin(id) {
  const db = getBlogDb();
  const [row] = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
  return mapBlog(row);
}

export {
  getAllBlogsAdmin as getAllBlogs,
  getBlogByIdAdmin as getBlogById,
};
