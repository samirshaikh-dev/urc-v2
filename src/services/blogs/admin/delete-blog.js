import { eq } from "drizzle-orm";
import { blogs } from "@/db/schema";
import { getBlogDb } from "../helpers";

export async function deleteBlogService(id) {
  const db = getBlogDb();
  const deleted = await db
    .delete(blogs)
    .where(eq(blogs.id, id))
    .returning({ id: blogs.id });

  return deleted.length > 0;
}
