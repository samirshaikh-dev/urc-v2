import { blogsStore, setBlogsStore } from "../store.js";

export async function deleteBlogService(id) {
  const prevLen = blogsStore.length;
  setBlogsStore(blogsStore.filter((b) => b.id !== id));
  return blogsStore.length < prevLen;
}

