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
              "group relative min-h-[20rem] overflow-hidden border-t border-line sm:min-h-[380px] md:min-h-[460px]",
              i % 2 === 1 && "md:border-l",
            )}
          >
            <MediaFrame
              src={pillar.image}
              alt={pillar.alt}
              className="absolute inset-0 h-full opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100"
              sizes="(min-width: 768px) 50vw, 100vw"
              reveal={false}
              kenBurns
            />
            <div className="absolute inset-0 bg-ink/60 transition-colors duration-500 lg:bg-paper lg:group-hover:bg-ink/70" />
            <div className="relative z-10 flex h-full flex-col justify-end py-10 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:py-16">
              <p className="meta text-mist lg:text-muted lg:group-hover:text-mist">0{i + 1}</p>
              <h3 className="display mt-4 text-[clamp(1.7rem,7vw,3.6rem)] text-paper transition-transform duration-500 lg:mt-6 lg:text-ink lg:group-hover:-translate-y-1 lg:group-hover:text-paper">
                {pillar.label}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/85 md:mt-5 md:text-[16px] lg:text-muted lg:group-hover:text-paper/85">
                {pillar.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
