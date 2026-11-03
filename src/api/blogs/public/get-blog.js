import {
  getBlogBySlugPublic,
  getPublishedBlogsPublic,
} from "@/services/blogs/public/get-blog";

export async function fetchPublishedBlogs() {
  return getPublishedBlogsPublic();
}

export async function fetchBlogBySlug(slug) {
  return getBlogBySlugPublic(slug);
}

