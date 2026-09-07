"use client";

import { pillars } from "@/content/site";
import { MediaFrame } from "@/components/media/MediaFrame";
import { cn } from "@/lib/cn";

export function Pillars() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
        {pillars.map((pillar, i) => (
          <article
            key={pillar.id}
            className={cn(
              "group relative min-h-[380px] overflow-hidden border-t border-line md:min-h-[460px]",
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
            <div className="relative z-10 flex h-full flex-col justify-end px-5 py-12 md:px-8 md:py-16">
              <p className="meta text-muted group-hover:text-mist">0{i + 1}</p>
              <h3 className="display mt-6 text-[clamp(2rem,4vw,3.6rem)] text-ink transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-paper">
                {pillar.label}
              </h3>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted group-hover:text-paper/85">
                {pillar.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
