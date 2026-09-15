"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { hazelAI } from "@/content/site";
import { DashboardPreview } from "@/components/visuals/DashboardPreview";
import { AnimatedContent, BlurText, FadeContent } from "@/components/react-bits";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function HazelAI() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const current = hazelAI.states[active];

  useGSAP(
    () => {
      if (reduced || !root.current) return;

      gsap.from(".ai-panel", {
        y: 28,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      gsap.from(".ai-mode", {
        x: -16,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ai-modes", start: "top 80%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="ai"
      ref={root}
      className="relative overflow-hidden bg-mint-2"
      aria-labelledby="ai-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,197,66,0.14),_transparent_42%),radial-gradient(ellipse_at_bottom_left,_rgba(47,125,79,0.12),_transparent_46%)]"
        aria-hidden="true"
      />

      <div className="section-x section-y relative mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <div>
            <FadeContent>
              <p className="meta text-leaf">{hazelAI.eyebrow}</p>
            </FadeContent>
            <h2 id="ai-heading" className="mt-3">
              <BlurText
                as="span"
                text={hazelAI.heading}
                className="block max-w-[18ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink"
              />
            </h2>
            <FadeContent delay={0.1} className="mt-5">
              <p className="max-w-[36rem] text-[16px] leading-relaxed text-muted md:text-[17px]">
                {hazelAI.lede}
              </p>
            </FadeContent>

            <FadeContent delay={0.16} className="mt-6">
              <p className="max-w-xl border-l-2 border-sun pl-4 text-[13.5px] leading-relaxed text-hero-ink/75 md:text-[14px]">
                {hazelAI.honesty}
              </p>
            </FadeContent>

            <div className="ai-modes mt-9 space-y-1 md:mt-11" role="tablist" aria-label="HazelAI modes">
              {hazelAI.states.map((state, i) => {
                const selected = i === active;
                return (
                  <button
                    key={state.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className={cn(
                      "ai-mode group relative block w-full overflow-hidden rounded-[16px] px-4 py-4 text-left transition-colors duration-300 md:px-5",
                      selected
                        ? "bg-white text-hero-ink shadow-[0_16px_40px_-24px_rgba(17,35,27,0.35)] ring-1 ring-hero-ink/8"
                        : "text-hero-ink/55 hover:bg-white/55 hover:text-hero-ink",
                    )}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="ai-mode-accent"
                        className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-sun"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="meta text-leaf/80">
                      {state.num} / {state.label}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-[17px] font-semibold tracking-tight md:text-[18px]",
                        selected ? "text-hero-ink" : "text-inherit",
                      )}
                    >
                      {state.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="mt-7"
              >
                <p className="max-w-md text-[15px] leading-relaxed text-muted md:text-[16px]">
                  {current.text}
                </p>
                <ul className="mt-5 space-y-3">
                  {current.items.map((item, i) => {
                    const status = item.status as "live" | "roadmap";
                    return (
                      <motion.li
                        key={item.text}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05, ease }}
                        className="flex items-start justify-between gap-3 border-t border-hero-ink/8 pt-3 text-[14px] text-hero-ink/80"
                      >
                        <span className="min-w-0">{item.text}</span>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase",
                            status === "live"
                              ? "bg-leaf-soft text-leaf"
                              : "bg-hero-ink/5 text-hero-ink/45",
                          )}
                        >
                          {status === "live" ? "Live" : "Roadmap"}
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="ai-panel space-y-5 lg:sticky lg:top-28">
            <AnimatedContent distance={40} delay={0.08}>
              <div className="relative aspect-[16/11] overflow-hidden rounded-[24px] bg-mint">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.image}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.image}
                      alt={current.alt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-hero-ink/35 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-sun text-[10px] font-semibold text-hero-ink">
                    HI
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-hero-ink backdrop-blur-sm">
                    {current.label}
                  </span>
                </div>
              </div>
            </AnimatedContent>

            <FadeContent delay={0.18}>
              <DashboardPreview mode={current.id} />
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  );
}
