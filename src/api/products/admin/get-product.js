import { getAdminSession } from "@/lib/auth";
import {
  getAllProductsAdmin,
  getProductByIdAdmin,
} from "@/services/products/admin/get-product";

export async function getAdminProductsList() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized.");
  }
  return getAllProductsAdmin();
}

export async function getAdminProductById(id) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized.");
  }
  return getProductByIdAdmin(id);
}

