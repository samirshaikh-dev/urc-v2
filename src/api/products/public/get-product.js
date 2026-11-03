import {
  getAllProductsPublic,
  getProductBySlugPublic,
  getProductsByCategoryPublic,
} from "@/services/products/public/get-product";

export async function fetchProductsByCategory(categorySlug) {
  return getProductsByCategoryPublic(categorySlug);
}

export async function fetchProductBySlug(slug, categorySlug) {
  return getProductBySlugPublic(slug, categorySlug);
}

export async function fetchAllProducts() {
  return getAllProductsPublic();
}

