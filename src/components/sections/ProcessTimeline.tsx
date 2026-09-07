"use client";

import { useRef } from "react";
import { process } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/media/MediaFrame";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ProcessTimeline() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      gsap.from(".process-step", {
        autoAlpha: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} className="bg-paper-2 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading eyebrow={process.eyebrow} heading={process.heading} />
        <div className="relative mt-16">
          <div className="process-line absolute top-5 right-0 left-0 hidden h-px origin-left bg-leaf/50 lg:block" />
          <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step) => (
              <li key={step.title} className="process-step">
                <MediaFrame
                  src={step.image}
                  alt={step.alt}
                  className="mb-6 aspect-[4/3]"
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  kenBurns
                />
                <div className="mb-6 size-2.5 rounded-full bg-leaf" />
                <p className="meta text-muted">{step.num}</p>
                <h3 className="mt-3 text-[22px] font-medium">{step.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
