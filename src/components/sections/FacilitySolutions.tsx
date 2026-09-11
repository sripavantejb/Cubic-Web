"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "@/content/site";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

/**
 * Follows the pinned hero. Its negative top margin lets the sheet rise over the film's
 * final frame as the pin releases (dropped for reduced motion, where the hero isn't pinned).
 */
export function FacilitySolutions() {
  return (
    <section
      id="solutions"
      aria-labelledby="solutions-title"
      className="relative z-10 -mt-[12svh] rounded-t-[28px] bg-white shadow-[0_-18px_50px_-24px_rgba(14,26,18,0.35)] motion-reduce:mt-0 md:rounded-t-[44px]"
    >
      <div className="section-x mx-auto max-w-[1440px] pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div>
            <FadeContent>
              <p className="meta text-leaf">{solutions.eyebrow}</p>
            </FadeContent>
            <h2
              id="solutions-title"
              className="mt-3 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-hero-ink md:mt-5"
            >
              <BlurText as="span" text={solutions.heading} className="block" />
              <BlurText
                as="span"
                text={solutions.headingAccent}
                delay={60}
                className="block text-hero-ink/40"
              />
            </h2>
          </div>
          <FadeContent delay={0.12}>
            <p className="max-w-xl text-[15px] leading-relaxed text-muted md:text-[17px]">
              {solutions.lede}
            </p>
          </FadeContent>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-6">
          {solutions.items.map((item, i) => (
            <AnimatedContent key={item.title} delay={i * 0.06} distance={32}>
              <li>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col outline-offset-4"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-mint">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/92 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-hero-ink/55 backdrop-blur-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[16px] leading-snug font-semibold tracking-tight text-hero-ink transition-colors group-hover:text-leaf md:text-[17px]">
                        {item.title}
                      </h3>
                      <ArrowUpRight
                        className="mt-0.5 size-4 shrink-0 text-hero-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-leaf"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </Link>
              </li>
            </AnimatedContent>
          ))}
        </ul>
      </div>
    </section>
  );
}
