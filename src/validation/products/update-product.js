import { z } from "zod";
import { VALID_PRODUCT_CATEGORIES } from "./create-product.js";

export const updateProductSchema = z.object({
  productId: z
    .string({ error: "Product ID is required." })
    .trim()
    .min(1, { error: "Product ID is required." }),
  name: z
    .string({ error: "Product name is required." })
    .trim()
    .min(1, { error: "Product name is required." }),
  description: z
    .string({ error: "Product description is required." })
    .trim()
    .min(1, { error: "Product description is required." }),
  categorySlug: z.enum(VALID_PRODUCT_CATEGORIES, {
    error: "Please select a valid category.",
  }),
  imageFileUri: z.string().optional().nullable(),
  faqs: z
    .array(
      z.object({
        question: z.string().default(""),
        answer: z.string().default(""),
      })
    )
    .optional()
    .default([]),
  specifications: z
    .array(
      z.object({
        property: z.string().default(""),
        value: z.string().default(""),
      })
    )
    .optional()
    .default([]),
});

export function validateUpdateProduct(productId, payload) {
  const result = updateProductSchema.safeParse({
    productId,
    ...payload,
  });

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return {
      success: false,
      error: firstIssue?.message || "Invalid product information.",
      issues: result.error.issues,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
