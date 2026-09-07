"use client";

import { promise } from "@/content/site";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { MediaFrame } from "@/components/media/MediaFrame";

export function GreenPromise() {
  return (
    <section id="promise" className="relative overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 opacity-40">
        <MediaFrame
          src={promise.image}
          alt={promise.alt}
          className="absolute inset-0 h-full"
          sizes="100vw"
          kenBurns
          parallax
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/50" />
      <div className="section-x section-y relative mx-auto max-w-[1440px]">
        <p className="meta text-mist">{promise.eyebrow}</p>
        <h2 className="display mt-4 max-w-[16ch] text-[clamp(1.85rem,8vw,5.6rem)] md:mt-6">
          {promise.heading}
        </h2>
        <p className="mt-4 max-w-xl text-[15px] text-mist/90 md:mt-6 md:text-[17px]">{promise.lede}</p>
        <div className="mt-10 grid gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {promise.stats.map((stat) => (
            <div key={stat.label} className="border-t border-white/10 pt-6">
              <p className="display text-[clamp(2.6rem,14vw,6rem)] leading-none">
                <MetricCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 max-w-[16ch] text-[15px] text-mist">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
