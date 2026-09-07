"use client";

import { useRef } from "react";
import { animateCounter } from "@/animations/counter";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  eager?: boolean
};

export function MetricCounter({
  value,
  suffix = "",
  prefix = "",
  className,
  eager = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        el.textContent = `${prefix}${value}${suffix}`;
        return;
      }
      gsap.set(el, { textContent: `${prefix}0${suffix}` });
      if (eager) {
        animateCounter(gsap, el, value, { suffix, prefix, duration: 1.65 });
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => animateCounter(gsap, el, value, { suffix, prefix }),
      });
    },
    { dependencies: [value, suffix, prefix, reduced, eager] },
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
