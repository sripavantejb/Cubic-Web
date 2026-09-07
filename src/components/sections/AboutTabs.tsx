"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { about } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/media/MediaFrame";
import { cn } from "@/lib/cn";

export function AboutTabs() {
  const [active, setActive] = useState<(typeof about.tabs)[number]["id"]>(about.tabs[0].id);
  const current = about.tabs.find((t) => t.id === active) ?? about.tabs[0];

  return (
    <SectionFrame id="about" className="bg-paper">
      <SectionHeading eyebrow={about.eyebrow} heading={about.heading} lede={about.lede} />

      <div className="mt-6 grid min-h-0 flex-1 gap-8 lg:grid-cols-[0.38fr_1fr] lg:gap-14">
        <div role="tablist" aria-label="About Hazel" className="flex flex-col justify-center">
          {about.tabs.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "flex items-baseline justify-between border-t border-line py-3.5 text-left transition-colors",
                  selected ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                <span className="meta">{tab.num}</span>
                <span className="display text-[clamp(1.6rem,3vw,2.6rem)]">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid min-h-0 grid-rows-[1fr_auto] gap-4">
          <div className="relative min-h-[180px] overflow-hidden lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <MediaFrame
                  src={current.image}
                  alt={current.alt}
                  className="absolute inset-0 h-full w-full"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  reveal={false}
                  kenBurns
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-copy"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              role="tabpanel"
            >
              <p className="meta text-leaf">
                {current.num} / {current.label}
              </p>
              <h3 className="display mt-2 max-w-[22ch] text-[clamp(1.35rem,2.2vw,1.9rem)]">
                {current.title}
              </h3>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted lg:text-[15px]">
                {current.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionFrame>
  );
}
