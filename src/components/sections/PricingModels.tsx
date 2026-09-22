"use client";

import Image from "next/image";
import { pricing } from "@/content/site";
import { cn } from "@/lib/cn";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

export function PricingModels() {
  return (
    <section id="pricing" className="section-x bg-mint-2 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14 xl:gap-20">
          <div className="min-w-0 lg:pt-1">
            <FadeContent>
              <p className="meta text-leaf">{pricing.eyebrow}</p>
            </FadeContent>
            <BlurText
              as="h2"
              text={pricing.heading}
              className="mt-3 max-w-[15ch] text-[clamp(1.7rem,3.4vw,2.65rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-hero-ink"
            />
            <FadeContent delay={0.08} className="mt-4">
              <p className="max-w-[34rem] text-[15px] leading-relaxed text-muted md:text-[16px]">
                {pricing.lede}
              </p>
            </FadeContent>

            <ul className="mt-9 max-w-[32rem] border-t border-hero-ink/10">
              {pricing.promises.map((item, i) => (
                <AnimatedContent key={item.title} delay={0.1 + i * 0.05} distance={20}>
                  <li className="grid grid-cols-[2.25rem_1fr] gap-x-3 border-b border-hero-ink/10 py-4 md:py-[1.15rem]">
                    <span className="pt-0.5 font-mono text-[11px] tracking-[0.14em] text-leaf/75">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[15px] leading-snug font-semibold tracking-tight text-hero-ink">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-muted md:text-[14px]">
                        {item.text}
                      </p>
                    </div>
                  </li>
                </AnimatedContent>
              ))}
            </ul>
          </div>

          <FadeContent delay={0.1} className="lg:sticky lg:top-28">
            <div className="relative mx-auto aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-[20px] bg-mint md:rounded-[24px] lg:max-h-none lg:aspect-[5/6]">
              <Image
                src={pricing.image}
                alt={pricing.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeContent>
        </div>

        <div className="mt-14 border-t border-hero-ink/10 pt-10 md:mt-16 md:pt-12">
          <FadeContent>
            <p className="meta text-leaf">Engagement models</p>
            <p className="mt-2 max-w-[40rem] text-[14px] leading-relaxed text-muted md:text-[15px]">
              Two clear ways to work with Hazel — both start with a free facility audit.
            </p>
          </FadeContent>

          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:gap-5">
            {pricing.models.map((model, i) => {
              const featured = "featured" in model && model.featured;
              return (
                <AnimatedContent key={model.id} delay={i * 0.06} distance={24}>
                  <li
                    className={cn(
                      "flex h-full overflow-hidden rounded-[18px] bg-white ring-1 ring-hero-ink/8",
                      featured && "ring-1 ring-sun/70",
                    )}
                  >
                    <div className="relative w-[120px] shrink-0 self-stretch bg-mint sm:w-[140px]">
                      <Image
                        src={model.image}
                        alt={model.alt}
                        fill
                        sizes="140px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 sm:px-5 sm:py-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[15px] font-semibold tracking-tight text-hero-ink sm:text-[16px]">
                          {model.title}
                        </h3>
                        {featured ? (
                          <span className="rounded-full bg-sun px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-hero-ink uppercase">
                            Popular
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-[13.5px]">
                        {model.text}
                      </p>
                      <p className="mt-3 text-[10px] font-medium tracking-[0.12em] text-leaf uppercase sm:text-[11px]">
                        Best for: {model.bestFor}
                      </p>
                    </div>
                  </li>
                </AnimatedContent>
              );
            })}
          </ul>

          <FadeContent delay={0.12} className="mt-7 md:mt-8">
            <p className="max-w-[42rem] text-[13.5px] leading-relaxed text-muted md:text-[14px]">
              {pricing.footnote}
            </p>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
