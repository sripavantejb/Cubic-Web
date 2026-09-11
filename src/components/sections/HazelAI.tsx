"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hazelAI } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DashboardPreview } from "@/components/visuals/DashboardPreview";
import { MediaFrame } from "@/components/media/MediaFrame";
import { AnimatedContent, FadeContent } from "@/components/react-bits";
import { cn } from "@/lib/cn";

export function HazelAI() {
  const [active, setActive] = useState(0);
  const current = hazelAI.states[active];

  return (
    <section id="ai" className="relative overflow-hidden bg-charcoal text-paper">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <MediaFrame
              src={current.image}
              alt=""
              className="absolute inset-0 h-full"
              sizes="100vw"
              reveal={false}
              kenBurns
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-charcoal/75" />
      </div>
      <div className="section-x section-y relative mx-auto grid max-w-[1440px] gap-8 md:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <AnimatedContent distance={36} direction="horizontal">
          <div>
            <SectionHeading light eyebrow={hazelAI.eyebrow} heading={hazelAI.heading} lede={hazelAI.lede} />
            <p className="mt-5 max-w-xl rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-[13.5px] leading-relaxed text-mist/90">
              {hazelAI.honesty}
            </p>
            <div className="mt-8 space-y-2 md:mt-10" role="tablist" aria-label="HazelAI modes">
              {hazelAI.states.map((state, i) => (
                <button
                  key={state.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={cn(
                    "block w-full border-t border-white/10 py-4 text-left transition-colors",
                    i === active ? "text-paper" : "text-paper/45 hover:text-paper/80",
                  )}
                >
                  <span className="meta text-mist">
                    {state.num} / {state.label}
                  </span>
                  <span className="mt-1 block text-[18px] font-medium">{state.title}</span>
                </button>
              ))}
            </div>
            <p className="mt-8 max-w-md text-[16px] leading-relaxed text-mist/90">{current.text}</p>
            <ul className="mt-5 space-y-3 text-[14px] text-paper/70">
              {current.items.map((item) => {
                const status = item.status as "live" | "roadmap";
                return (
                  <li key={item.text} className="flex items-start justify-between gap-3">
                    <span className="min-w-0">— {item.text}</span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase",
                        status === "live" ? "bg-sprout/20 text-mist" : "bg-white/8 text-paper/45",
                      )}
                    >
                      {status === "live" ? "Live" : "Roadmap"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </AnimatedContent>
        <FadeContent delay={0.15} blur>
          <DashboardPreview mode={current.id} />
        </FadeContent>
      </div>
    </section>
  );
}
