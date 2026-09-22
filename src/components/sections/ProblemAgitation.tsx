"use client";

import Image from "next/image";
import { problem } from "@/content/site";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

export function ProblemAgitation() {
  return (
    <section id="problem" className="section-x bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[46rem]">
          <FadeContent>
            <p className="meta text-leaf">{problem.eyebrow}</p>
          </FadeContent>
          <BlurText
            as="h2"
            text={problem.heading}
            className="mt-3 text-[clamp(1.7rem,3.4vw,2.65rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-hero-ink"
          />
          <FadeContent delay={0.1} className="mt-4">
            <p className="text-[15px] leading-relaxed text-muted md:text-[16px]">
              {problem.body}
            </p>
          </FadeContent>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {problem.pains.map((pain, i) => (
            <AnimatedContent key={pain.title} delay={i * 0.06} distance={28}>
              <li className="flex h-full flex-col overflow-hidden rounded-[18px] bg-white ring-1 ring-hero-ink/8">
                <div className="relative aspect-[16/11] bg-mint">
                  <Image
                    src={pain.image}
                    alt={pain.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-leaf/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[15px] leading-snug font-semibold tracking-tight text-hero-ink md:text-[16px]">
                    {pain.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted md:text-[14px]">
                    {pain.text}
                  </p>
                </div>
              </li>
            </AnimatedContent>
          ))}
        </ul>

        <FadeContent delay={0.12} className="mt-10 md:mt-12">
          <p className="max-w-[38rem] border-l-2 border-leaf pl-4 text-[15px] leading-relaxed font-medium text-hero-ink md:pl-5 md:text-[16px]">
            {problem.transition}
          </p>
        </FadeContent>
      </div>
    </section>
  );
}
