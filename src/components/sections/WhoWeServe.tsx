"use client";

import { whoWeServe } from "@/content/site";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

export function WhoWeServe() {
  return (
    <section
      id="sectors"
      aria-labelledby="sectors-title"
      className="section-x bg-mint-2 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div>
            <FadeContent>
              <p className="meta text-leaf">{whoWeServe.eyebrow}</p>
            </FadeContent>
            <h2
              id="sectors-title"
              className="mt-3 max-w-[16ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink"
            >
              <BlurText as="span" text={whoWeServe.heading} />
            </h2>
          </div>
          <FadeContent delay={0.1}>
            <p className="max-w-xl text-[15px] leading-relaxed text-muted md:text-[17px]">
              {whoWeServe.lede}
            </p>
          </FadeContent>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-0 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {whoWeServe.items.map((item, i) => (
            <AnimatedContent key={item.title} delay={i * 0.05} distance={24}>
              <li className="border-t border-hero-ink/10 py-6 md:py-7">
                <span className="font-mono text-[11px] tracking-[0.14em] text-leaf/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[18px] leading-snug font-semibold tracking-tight text-hero-ink md:text-[20px]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[32ch] text-[14px] leading-relaxed text-muted md:text-[15px]">
                  {item.text}
                </p>
              </li>
            </AnimatedContent>
          ))}
        </ul>
      </div>
    </section>
  );
}
