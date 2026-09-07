"use client";

import { impact } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/media/MediaFrame";

export function ImpactStats() {
  return (
    <SectionFrame id="impact" className="bg-paper">
      <SectionHeading eyebrow={impact.eyebrow} heading={impact.heading} lede={impact.lede} />
      <p className="mt-2 max-w-xl shrink-0 text-[12px] text-muted">{impact.footnote}</p>

      <div className="mt-5 grid min-h-0 flex-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
        {impact.stats.map((stat, i) => (
          <article key={stat.title} className="flex min-h-0 flex-col bg-paper">
            <MediaFrame
              src={stat.image}
              alt={stat.alt}
              className="min-h-0 flex-1"
              sizes="(min-width: 768px) 33vw, 100vw"
              kenBurns
            />
            <div className="shrink-0 px-5 py-4 md:px-6 md:py-5">
              <p className="font-mono text-[11px] tracking-[0.18em] text-leaf uppercase">
                SIGNAL 0{i + 1}
              </p>
              <p className="display mt-2 text-[clamp(2rem,4vw,3.4rem)] leading-none">{stat.n}</p>
              <h3 className="mt-2 text-[16px] font-medium">{stat.title}</h3>
              <p className="mt-1.5 max-w-[34ch] text-[13px] leading-relaxed text-muted">{stat.text}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
