"use client";

import { useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type ScrollRevealProps = {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement | null>
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
};

/** React Bits — ScrollReveal (scrubbed word reveal for section headings). */
export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.15,
  baseRotation = 2,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom+=20%",
  wordAnimationEnd = "bottom bottom+=10%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word inline-block" key={`${word}-${index}`}>
          {word}
        </span>
      );
    });
  }, [children]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el || reduced) return;

      const scroller =
        scrollContainerRef?.current ? scrollContainerRef.current : undefined;
      const triggers: ScrollTrigger[] = [];

      const rot = gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom",
            end: rotationEnd,
            scrub: true,
          },
        },
      );
      if (rot.scrollTrigger) triggers.push(rot.scrollTrigger);

      const wordElements = el.querySelectorAll<HTMLElement>(".word");
      const opacityTween = gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: "opacity" },
        {
          ease: "none",
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      );
      if (opacityTween.scrollTrigger) triggers.push(opacityTween.scrollTrigger);

      if (enableBlur) {
        const blurTween = gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: "none",
            filter: "blur(0px)",
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: true,
            },
          },
        );
        if (blurTween.scrollTrigger) triggers.push(blurTween.scrollTrigger);
      }

      return () => {
        triggers.forEach((t) => t.kill());
        rot.kill();
        opacityTween.kill();
      };
    },
    {
      dependencies: [
        scrollContainerRef,
        enableBlur,
        baseRotation,
        baseOpacity,
        rotationEnd,
        wordAnimationEnd,
        blurStrength,
        reduced,
      ],
    },
  );

  return (
    <h2 ref={containerRef} className={cn(containerClassName)}>
      <span className={cn("block", textClassName)}>{splitText}</span>
    </h2>
  );
}
