import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { careerSchema, resumeError, type CareerResponse } from "@/lib/validation/career";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fail(error: string, code: "validation" | "unconfigured" | "upstream", status: number) {
  return NextResponse.json({ ok: false, error, code } satisfies CareerResponse, { status });
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Invalid request.", "validation", 400);
  }

  const parsed = careerSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    phone: form.get("phone"),
    role: form.get("role"),
  });
  const resume = form.get("resume");
  const file = resume instanceof File ? resume : null;
  const fileError = resumeError(file);
  if (!parsed.success || fileError || !file) {
    return fail(fileError || "Please check the form and try again.", "validation", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return fail(
      "Applications can't be sent right now. Please email your resume to",
      "unconfigured",
      503,
    );
  }

  const { name, email, phone, role } = parsed.data;
  const to = process.env.CAREERS_TO_EMAIL || site.email;
  const from = process.env.CAREERS_FROM_EMAIL || "Hazel India Careers <onboarding@resend.dev>";
  const content = Buffer.from(await file.arrayBuffer()).toString("base64");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Career application — ${role} — ${name}`,
        html: `
          <h2>New career application</h2>
          <p><strong>Role:</strong> ${escapeHtml(role)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p>Resume attached: ${escapeHtml(file.name)}</p>
        `,
        attachments: [{ filename: file.name, content }],
      }),
    });
    if (!res.ok) {
      return fail("We couldn't send your application. Please email your resume to", "upstream", 503);
    }
    return NextResponse.json({ ok: true } satisfies CareerResponse);
  } catch {
    return fail("We couldn't send your application. Please email your resume to", "upstream", 503);
  }
}
