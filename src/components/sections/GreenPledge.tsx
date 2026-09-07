"use client";

import { useRef } from "react";
import { pledge } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/media/MediaFrame";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap-register";
import { useApp } from "@/components/providers/AppProviders";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function GreenPledge() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useApp();
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      gsap.from(".pledge-line", {
        y: 36,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });

      gsap.set(".pledge-shot", { autoAlpha: 0 });
      gsap.set(".pledge-shot-0", { autoAlpha: 1 });
      pledge.items.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.pledge-line-${i}`,
          start: "top 65%",
          end: "bottom 35%",
          onToggle: (self) => {
            if (!self.isActive) return;
            gsap.to(".pledge-shot", { autoAlpha: 0, duration: 0.35, overwrite: "auto" });
            gsap.to(`.pledge-shot-${i}`, { autoAlpha: 1, duration: 0.45, overwrite: "auto" });
          },
        });
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section id="pledge" ref={root} className="section-x section-y bg-paper">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
        <div>
          <p className="meta text-leaf">{pledge.eyebrow}</p>
          <h2 className="display mt-4 max-w-[14ch] text-[clamp(1.75rem,8vw,4.2rem)] md:mt-6">{pledge.heading}</h2>
          <ol className="mt-10 space-y-0 md:mt-16">
            {pledge.items.map((item, i) => (
              <li
                key={item.label}
                className={`pledge-line pledge-line-${i} flex min-h-12 items-baseline justify-between gap-4 border-t border-line py-5 md:gap-6 md:py-7`}
              >
                <span className="meta shrink-0 text-muted">0{i + 1}</span>
                <span className="display min-w-0 flex-1 text-[clamp(1.25rem,5.8vw,2.8rem)]">{item.label}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 md:mt-12">
            <Button
              href={pledge.cta.href}
              magnetic
              className="w-full sm:w-auto"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(pledge.cta.href);
              }}
            >
              {pledge.cta.label}
            </Button>
          </div>
        </div>
        <div className="relative aspect-[16/11] min-h-[14rem] overflow-hidden max-lg:order-first lg:sticky lg:top-24 lg:aspect-auto lg:min-h-[min(32rem,calc(100svh-8rem))]">
          {pledge.items.map((item, i) => (
            <div
              key={item.image}
              className={`pledge-shot pledge-shot-${i} absolute inset-0`}
            >
              <MediaFrame
                src={item.image}
                alt={item.alt}
                className="absolute inset-0 h-full"
                sizes="(min-width: 1024px) 45vw, 100vw"
                reveal={false}
                kenBurns
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
