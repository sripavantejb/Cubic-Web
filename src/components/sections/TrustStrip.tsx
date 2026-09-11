"use client";

import { trustStrip } from "@/content/site";
import { MediaFrame } from "@/components/media/MediaFrame";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

export function TrustStrip() {
  return (
    <section id="trust" className="section-x section-y bg-mint-2">
      <div className="mx-auto max-w-[1440px]">
        <FadeContent>
          <p className="meta text-leaf">{trustStrip.eyebrow}</p>
        </FadeContent>
        <BlurText
          as="h2"
          text={trustStrip.heading}
          className="mt-3 max-w-[18ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink"
        />

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:items-stretch">
          <AnimatedContent distance={40}>
            <MediaFrame
              src={trustStrip.image}
              alt={trustStrip.alt}
              className="min-h-[280px] h-full rounded-[24px] md:min-h-[360px]"
              sizes="(min-width: 1024px) 42vw, 100vw"
              kenBurns
            />
          </AnimatedContent>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <AnimatedContent distance={40} delay={0.08}>
              <div className="flex h-full flex-col rounded-[24px] bg-white p-6 ring-1 ring-hero-ink/8 md:p-7">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-leaf uppercase">
                  {trustStrip.today.label}
                </p>
                <ul className="mt-6 space-y-6">
                  {trustStrip.today.items.map((item) => (
                    <li key={item.label} className="border-t border-hero-ink/8 pt-5 first:border-0 first:pt-0">
                      <p className="text-[28px] leading-none font-semibold tracking-tight text-hero-ink md:text-[32px]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-[15px] font-medium text-hero-ink/80">{item.label}</p>
                      {"note" in item && item.note ? (
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{item.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={40} delay={0.14}>
              <div className="flex h-full flex-col rounded-[24px] bg-moss p-6 text-paper md:p-7">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-mist uppercase">
                  {trustStrip.ahead.label}
                </p>
                <ul className="mt-6 space-y-6">
                  {trustStrip.ahead.items.map((item) => (
                    <li key={item.label} className="border-t border-white/12 pt-5 first:border-0 first:pt-0">
                      <p className="text-[28px] leading-none font-semibold tracking-tight md:text-[32px]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-[15px] text-paper/75">{item.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
}
