"use client";

import { useRef } from "react";
import { story } from "@/content/site";
import { MediaFrame } from "@/components/media/MediaFrame";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CompanyStory() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".story-word", {
        autoAlpha: 0,
        y: 40,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.from(".story-copy", {
        autoAlpha: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".story-copy", start: "top 85%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} className="overflow-hidden bg-moss px-5 py-24 text-paper md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="story-word font-deva text-[clamp(5rem,18vw,14rem)] leading-[0.85] tracking-tight">
            {story.coreWord}
          </p>
          <p className="meta mt-6 text-mist">{story.coreCaption}</p>
          <p className="meta mt-16 text-mist/80">{story.eyebrow}</p>
          <h2 className="story-copy display mt-5 max-w-[16ch] text-[clamp(2.1rem,5vw,4.4rem)]">
            {story.heading}
          </h2>
          <div className="mt-10 max-w-2xl space-y-5">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="story-copy text-[17px] leading-relaxed text-mist/90">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MediaFrame
            src={story.images[0].src}
            alt={story.images[0].alt}
            className="col-span-2 aspect-[16/9]"
            sizes="(min-width: 1024px) 40vw, 100vw"
            parallax
            kenBurns
          />
          <MediaFrame
            src={story.images[1].src}
            alt={story.images[1].alt}
            className="aspect-[3/4]"
            sizes="20vw"
            kenBurns
          />
          <MediaFrame
            src={story.images[2].src}
            alt={story.images[2].alt}
            className="aspect-[3/4]"
            sizes="20vw"
            kenBurns
          />
        </div>
      </div>
    </section>
  );
}
