"use client";

import { useRef } from "react";
import { process } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/media/MediaFrame";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      gsap.from(".process-step", {
        autoAlpha: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <SectionFrame className="bg-paper-2">
      <div ref={root} className="flex min-h-0 flex-1 flex-col">
        <SectionHeading eyebrow={process.eyebrow} heading={process.heading} />
        <div className="relative mt-6 min-h-0 flex-1">
          <div className="process-line absolute top-3 right-0 left-0 hidden h-px origin-left bg-leaf/50 lg:block" />
          <ol className="grid h-full min-h-0 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step) => (
              <li key={step.title} className="process-step flex min-h-0 flex-col">
                <MediaFrame
                  src={step.image}
                  alt={step.alt}
                  className="mb-4 min-h-[110px] flex-1"
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  kenBurns
                />
                <div className="mb-3 size-2.5 rounded-full bg-leaf" />
                <p className="meta text-muted">{step.num}</p>
                <h3 className="mt-2 text-[17px] font-medium">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted md:text-[14px]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionFrame>
  );
}
