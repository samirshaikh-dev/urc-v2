import { INITIAL_BLOGS } from "@/data/blogs";

export let blogsStore = [...INITIAL_BLOGS];

export function setBlogsStore(newStore) {
  blogsStore = newStore;
}
