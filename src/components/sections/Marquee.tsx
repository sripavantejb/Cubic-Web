"use client";

import Image from "next/image";
import { marqueeItems } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Marquee() {
  const reduced = usePrefersReducedMotion();
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <section aria-hidden className="overflow-hidden border-y border-line bg-moss py-4 text-paper">
      <div
        className={`flex w-max items-center gap-10 whitespace-nowrap ${reduced ? "" : "animate-marquee hover:[animation-play-state:paused]"}`}
      >
        {row.map((item, i) => (
          <span key={`${item.tag}-${i}`} className="meta flex items-center gap-4 text-mist">
            <span className="relative size-8 overflow-hidden rounded-sm">
              <Image src={item.image} alt="" fill className="object-cover" sizes="32px" />
            </span>
            {item.text}
            <b className="font-medium text-lime">{item.tag}</b>
            <span className="text-sprout">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
