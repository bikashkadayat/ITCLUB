import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(200),
  subject: z.string().trim().min(3, "Add a subject").max(150),
  message: z.string().trim().min(10, "Your message is too short").max(3000),
  website: z.string().max(0).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(200),
  website: z.string().max(0).optional(),
});

/** Flattens zod issues into { field: [messages] } for form state. */
export function zodErrors(err: z.ZodError) {
  const out: Record<string, string[]> = {};
  for (const i of err.issues) (out[String(i.path[0] ?? "form")] ??= []).push(i.message);
  return out;
}

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
