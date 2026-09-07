import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  company: z.string().trim().min(2, "Please enter your company.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a valid phone number.")
    .max(20)
    .regex(/^[+\d][\d\s()-]{7,}$/, "Enter a valid phone number."),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  spaceType: z.enum(["home", "office", "factory", "community"], {
    error: "Select a space type.",
  }),
  message: z.string().trim().min(10, "Tell us a little more about your space.").max(2000),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadResponse =
  | { ok: true }
  | { ok: false; error: string; code: "validation" | "unconfigured" | "upstream" };
