"use client";

import Image from "next/image";
import { pricing } from "@/content/site";
import { cn } from "@/lib/cn";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

export function PricingModels() {
  return (
    <section id="pricing" className="section-x section-y bg-mint-2">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <FadeContent>
              <p className="meta text-leaf">{pricing.eyebrow}</p>
            </FadeContent>
            <BlurText
              as="h2"
              text={pricing.heading}
              className="mt-3 max-w-[16ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink"
            />
            <FadeContent delay={0.08} className="mt-5">
              <p className="max-w-[36rem] text-[16px] leading-relaxed text-muted md:text-[17px]">
                {pricing.lede}
              </p>
            </FadeContent>

            <ul className="mt-8 max-w-[34rem] border-t border-hero-ink/10">
              {pricing.promises.map((item, i) => (
                <AnimatedContent key={item.title} delay={0.1 + i * 0.06} distance={24}>
                  <li className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-hero-ink/10 py-5">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-leaf/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold tracking-tight text-hero-ink md:text-[16px]">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{item.text}</p>
                    </div>
                  </li>
                </AnimatedContent>
              ))}
            </ul>
          </div>

          <FadeContent delay={0.12} className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-mint sm:aspect-[5/6] lg:aspect-[4/5]">
              <Image
                src={pricing.image}
                alt={pricing.alt}
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeContent>
        </div>

        <ul className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {pricing.models.map((model, i) => (
            <AnimatedContent key={model.id} delay={i * 0.1} distance={40} scale={0.98}>
              <li
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-[24px]",
                  "featured" in model && model.featured
                    ? "bg-moss text-paper shadow-[0_18px_40px_-20px_rgba(14,26,18,0.35)]"
                    : "bg-white text-hero-ink ring-1 ring-hero-ink/8",
                )}
              >
                <div className="relative aspect-[16/10] bg-mint">
                  <Image
                    src={model.image}
                    alt={model.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                  {"featured" in model && model.featured ? (
                    <div className="absolute inset-0 bg-moss/25" aria-hidden="true" />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="text-[20px] font-semibold tracking-tight">{model.title}</h3>
                  <p
                    className={cn(
                      "mt-3 flex-1 text-[14px] leading-relaxed md:text-[15px]",
                      "featured" in model && model.featured ? "text-paper/75" : "text-muted",
                    )}
                  >
                    {model.text}
                  </p>
                  <p
                    className={cn(
                      "mt-6 border-t pt-4 text-[12px] font-medium tracking-wide uppercase",
                      "featured" in model && model.featured
                        ? "border-white/15 text-mist"
                        : "border-hero-ink/10 text-leaf",
                    )}
                  >
                    Best for: {model.bestFor}
                  </p>
                </div>
              </li>
            </AnimatedContent>
          ))}
        </ul>

        <FadeContent delay={0.2} className="mt-8">
          <p className="max-w-[44rem] text-[14px] leading-relaxed text-muted md:text-[15px]">
            {pricing.footnote}
          </p>
        </FadeContent>
      </div>
    </section>
  );
}
