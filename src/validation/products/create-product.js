import { z } from "zod";

export const VALID_PRODUCT_CATEGORIES = [
  "cork-products",
  "rubberised-cork",
  "decorative-cork",
  "cork-gifts",
];

export const createProductSchema = z.object({
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
  imageFileUri: z
    .string({ error: "Please upload a product image." })
    .min(1, { error: "Please upload a product image." }),
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

export function validateCreateProduct(payload) {
  const result = createProductSchema.safeParse(payload);

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
