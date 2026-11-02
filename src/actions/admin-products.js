"use server";

import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSessionCookie,
  getAdminSession,
  setAdminSessionCookie,
  signSessionToken,
  validateAdminCredentials,
} from "@/lib/auth";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { getDbClient } from "@/lib/db";
import { productFaqs, productSpecifications, products } from "@/db/schema";
import { slugify } from "@/lib/utils";

function createRelatedRows(records, productId, fields) {
  return records.map((record, sortOrder) => ({
    id: randomUUID(),
    productId,
    ...Object.fromEntries(fields.map((field) => [field, record[field]])),
    sortOrder: record.sortOrder ?? sortOrder,
  }));
}

function cleanFaqs(faqs) {
  return (faqs || [])
    .filter((faq) => faq.question?.trim() && faq.answer?.trim())
    .map((faq) => ({
      question: faq.question.trim(),
      answer: faq.answer.trim(),
    }));
}

function cleanSpecifications(specifications) {
  return (specifications || [])
    .filter((specification) => specification.property?.trim() && specification.value?.trim())
    .map((specification) => ({
      property: specification.property.trim(),
      value: specification.value.trim(),
    }));
}

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

export async function createProductAction(payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const db = getDbClient();
  if (!db) {
    return {
      success: false,
      error: "Database is not configured. Product management is unavailable.",
    };
  }

  const {
    name,
    description,
    categorySlug,
    imageFileUri,
    faqs = [],
    specifications = [],
  } = payload;

  if (!name?.trim()) {
    return { success: false, error: "Product name is required." };
  }
  if (!description?.trim()) {
    return { success: false, error: "Product description is required." };
  }

  const validCategories = [
    "cork-products",
    "rubberised-cork",
    "decorative-cork",
    "cork-gifts",
  ];
  if (!validCategories.includes(categorySlug)) {
    return { success: false, error: "Please select a valid category." };
  }
  if (!imageFileUri) {
    return { success: false, error: "Please upload a product image." };
  }

  try {
    let imageUrl = imageFileUri;
    let imagePublicId = null;

    if (imageFileUri.startsWith("data:image")) {
      const upload = await uploadToCloudinary(imageFileUri);
      if (!upload.success) {
        return { success: false, error: upload.error || "Image upload failed." };
      }
      imageUrl = upload.url;
      imagePublicId = upload.publicId;
    }

    const baseSlug = slugify(name);
    let slug = baseSlug;
    let suffix = 1;

    while (
      (
        await db
          .select({ id: products.id })
          .from(products)
          .where(eq(products.slug, slug))
          .limit(1)
      ).length
    ) {
      slug = `${baseSlug}-${suffix}`;
      suffix++;
    }

    const productId = randomUUID();
    const faqRows = createRelatedRows(cleanFaqs(faqs), productId, ["question", "answer"]);
    const specificationRows = createRelatedRows(cleanSpecifications(specifications), productId, [
      "property",
      "value",
    ]);

    const [product] = await db.transaction(async (tx) => {
      const [created] = await tx
        .insert(products)
        .values({
          id: productId,
          slug,
          name: name.trim(),
          description,
          categorySlug,
          imageUrl,
          imagePublicId,
        })
        .returning();

      if (faqRows.length) {
        await tx.insert(productFaqs).values(faqRows);
      }
      if (specificationRows.length) {
        await tx.insert(productSpecifications).values(specificationRows);
      }

      return [created];
    });

    revalidatePath("/products");
    revalidatePath(`/products/${categorySlug}`);
    revalidatePath(`/products/${categorySlug}/${slug}`);
    revalidatePath("/admin/products");

    return { success: true, slug, categorySlug, productName: product.name };
  } catch (error) {
    console.error("Failed to create product:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while saving the product.",
    };
  }
}

export async function updateProductAction(productId, payload) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Please log in again." };
  }

  const db = getDbClient();
  if (!db) {
    return {
      success: false,
      error: "Database is not configured. Product management is unavailable.",
    };
  }

  const {
    name,
    description,
    categorySlug,
    imageFileUri,
    faqs = [],
    specifications = [],
  } = payload;

  if (!productId) {
    return { success: false, error: "Product ID is required." };
  }
  if (!name?.trim()) {
    return { success: false, error: "Product name is required." };
  }
  if (!description?.trim()) {
    return { success: false, error: "Product description is required." };
  }

  const validCategories = [
    "cork-products",
    "rubberised-cork",
    "decorative-cork",
    "cork-gifts",
  ];
  if (!validCategories.includes(categorySlug)) {
    return { success: false, error: "Please select a valid category." };
  }

  try {
    const [existing] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!existing) {
      return { success: false, error: "Product not found." };
    }

    let imageUrl = existing.imageUrl;
    let imagePublicId = existing.imagePublicId;

    if (imageFileUri?.startsWith("data:image")) {
      const upload = await uploadToCloudinary(imageFileUri);
      if (!upload.success) {
        return { success: false, error: upload.error || "Image upload failed." };
      }
      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId).catch(() => {});
      }
      imageUrl = upload.url;
      imagePublicId = upload.publicId;
    }

    const faqRows = createRelatedRows(cleanFaqs(faqs), productId, ["question", "answer"]);
    const specificationRows = createRelatedRows(cleanSpecifications(specifications), productId, [
      "property",
      "value",
    ]);

    await db.transaction(async (tx) => {
      await tx.delete(productFaqs).where(eq(productFaqs.productId, productId));
      await tx
        .delete(productSpecifications)
        .where(eq(productSpecifications.productId, productId));
      await tx
        .update(products)
        .set({
          name: name.trim(),
          categorySlug,
          description,
          imageUrl,
          imagePublicId,
          updatedAt: new Date(),
        })
        .where(eq(products.id, productId));

      if (faqRows.length) {
        await tx.insert(productFaqs).values(faqRows);
      }
      if (specificationRows.length) {
        await tx.insert(productSpecifications).values(specificationRows);
      }
    });

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

export async function deleteProductAction(productId) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized." };
  }

  const db = getDbClient();
  if (!db) {
    return {
      success: false,
      error: "Database is not configured. Product management is unavailable.",
    };
  }

  try {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (!product) {
      return { success: false, error: "Product not found." };
    }

    if (product.imagePublicId) {
      await deleteFromCloudinary(product.imagePublicId);
    }

    await db.delete(products).where(eq(products.id, productId));

    revalidatePath("/products");
    revalidatePath(`/products/${product.categorySlug}`);
    revalidatePath("/admin/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: error.message || "Failed to delete product." };
  }
}
