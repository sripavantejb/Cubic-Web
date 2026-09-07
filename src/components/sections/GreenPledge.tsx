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
    <section id="pledge" ref={root} className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="meta text-leaf">{pledge.eyebrow}</p>
          <h2 className="display mt-6 max-w-[14ch] text-[clamp(2rem,5vw,4.2rem)]">{pledge.heading}</h2>
          <ol className="mt-16 space-y-0">
            {pledge.items.map((item, i) => (
              <li
                key={item.label}
                className={`pledge-line pledge-line-${i} flex items-baseline justify-between gap-6 border-t border-line py-7`}
              >
                <span className="meta text-muted">0{i + 1}</span>
                <span className="display flex-1 text-[clamp(1.5rem,3.2vw,2.8rem)]">{item.label}</span>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <Button
              href={pledge.cta.href}
              magnetic
              onClick={(e) => {
                e.preventDefault();
                scrollTo(pledge.cta.href);
              }}
            >
              {pledge.cta.label}
            </Button>
          </div>
        </div>
        <div className="relative hidden min-h-[520px] lg:block lg:sticky lg:top-24">
          {pledge.items.map((item, i) => (
            <div
              key={item.image}
              className={`pledge-shot pledge-shot-${i} absolute inset-0`}
            >
              <MediaFrame
                src={item.image}
                alt={item.alt}
                className="absolute inset-0 h-full"
                sizes="45vw"
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
