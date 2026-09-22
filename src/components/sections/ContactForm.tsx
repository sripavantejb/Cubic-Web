"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { leadSchema, type LeadResponse } from "@/lib/validation/lead";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";

const empty = {
  name: "",
  company: "",
  email: "",
  phone: "",
  city: "",
  spaceType: "",
  message: "",
};

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as LeadResponse;
      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerError(
          !data.ok
            ? data.error
            : "We couldn't send your request. Please email us directly.",
        );
        return;
      }
      setStatus("success");
      setValues(empty);
      try {
        sessionStorage.setItem("hazel-contact-done", "1");
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again or email us directly.");
    }
  }

  const field = (id: string, label: string, extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <label className="block">
      <span className="meta text-[0.62rem] text-muted">{label}</span>
      <input
        id={id}
        name={id}
        value={values[id as keyof typeof values]}
        onChange={(e) => set(id, e.target.value)}
        className={cn(
          "mt-0.5 w-full border-b border-line bg-transparent py-1.5 text-[14px] outline-none transition-colors focus:border-leaf",
          errors[id] && "border-red-700",
        )}
        {...extra}
      />
      {errors[id] ? <span className="mt-1 block text-[12px] text-red-800">{errors[id]}</span> : null}
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3.5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        {field("name", "Name", { autoComplete: "name", required: true })}
        {field("company", "Company", { autoComplete: "organization", required: true })}
        {field("email", "Email", { type: "email", autoComplete: "email", required: true })}
        {field("phone", "Phone", { type: "tel", autoComplete: "tel", required: true })}
        {field("city", "City (optional)", { autoComplete: "address-level2" })}
        <label className="block">
          <span className="meta text-[0.62rem] text-muted">Space type</span>
          <select
            name="spaceType"
            value={values.spaceType}
            onChange={(e) => set("spaceType", e.target.value)}
            className={cn(
              "mt-0.5 w-full border-b border-line bg-transparent py-1.5 text-[14px] outline-none transition-colors focus:border-leaf",
              errors.spaceType && "border-red-700",
            )}
          >
            <option value="">I need services for…</option>
            {contact.spaceTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.spaceType ? (
            <span className="mt-1 block text-[12px] text-red-800">{errors.spaceType}</span>
          ) : null}
        </label>
      </div>
      <label className="block">
        <span className="meta text-[0.62rem] text-muted">Message</span>
        <textarea
          name="message"
          rows={2}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="A few words about your space, size, and what you need"
          className={cn(
            "mt-0.5 w-full resize-none border-b border-line bg-transparent py-1.5 text-[14px] outline-none transition-colors focus:border-leaf",
            errors.message && "border-red-700",
          )}
        />
        {errors.message ? (
          <span className="mt-1 block text-[12px] text-red-800">{errors.message}</span>
        ) : null}
      </label>

      <div className="flex flex-col gap-2.5 pt-0.5 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          magnetic
          arrow={false}
          disabled={status === "loading"}
          className="h-10 !text-[13px]"
        >
          {status === "loading" ? "Sending…" : contact.submit}
        </Button>
        <p className="text-[11.5px] leading-snug text-muted sm:max-w-[16rem] sm:text-right">
          {contact.formNote}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] text-leaf"
          >
            Received. We&apos;ll send a free facility audit and a green plan within 48 hours.
          </motion.p>
        ) : null}
        {status === "error" && serverError ? (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] text-red-800"
          >
            {serverError}{" "}
            <a className="underline" href={site.emailHref}>
              {site.email}
            </a>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
