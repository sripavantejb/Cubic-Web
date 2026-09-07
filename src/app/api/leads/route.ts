import { NextResponse } from "next/server";
import { leadSchema, type LeadResponse } from "@/lib/validation/lead";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request.", code: "validation" } satisfies LeadResponse,
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the form and try again.",
        code: "validation",
      } satisfies LeadResponse,
      { status: 400 },
    );
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Audit request couldn't be sent right now. Email us and we'll respond within 48 hours.",
        code: "unconfigured",
      } satisfies LeadResponse,
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        source: "hazel-india-website",
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't deliver your request. Please email us directly.",
          code: "upstream",
        } satisfies LeadResponse,
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true } satisfies LeadResponse);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't deliver your request. Please email us directly.",
        code: "upstream",
      } satisfies LeadResponse,
      { status: 503 },
    );
  }
}
