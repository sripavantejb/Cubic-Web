"use client";

import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type FadeContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  blur?: boolean
  duration?: number
  ease?: string
  delay?: number
  threshold?: number
  initialOpacity?: number
};

/** React Bits — FadeContent (GSAP scroll fade / blur entrance). */
export function FadeContent({
  children,
  blur = false,
  duration = 0.85,
  ease = "power2.out",
  delay = 0,
  threshold = 0.12,
  initialOpacity = 0,
  className,
  ...props
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { clearProps: "all", autoAlpha: 1, filter: "none" });
        return;
      }

      const startPct = (1 - threshold) * 100;
      gsap.set(el, {
        autoAlpha: initialOpacity,
        filter: blur ? "blur(10px)" : "blur(0px)",
      });

      const tween = gsap.to(el, {
        autoAlpha: 1,
        filter: "blur(0px)",
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start: `top ${startPct}%`,
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [blur, duration, ease, delay, threshold, initialOpacity, reduced] },
  );

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
