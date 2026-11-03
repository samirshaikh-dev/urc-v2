import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Please enter both email and password." })
    .trim()
    .min(1, { error: "Please enter both email and password." })
    .email({ error: "Please enter a valid email address." }),
  password: z
    .string({ error: "Please enter both email and password." })
    .min(1, { error: "Please enter both email and password." }),
});

export function validateLogin(payload) {
  const result = loginSchema.safeParse(payload);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Please enter both email and password.",
      issues: result.error.issues,
    };
  }
  return { success: true, data: result.data };
}

