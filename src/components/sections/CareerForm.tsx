"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { site } from "@/content/site";
import {
  RESUME_ACCEPT,
  careerSchema,
  resumeError,
  type CareerResponse,
} from "@/lib/validation/career";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";

const empty = { name: "", email: "", phone: "" };

const inputClass =
  "h-14 w-full rounded-[10px] border border-hero-ink/25 bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted focus:border-leaf focus:ring-2 focus:ring-leaf/15";

export function CareerForm() {
  const [values, setValues] = useState(empty);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof typeof empty, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const next: Record<string, string> = {};
    const parsed = careerSchema.safeParse(values);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
    }
    const fileError = resumeError(file);
    if (fileError) next.resume = fileError;
    if (Object.keys(next).length > 0 || !parsed.success || !file) {
      setErrors(next);
      setStatus("error");
      return;
    }

    const body = new FormData();
    body.set("name", parsed.data.name);
    body.set("email", parsed.data.email);
    body.set("phone", parsed.data.phone);
    body.set("resume", file);

    setStatus("loading");
    try {
      const res = await fetch("/api/careers", { method: "POST", body });
      const data = (await res.json()) as CareerResponse;
      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerError(
          !data.ok ? data.error : "We couldn't send your application. Please email your resume to",
        );
        return;
      }
      setStatus("success");
      setValues(empty);
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again or email your resume to");
    }
  }

  const field = (
    id: keyof typeof empty,
    placeholder: string,
    extra?: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div>
      <label htmlFor={`career-${id}`} className="sr-only">
        {placeholder}
      </label>
      <input
        id={`career-${id}`}
        name={id}
        placeholder={placeholder}
        value={values[id]}
        onChange={(e) => set(id, e.target.value)}
        aria-invalid={Boolean(errors[id]) || undefined}
        className={cn(inputClass, errors[id] && "border-red-700")}
        {...extra}
      />
      {errors[id] ? <p className="mt-1.5 text-[13px] text-red-800">{errors[id]}</p> : null}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto grid w-full max-w-[52rem] gap-6">
      {field("name", "Name", { autoComplete: "name", required: true })}
      {field("email", "Email", { type: "email", autoComplete: "email", required: true })}
      {field("phone", "Phone Number", { type: "tel", autoComplete: "tel", required: true })}

      <div>
        <label
          htmlFor="career-resume"
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-[10px] border border-dashed border-hero-ink/25 bg-white px-4 py-4 text-[14px] transition-colors hover:border-leaf",
            errors.resume && "border-red-700",
          )}
        >
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-mint px-3.5 py-2 text-[13px] font-semibold text-hero-ink">
            <Upload className="size-3.5" aria-hidden="true" />
            Choose File
          </span>
          <span className={cn("truncate", file ? "text-ink" : "text-muted")}>
            {file ? file.name : "No file chosen — PDF, DOC or DOCX, up to 5 MB"}
          </span>
        </label>
        <input
          ref={fileRef}
          id="career-resume"
          name="resume"
          type="file"
          accept={RESUME_ACCEPT}
          className="sr-only"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setErrors((prev) => ({ ...prev, resume: "" }));
          }}
        />
        {errors.resume ? <p className="mt-1.5 text-[13px] text-red-800">{errors.resume}</p> : null}
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-full bg-sun px-8 text-[13px] font-semibold tracking-[0.08em] text-hero-ink uppercase transition-colors hover:bg-sun-deep disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send Resume"}
        </button>
      </div>

      <div aria-live="polite" className="text-center">
        {status === "success" ? (
          <p className="text-[14px] text-leaf">
            Thank you! Your application has been sent. Our team will get back to you if there&apos;s a
            match.
          </p>
        ) : null}
        {status === "error" && serverError ? (
          <p className="text-[14px] text-red-800">
            {serverError}{" "}
            <a className="underline" href={site.emailHref}>
              {site.email}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
