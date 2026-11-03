import { z } from "zod";

export const VALID_LEAD_STATUSES = [
  "new",
  "review",
  "quoted",
  "converted",
  "archived",
];

export const createLeadSchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .trim()
    .min(1, { error: "Enter your full name." }),
  company: z
    .string({ error: "Company name is required." })
    .trim()
    .min(1, { error: "Enter your company name." }),
  email: z
    .string({ error: "Email is required." })
    .trim()
    .email({ error: "Enter a valid business email address." }),
  phone: z
    .string()
    .trim()
    .optional()
    .default(""),
  product: z
    .string()
    .trim()
    .optional()
    .default("General Inquiry / Other"),
  message: z
    .string({ error: "Message is required." })
    .trim()
    .min(10, { error: "Please provide at least 10 characters describing your requirement." }),
});

export const updateLeadStatusSchema = z.object({
  id: z
    .string({ error: "Lead ID is required." })
    .trim()
    .min(1, { error: "Lead ID is required." }),
  status: z.enum(VALID_LEAD_STATUSES, {
    error: "Invalid lead status provided.",
  }),
});

export const addLeadNoteSchema = z.object({
  id: z
    .string({ error: "Lead ID is required." })
    .trim()
    .min(1, { error: "Lead ID is required." }),
  noteText: z
    .string({ error: "Note cannot be empty." })
    .trim()
    .min(1, { error: "Note cannot be empty." }),
});

export function validateCreateLead(payload) {
  const result = createLeadSchema.safeParse(payload);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid contact form submission.",
      issues: result.error.issues,
    };
  }
  return { success: true, data: result.data };
}

export function validateUpdateLeadStatus(id, status) {
  const result = updateLeadStatusSchema.safeParse({ id, status });
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid status update.",
      issues: result.error.issues,
    };
  }
  return { success: true, data: result.data };
}

export function validateAddLeadNote(id, noteText) {
  const result = addLeadNoteSchema.safeParse({ id, noteText });
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid note.",
      issues: result.error.issues,
    };
  }
  return { success: true, data: result.data };
}

