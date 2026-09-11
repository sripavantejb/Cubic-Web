"use client";

import Image from "next/image";
import { problem } from "@/content/site";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

export function ProblemAgitation() {
  return (
    <section id="problem" className="section-x section-y bg-paper">
      <div className="mx-auto max-w-[1440px]">
        <FadeContent>
          <p className="meta text-leaf">{problem.eyebrow}</p>
        </FadeContent>
        <BlurText
          as="h2"
          text={problem.heading}
          className="mt-3 max-w-[18ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink"
        />
        <FadeContent delay={0.12} className="mt-5">
          <p className="max-w-[46rem] text-[16px] leading-relaxed text-muted md:text-[18px]">
            {problem.body}
          </p>
        </FadeContent>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {problem.pains.map((pain, i) => (
            <AnimatedContent key={pain.title} delay={i * 0.08} distance={36}>
              <li className="overflow-hidden rounded-[20px] bg-white ring-1 ring-hero-ink/8">
                <div className="relative aspect-[4/3] bg-mint">
                  <Image
                    src={pain.image}
                    alt={pain.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-[15px] font-semibold tracking-tight text-hero-ink">
                    {pain.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{pain.text}</p>
                </div>
              </li>
            </AnimatedContent>
          ))}
        </ul>

        <FadeContent delay={0.1} className="mt-10 md:mt-14">
          <p className="max-w-[40rem] border-l-2 border-leaf pl-4 text-[16px] leading-relaxed font-medium text-hero-ink md:text-[18px]">
            {problem.transition}
          </p>
        </FadeContent>
      </div>
    </section>
  );
}
