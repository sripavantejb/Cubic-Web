"use client";

import { promise } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { MetricCounter } from "@/components/ui/MetricCounter";
import { MediaFrame } from "@/components/media/MediaFrame";

export function GreenPromise() {
  return (
    <SectionFrame
      id="promise"
      className="overflow-hidden bg-ink text-paper"
      backdrop={
        <>
          <div className="absolute inset-0 opacity-40">
            <MediaFrame
              src={promise.image}
              alt={promise.alt}
              className="absolute inset-0 h-full"
              sizes="100vw"
              kenBurns
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/50" />
        </>
      }
    >
      <div className="relative flex min-h-0 flex-1 flex-col justify-center">
        <p className="meta text-mist">{promise.eyebrow}</p>
        <h2 className="display mt-3 max-w-[16ch] text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[0.96]">
          {promise.heading}
        </h2>
        <p className="mt-3 max-w-xl text-[15px] text-mist/90">{promise.lede}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {promise.stats.map((stat) => (
            <div key={stat.label} className="border-t border-white/10 pt-4">
              <p className="display text-[clamp(2.4rem,5vw,4.2rem)] leading-none">
                <MetricCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 max-w-[16ch] text-[14px] text-mist">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
