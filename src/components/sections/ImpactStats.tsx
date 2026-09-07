"use client";

import { impact } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/media/MediaFrame";

function Trace({ delay }: { delay: string }) {
  return (
    <svg viewBox="0 0 320 80" className="mt-8 w-full text-leaf" aria-hidden>
      <path
        d="M0 50 C 40 50, 50 20, 90 20 S 140 62, 180 50 S 250 12, 320 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="origin-left animate-[trace_1.6s_ease-out_both]"
        style={{ animationDelay: delay }}
      />
    </svg>
  );
}

export function ImpactStats() {
  return (
    <section id="impact" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading eyebrow={impact.eyebrow} heading={impact.heading} lede={impact.lede} />
        <p className="mt-4 max-w-xl text-[13px] text-muted">{impact.footnote}</p>

        <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {impact.stats.map((stat, i) => (
            <article key={stat.title} className="bg-paper">
              <MediaFrame
                src={stat.image}
                alt={stat.alt}
                className="aspect-[16/10]"
                sizes="(min-width: 768px) 33vw, 100vw"
                kenBurns
              />
              <div className="p-8 md:p-10">
                <p className="font-mono text-[11px] tracking-[0.18em] text-leaf uppercase">
                  SIGNAL 0{i + 1}
                </p>
                <p className="display mt-6 text-[clamp(3rem,6vw,5.2rem)]">{stat.n}</p>
                <h3 className="mt-3 text-[18px] font-medium">{stat.title}</h3>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-muted">{stat.text}</p>
                <Trace delay={`${i * 120}ms`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
