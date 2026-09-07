"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hazelAI } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DashboardPreview } from "@/components/visuals/DashboardPreview";
import { MediaFrame } from "@/components/media/MediaFrame";
import { cn } from "@/lib/cn";

export function HazelAI() {
  const [active, setActive] = useState(0);
  const current = hazelAI.states[active];

  return (
    <SectionFrame
      id="ai"
      className="overflow-hidden bg-charcoal text-paper"
      backdrop={
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
      }
    >
      <div className="relative grid min-h-0 flex-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="min-h-0">
          <SectionHeading light eyebrow={hazelAI.eyebrow} heading={hazelAI.heading} lede={hazelAI.lede} />
          <div className="mt-5 space-y-0" role="tablist" aria-label="HazelAI modes">
            {hazelAI.states.map((state, i) => (
              <button
                key={state.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "block w-full border-t border-white/10 py-2.5 text-left transition-colors",
                  i === active ? "text-paper" : "text-paper/45 hover:text-paper/80",
                )}
              >
                <span className="meta text-mist">
                  {state.num} / {state.label}
                </span>
                <span className="mt-0.5 block text-[15px] font-medium">{state.title}</span>
              </button>
            ))}
          </div>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-mist/90">{current.text}</p>
        </div>
        <div className="min-h-0 overflow-hidden">
          <DashboardPreview mode={current.id} />
        </div>
      </div>
    </SectionFrame>
  );
}
