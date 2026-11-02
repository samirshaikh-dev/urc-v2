"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPrismaClient } from "@/lib/prisma";
import {
  validateAdminCredentials,
  signSessionToken,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  getAdminSession,
} from "@/lib/auth";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";

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

  const prisma = getPrismaClient();
  if (!prisma) {
    return {
      success: false,
      error: "Database is not configured. Product management is unavailable.",
    };
  }

  const { name, description, categorySlug, imageFileUri, faqs = [], specifications = [] } = payload;

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

    while (await prisma.product.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // 3. Clean FAQs & Specifications
    const cleanFaqs = (faqs || [])
      .filter((f) => f.question && f.question.trim() && f.answer && f.answer.trim())
      .map((f, idx) => ({
        question: f.question.trim(),
        answer: f.answer.trim(),
        sortOrder: idx,
      }));

    const cleanSpecs = (specifications || [])
      .filter((s) => s.property && s.property.trim() && s.value && s.value.trim())
      .map((s, idx) => ({
        property: s.property.trim(),
        value: s.value.trim(),
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
        specifications: {
          create: cleanSpecs,
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
 * Update an existing product
 */
export async function updateProductAction(productId, payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const prisma = getPrismaClient();
  if (!prisma) {
    return {
      success: false,
      error: "Database is not configured. Product management is unavailable.",
    };
  }

  const { name, description, categorySlug, imageFileUri, faqs = [], specifications = [] } = payload;

  if (!productId) {
    return { success: false, error: "Product ID is required." };
  }

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

  try {
    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      return { success: false, error: "Product not found." };
    }

    let imageUrl = existing.imageUrl;
    let imagePublicId = existing.imagePublicId;

    // Only upload to Cloudinary if a new local image was chosen
    if (imageFileUri && imageFileUri.startsWith("data:image")) {
      const uploadRes = await uploadToCloudinary(imageFileUri);
      if (!uploadRes.success) {
        return { success: false, error: uploadRes.error || "Image upload failed." };
      }
      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId).catch(() => {});
      }
      imageUrl = uploadRes.url;
      imagePublicId = uploadRes.publicId;
    }

    const cleanFaqs = (faqs || [])
      .filter((f) => f.question && f.question.trim() && f.answer && f.answer.trim())
      .map((f, idx) => ({
        question: f.question.trim(),
        answer: f.answer.trim(),
        sortOrder: idx,
      }));

    const cleanSpecs = (specifications || [])
      .filter((s) => s.property && s.property.trim() && s.value && s.value.trim())
      .map((s, idx) => ({
        property: s.property.trim(),
        value: s.value.trim(),
        sortOrder: idx,
      }));

    // In a transaction: delete old faqs/specs and update product with new ones
    await prisma.$transaction([
      prisma.productFaq.deleteMany({ where: { productId } }),
      prisma.productSpecification.deleteMany({ where: { productId } }),
      prisma.product.update({
        where: { id: productId },
        data: {
          name: name.trim(),
          categorySlug,
          description,
          imageUrl,
          imagePublicId,
          faqs: {
            create: cleanFaqs,
          },
          specifications: {
            create: cleanSpecs,
          },
        },
      }),
    ]);

    revalidatePath("/products");
    revalidatePath(`/products/${categorySlug}`);
    revalidatePath(`/products/${categorySlug}/${existing.slug}`);
    revalidatePath("/admin/products");

    return {
      success: true,
      slug: existing.slug,
      categorySlug,
      productName: name.trim(),
    };
  } catch (error) {
    console.error("Failed to update product:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while updating the product.",
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

  const prisma = getPrismaClient();
  if (!prisma) {
    return {
      success: false,
      error: "Database is not configured. Product management is unavailable.",
    };
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, error: "Product not found." };
    }

    if (product.imagePublicId) {
      await deleteFromCloudinary(product.imagePublicId);
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/products");
    revalidatePath(`/products/${product.categorySlug}`);
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: error.message || "Failed to delete product." };
  }
}
