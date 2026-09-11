"use client";

import Image from "next/image";
import { pricing } from "@/content/site";
import { cn } from "@/lib/cn";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

export function PricingModels() {
  return (
    <section id="pricing" className="section-x section-y bg-mint-2">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-14">
          <div>
            <FadeContent>
              <p className="meta text-leaf">{pricing.eyebrow}</p>
            </FadeContent>
            <BlurText
              as="h2"
              text={pricing.heading}
              className="mt-3 max-w-[16ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink"
            />
          </div>
          <FadeContent delay={0.1} className="hidden lg:block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-mint">
              <Image
                src={pricing.image}
                alt={pricing.alt}
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </FadeContent>
        </div>

        <ul className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-3">
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
