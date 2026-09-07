"use client";

import { useRef } from "react";
import { roadmap } from "@/content/site";
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
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
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
    <section ref={root} id="roadmap" className="bg-moss text-paper">
      <div className="section-x section-y mx-auto max-w-[1440px]">
        <SectionHeading
          light
          eyebrow={roadmap.eyebrow}
          heading={roadmap.heading}
          headingClassName="max-w-[20ch]"
        />

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:mt-16 sm:grid-cols-2 sm:gap-y-14 xl:grid-cols-4 xl:gap-x-6">
          {roadmap.milestones.map((m, i) => (
            <article key={m.year} className="roadmap-card border-t border-mist/30 pt-8">
              <div className="relative mb-8 aspect-[16/11] overflow-hidden">
                <MediaFrame
                  src={m.image}
                  alt={m.alt}
                  className="absolute inset-0 h-full w-full"
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  parallax
                  kenBurns
                />
              </div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-mist">0{i + 1} / 04</p>
              <p className="display mt-5 text-[clamp(2.6rem,4vw,3.75rem)] leading-none">{m.year}</p>
              <h3 className="mt-5 text-[20px] font-medium">{m.title}</h3>
              <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-mist/90">{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
