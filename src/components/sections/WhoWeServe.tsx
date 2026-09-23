"use client";

import Image from "next/image";
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

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-6">
          {whoWeServe.items.map((item, i) => (
            <AnimatedContent key={item.title} delay={i * 0.05} distance={28}>
              <li className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white ring-1 ring-hero-ink/8">
                <div className="relative aspect-[4/3] overflow-hidden bg-mint">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/92 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-hero-ink/55 backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
                  <h3 className="text-[16px] leading-snug font-semibold tracking-tight text-hero-ink md:text-[17px]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{item.text}</p>
                </div>
              </li>
            </AnimatedContent>
          ))}
        </ul>
      </div>
    </section>
  );
}
