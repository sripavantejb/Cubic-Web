"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hazelAI } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DashboardPreview } from "@/components/visuals/DashboardPreview";
import { MediaFrame } from "@/components/media/MediaFrame";
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
        <div>
          <SectionHeading light eyebrow={hazelAI.eyebrow} heading={hazelAI.heading} lede={hazelAI.lede} />
          <div className="mt-8 space-y-2 md:mt-12" role="tablist" aria-label="HazelAI modes">
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
          <ul className="mt-5 space-y-2 text-[14px] text-paper/70">
            {current.items.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
        <DashboardPreview mode={current.id} />
      </div>
    </section>
  );
}
