"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  validateAdminCredentials,
  signSessionToken,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  getAdminSession,
} from "@/lib/auth";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { slugify } from "@/lib/products-db";

/**
 * Handle Admin Login
 */
export async function loginAdminAction(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  const isValid = validateAdminCredentials(email, password);
  if (!isValid) {
    return { error: "Invalid email or password. Please check your credentials." };
  }

  const token = await signSessionToken({ email, role: "admin" });
  await setAdminSessionCookie(token);

  redirect("/admin/products");
}

/**
 * Handle Admin Logout
 */
export async function logoutAdminAction() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}

/**
 * Create a new product and publish immediately
 */
export async function createProductAction(payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const { name, description, categorySlug, imageFileUri, faqs = [] } = payload;

  if (!name || !name.trim()) {
    return { success: false, error: "Product name is required." };
  }

  if (!description || !description.trim()) {
    return { success: false, error: "Product description is required." };
  }

  const validCategories = ["cork-products", "rubberised-cork", "decorative-cork", "cork-gifts"];
  if (!validCategories.includes(categorySlug)) {
    return { success: false, error: "Please select a valid category." };
  }

  if (!imageFileUri) {
    return { success: false, error: "Please upload a product image." };
  }

  try {
    // 1. Upload image to Cloudinary
    let imageUrl = imageFileUri;
    let imagePublicId = null;

    if (imageFileUri.startsWith("data:image")) {
      const uploadRes = await uploadToCloudinary(imageFileUri);
      if (!uploadRes.success) {
        return { success: false, error: uploadRes.error || "Image upload failed." };
      }
      imageUrl = uploadRes.url;
      imagePublicId = uploadRes.publicId;
    }

    // 2. Generate unique slug
    let baseSlug = slugify(name);
    let finalSlug = baseSlug;
    let counter = 1;

    // Check if slug already exists
    while (await prisma.product.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // 3. Clean FAQs
    const cleanFaqs = (faqs || [])
      .filter((f) => f.question && f.question.trim() && f.answer && f.answer.trim())
      .map((f, idx) => ({
        question: f.question.trim(),
        answer: f.answer.trim(),
        sortOrder: idx,
      }));

    // 4. Create product in database
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        slug: finalSlug,
        description,
        categorySlug,
        imageUrl,
        imagePublicId,
        faqs: {
          create: cleanFaqs,
        },
      },
    });

    // 5. Trigger instant revalidation of public pages
    revalidatePath("/products");
    revalidatePath(`/products/${categorySlug}`);
    revalidatePath(`/products/${categorySlug}/${finalSlug}`);
    revalidatePath("/admin/products");

    return {
      success: true,
      slug: finalSlug,
      categorySlug,
      productName: product.name,
    };
  } catch (error) {
    console.error("Failed to create product:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while saving the product.",
    };
  }
}

/**
 * Delete a product
 */
export async function deleteProductAction(productId) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, error: "Product not found." };
    }

    // Delete image from Cloudinary if stored
    if (product.imagePublicId) {
      await deleteFromCloudinary(product.imagePublicId);
    }

    // Delete product (cascades to FAQs)
    await prisma.product.delete({
      where: { id: productId },
    });

    // Revalidate paths
    revalidatePath("/products");
    revalidatePath(`/products/${product.categorySlug}`);
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: error.message || "Failed to delete product." };
  }
}

