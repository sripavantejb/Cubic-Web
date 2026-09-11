"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/content/site";
import { cn } from "@/lib/cn";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";

export function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section-x section-y bg-paper">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <FadeContent>
            <p className="meta text-leaf">{faq.eyebrow}</p>
          </FadeContent>
          <BlurText
            as="h2"
            text={faq.heading}
            className="mt-3 max-w-[12ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink"
          />
        </div>

        <FadeContent delay={0.08}>
          <div className="divide-y divide-hero-ink/10 border-y border-hero-ink/10">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <AnimatedContent key={item.q} delay={i * 0.04} distance={20} duration={0.55}>
                  <div>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-[16px] font-semibold tracking-tight text-hero-ink md:text-[17px]">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-1 size-4 shrink-0 text-hero-ink/40 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 text-[15px] leading-relaxed text-muted">{item.a}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedContent>
              );
            })}
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
