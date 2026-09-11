"use client";

import Image from "next/image";
import { marqueeItems } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Marquee() {
  const reduced = usePrefersReducedMotion();
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <section aria-hidden className="overflow-hidden border-y border-leaf-line bg-leaf-soft py-3 text-hero-ink sm:py-4">
      <div
        className={`flex w-max items-center gap-6 whitespace-nowrap sm:gap-10 ${reduced ? "" : "animate-marquee hover:[animation-play-state:paused]"}`}
      >
        {row.map((item, i) => (
          <span key={`${item.tag}-${i}`} className="meta flex items-center gap-4 text-hero-ink/75">
            <span className="relative size-8 overflow-hidden rounded-sm">
              <Image src={item.image} alt="" fill className="object-cover" sizes="32px" />
            </span>
            {item.text}
            <b className="rounded-full bg-sun px-2 py-0.5 font-medium text-hero-ink">{item.tag}</b>
            <span className="text-leaf">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
