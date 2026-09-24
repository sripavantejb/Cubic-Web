import { z } from "zod";

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;
export const RESUME_ACCEPT = RESUME_EXTENSIONS.join(",");

export const careerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a valid phone number.")
    .max(20)
    .regex(/^[+\d][\d\s()-]{7,}$/, "Enter a valid phone number."),
});

export type CareerInput = z.infer<typeof careerSchema>;

export function resumeError(file: { name: string; size: number } | null | undefined) {
  if (!file || file.size === 0) return "Please attach your resume.";
  const name = file.name.toLowerCase();
  if (!RESUME_EXTENSIONS.some((ext) => name.endsWith(ext))) {
    return "Upload a PDF, DOC or DOCX file.";
  }
  if (file.size > RESUME_MAX_BYTES) return "Resume must be 5 MB or smaller.";
  return "";
}

export type CareerResponse =
  | { ok: true }
  | { ok: false; error: string; code: "validation" | "unconfigured" | "upstream" };
