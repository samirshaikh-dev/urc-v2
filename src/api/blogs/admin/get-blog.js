"use server";

import { getAdminSession } from "@/lib/auth";
import {
  getAllBlogsAdmin,
  getBlogByIdAdmin,
} from "@/services/blogs/admin/get-blog";

export async function getAdminBlogsAction() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized.");
  }
  return getAllBlogsAdmin();
}

export async function getAdminBlogByIdAction(id) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized.");
  }
  return getBlogByIdAdmin(id);
}

