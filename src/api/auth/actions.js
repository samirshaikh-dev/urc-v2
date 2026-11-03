"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSessionCookie,
  setAdminSessionCookie,
  signSessionToken,
  validateAdminCredentials,
} from "@/lib/auth";
import { validateLogin } from "@/validation/auth";

export async function loginAdminAction(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  const validation = validateLogin({ email, password });
  if (!validation.success) {
    return { error: validation.error };
  }

  if (!validateAdminCredentials(validation.data.email, validation.data.password)) {
    return { error: "Invalid email or password. Please check your credentials." };
  }

  const token = await signSessionToken({ email: validation.data.email, role: "admin" });
  await setAdminSessionCookie(token);
  redirect("/admin/products");
}

export async function logoutAdminAction() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
