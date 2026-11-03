import { blogsStore } from "../store.js";

export async function getPublishedBlogsPublic() {
  return blogsStore
    .filter((b) => b.published)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getBlogBySlugPublic(slug) {
  return blogsStore.find((b) => b.slug === slug && b.published) || null;
}

export {
  getPublishedBlogsPublic as getPublishedBlogs,
  getBlogBySlugPublic as getBlogBySlug,
};

