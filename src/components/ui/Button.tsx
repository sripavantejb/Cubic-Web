"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { attachMagnetic } from "@/animations/magnetic";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ButtonProps = {
  href?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost" | "inverse"
  magnetic?: boolean
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
  /** `true` for the default arrow, `false` for none, or a custom trailing element. */
  arrow?: React.ReactNode
  icon?: React.ReactNode
};

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  magnetic = false,
  className,
  type = "button",
  disabled,
  arrow = true,
  icon,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const desktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !magnetic || !desktop || reduced) return;
      return attachMagnetic(gsap, el, 14);
    },
    { dependencies: [magnetic, desktop, reduced] },
  );

  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium tracking-[-0.02em] transition-[background-color,color,transform] duration-300 sm:px-6",
    variant === "primary" &&
      "bg-sun text-hero-ink hover:bg-sun-deep",
    variant === "secondary" &&
      "border border-leaf-line bg-leaf-soft text-hero-ink hover:border-leaf/40 hover:bg-leaf-soft-2",
    variant === "ghost" && "px-0 text-ink hover:text-leaf",
    variant === "inverse" &&
      "bg-paper text-ink hover:bg-mist",
    disabled && "pointer-events-none opacity-50",
    className,
  );
  const extra = magnetic ? { "data-magnetic": "" } : {};

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow === true ? (
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : (
        arrow
      )}
    </>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={classes}
        {...extra}
        target={external && href.startsWith("http") ? "_blank" : undefined}
        rel={external && href.startsWith("http") ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...extra}
    >
      {content}
    </button>
  );
}
