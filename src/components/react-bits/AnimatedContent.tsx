"use client";

import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type AnimatedContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  distance?: number
  direction?: "vertical" | "horizontal"
  reverse?: boolean
  duration?: number
  ease?: string
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
};

/** React Bits — AnimatedContent (GSAP scroll entrance). */
export function AnimatedContent({
  children,
  distance = 48,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.12,
  delay = 0,
  className,
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { clearProps: "all", autoAlpha: 1 });
        return;
      }

      const axis = direction === "horizontal" ? "x" : "y";
      const offset = reverse ? -distance : distance;
      const startPct = (1 - threshold) * 100;

      gsap.set(el, {
        [axis]: offset,
        scale,
        opacity: animateOpacity ? initialOpacity : 1,
        autoAlpha: animateOpacity ? initialOpacity : 1,
      });

      const tween = gsap.to(el, {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        autoAlpha: 1,
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
    {
      dependencies: [
        distance,
        direction,
        reverse,
        duration,
        ease,
        initialOpacity,
        animateOpacity,
        scale,
        threshold,
        delay,
        reduced,
      ],
    },
  );

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
