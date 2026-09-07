"use client";

import { pillars } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { MediaFrame } from "@/components/media/MediaFrame";
import { cn } from "@/lib/cn";

export function Pillars() {
  return (
    <SectionFrame className="bg-paper" innerClassName="max-w-none px-0 pt-0 pb-0 md:px-0 md:pt-0 md:pb-0">
      <div className="grid min-h-0 flex-1 md:grid-cols-2">
        {pillars.map((pillar, i) => (
          <article
            key={pillar.id}
            className={cn(
              "group relative min-h-[240px] overflow-hidden border-t border-line md:min-h-0",
              i % 2 === 1 && "md:border-l",
            )}
          >
            <MediaFrame
              src={pillar.image}
              alt={pillar.alt}
              className="absolute inset-0 h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              sizes="50vw"
              reveal={false}
              kenBurns
            />
            <div className="absolute inset-0 bg-paper transition-colors duration-500 group-hover:bg-ink/70" />
            <div className="relative z-10 flex h-full flex-col justify-end px-5 py-8 md:px-8 md:py-10">
              <p className="meta text-muted group-hover:text-mist">0{i + 1}</p>
              <h3 className="display mt-4 text-[clamp(1.6rem,3.2vw,2.6rem)] text-ink transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-paper">
                {pillar.label}
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted group-hover:text-paper/85">
                {pillar.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
