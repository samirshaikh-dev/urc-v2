import { z } from "zod";

export const VALID_PRODUCT_CATEGORIES = [
  "cork-products",
  "rubberised-cork",
  "decorative-cork",
  "cork-gifts",
];

export const seoProductFields = {
  seoTitle: z.string().trim().max(120).optional().default(""),
  seoDescription: z.string().trim().max(320).optional().default(""),
  seoImageUrl: z.string().trim().max(2048).optional().default(""),
  imageAlt: z.string().trim().max(300).optional().default(""),
  introduction: z.string().trim().max(1200).optional().default(""),
  features: z
    .array(z.string().trim().max(300))
    .max(30)
    .optional()
    .default([]),
  applications: z
    .array(z.string().trim().max(300))
    .max(30)
    .optional()
    .default([]),
  benefits: z
    .array(z.string().trim().max(300))
    .max(30)
    .optional()
    .default([]),
  sku: z.string().trim().max(120).optional().default(""),
  mpn: z.string().trim().max(120).optional().default(""),
  visibility: z.enum(["public", "private", "draft"]).optional().default("public"),
  lifecycleStatus: z
    .enum(["active", "out_of_stock", "discontinued"])
    .optional()
    .default("active"),
  indexingStatus: z
    .enum(["auto", "index", "noindex"])
    .optional()
    .default("auto"),
  relatedProductIds: z.array(z.string().trim().max(80)).max(30).optional().default([]),
};

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
  ...seoProductFields,
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
