import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string({ error: "Article title is required." })
    .trim()
    .min(1, { error: "Article title is required." }),
  content: z
    .string({ error: "Article content is required." })
    .trim()
    .min(1, { error: "Article content is required." }),
  excerpt: z.string().trim().optional().default(""),
  tags: z.string().trim().optional().default(""),
  author: z.string().trim().optional().default("URC Engineering Team"),
  readTime: z.string().trim().optional().default("4 min read"),
  imageFileUri: z.string().optional().nullable(),
  published: z.boolean().optional().default(true),
});

export const updateBlogSchema = z.object({
  id: z
    .string({ error: "Blog ID is required." })
    .trim()
    .min(1, { error: "Blog ID is required." }),
  title: z.string().trim().min(1, { error: "Article title is required." }).optional(),
  content: z.string().trim().min(1, { error: "Article content is required." }).optional(),
  excerpt: z.string().trim().optional(),
  tags: z.string().trim().optional(),
  author: z.string().trim().optional(),
  readTime: z.string().trim().optional(),
  imageFileUri: z.string().optional().nullable(),
  published: z.boolean().optional(),
});

export function validateCreateBlog(payload) {
  const result = createBlogSchema.safeParse(payload);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid article details.",
      issues: result.error.issues,
    };
  }
  return { success: true, data: result.data };
}

export function validateUpdateBlog(id, payload) {
  const result = updateBlogSchema.safeParse({ id, ...payload });
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid article details.",
      issues: result.error.issues,
    };
  }
  return { success: true, data: result.data };
}

