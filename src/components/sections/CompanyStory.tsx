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
    <section ref={root} className="section-x section-y overflow-x-clip bg-moss text-paper">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
        <div>
          <p className="story-word font-deva max-w-full text-[clamp(3.25rem,22vw,14rem)] leading-[0.85] tracking-tight">
            {story.coreWord}
          </p>
          <p className="meta mt-6 text-mist">{story.coreCaption}</p>
          <p className="meta mt-10 text-mist/80 md:mt-16">{story.eyebrow}</p>
          <h2 className="story-copy display mt-4 max-w-[16ch] text-[clamp(1.75rem,8vw,4.4rem)] md:mt-5">
            {story.heading}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 md:mt-10 md:space-y-5">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="story-copy text-[15px] leading-relaxed text-mist/90 md:text-[17px]">
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
