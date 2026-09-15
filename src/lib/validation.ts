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

export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,20}$/, "Enter a valid phone number"),
  program: z.string().trim().min(1, "Select your program").max(60),
  semester: z.string().trim().min(1, "Select your semester").max(20),
  departments: z.array(z.string()).min(1, "Choose at least one department").max(2, "You may select up to two departments"),
  skills: z.string().trim().max(400).optional(),
  motivation: z.string().trim().min(20, "Tell us a little more (at least 20 characters)").max(1500),
  agree: z.literal(true, { message: "You must agree to the Constitution and Code of Conduct" }),
  website: z.string().max(0).optional(),
});

/** Flattens zod issues into { field: [messages] } for form state. */
export function zodErrors(err: z.ZodError) {
  const out: Record<string, string[]> = {};
  for (const i of err.issues) (out[String(i.path[0] ?? "form")] ??= []).push(i.message);
  return out;
}

export type ApplicationInput = z.infer<typeof applicationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
