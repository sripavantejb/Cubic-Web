"use client";

import { useRef } from "react";
import { roadmap } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/media/MediaFrame";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Roadmap() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const section = root.current;
      if (!section || reduced) return;

      gsap.fromTo(
        ".roadmap-card",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <SectionFrame as="section" id="roadmap" className="bg-moss text-paper">
      <div ref={root} className="flex min-h-0 flex-1 flex-col">
        <SectionHeading
          light
          eyebrow={roadmap.eyebrow}
          heading={roadmap.heading}
          headingClassName="max-w-[20ch]"
        />

        <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {roadmap.milestones.map((m, i) => (
            <article key={m.year} className="roadmap-card flex min-h-0 flex-col border-t border-mist/30 pt-5">
              <div className="relative mb-4 min-h-[120px] flex-1 overflow-hidden">
                <MediaFrame
                  src={m.image}
                  alt={m.alt}
                  className="absolute inset-0 h-full w-full"
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  kenBurns
                />
              </div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-mist">0{i + 1} / 04</p>
              <p className="display mt-2 text-[clamp(2rem,3.2vw,2.8rem)] leading-none">{m.year}</p>
              <h3 className="mt-2 text-[16px] font-medium">{m.title}</h3>
              <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-mist/90">{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
