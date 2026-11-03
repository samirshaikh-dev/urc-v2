import { blogsStore } from "../store.js";

export async function getAllBlogsAdmin() {
  return [...blogsStore].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getBlogByIdAdmin(id) {
  return blogsStore.find((b) => b.id === id) || null;
}

export {
  getAllBlogsAdmin as getAllBlogs,
  getBlogByIdAdmin as getBlogById,
};

