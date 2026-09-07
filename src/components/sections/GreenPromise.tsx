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
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <p className="meta text-mist">{promise.eyebrow}</p>
        <h2 className="display mt-6 max-w-[16ch] text-[clamp(2.4rem,6vw,5.6rem)]">
          {promise.heading}
        </h2>
        <p className="mt-6 max-w-xl text-[17px] text-mist/90">{promise.lede}</p>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {promise.stats.map((stat) => (
            <div key={stat.label} className="border-t border-white/10 pt-6">
              <p className="display text-[clamp(3.4rem,7vw,6rem)] leading-none">
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
