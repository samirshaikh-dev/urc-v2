"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSessionCookie,
  setAdminSessionCookie,
  signSessionToken,
  validateAdminCredentials,
} from "@/lib/auth";

export { createProductAction } from "@/api/products/admin/create-product";
export { updateProductAction } from "@/api/products/admin/update-product";
export { deleteProductAction } from "@/api/products/admin/delete-product";

export async function loginAdminAction(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  if (!validateAdminCredentials(email, password)) {
    return { error: "Invalid email or password. Please check your credentials." };
  }

  const token = await signSessionToken({ email, role: "admin" });
  await setAdminSessionCookie(token);
  redirect("/admin/products");
}

export async function logoutAdminAction() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
