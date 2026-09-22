"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/content/site";
import { cn } from "@/lib/cn";
import { MediaFrame } from "@/components/media/MediaFrame";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section-x bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[40rem]">
          <FadeContent>
            <p className="meta text-leaf">{faq.eyebrow}</p>
          </FadeContent>
          <BlurText
            as="h2"
            text={faq.heading}
            className="mt-3 text-[clamp(1.7rem,3.4vw,2.65rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-hero-ink"
          />
        </div>

        <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-16">
          <FadeContent delay={0.08} className="hidden lg:block lg:sticky lg:top-28">
            <MediaFrame
              src={faq.image}
              alt={faq.alt}
              className="aspect-[5/6] max-h-[560px] rounded-[20px] md:rounded-[22px]"
              sizes="(min-width: 1024px) 38vw, 100vw"
              kenBurns
            />
          </FadeContent>

          <FadeContent delay={0.1}>
            <div className="border-t border-hero-ink/10">
              {faq.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <AnimatedContent
                    key={item.q}
                    delay={i * 0.03}
                    distance={16}
                    duration={0.5}
                  >
                    <div className="border-b border-hero-ink/10">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full items-center justify-between gap-5 py-4 text-left md:py-[1.15rem]"
                      >
                        <span className="pr-2 text-[15px] leading-snug font-semibold tracking-tight text-hero-ink md:text-[16px]">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={cn(
                            "size-4 shrink-0 text-hero-ink/35 transition-transform duration-200",
                            isOpen && "rotate-180 text-leaf",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-out",
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-[40rem] pb-4 text-[14px] leading-relaxed text-muted md:pb-5 md:text-[15px]">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedContent>
                );
              })}
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
