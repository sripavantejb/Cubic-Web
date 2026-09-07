"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { about } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaFrame } from "@/components/media/MediaFrame";
import { cn } from "@/lib/cn";

export function AboutTabs() {
  const [active, setActive] = useState<(typeof about.tabs)[number]["id"]>(about.tabs[0].id);
  const current = about.tabs.find((t) => t.id === active) ?? about.tabs[0];

  return (
    <section id="about" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading eyebrow={about.eyebrow} heading={about.heading} lede={about.lede} />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
          <div role="tablist" aria-label="About Hazel" className="flex flex-col">
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
                    "flex items-baseline justify-between border-t border-line py-5 text-left transition-colors",
                    selected ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span className="meta">{tab.num}</span>
                  <span className="display text-[clamp(2rem,4vw,3.4rem)]">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-6">
            <div className="relative min-h-[280px] overflow-hidden md:min-h-[380px]">
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
            <div className="grid grid-cols-3 gap-2">
              {current.images.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden">
                  <MediaFrame src={src} alt="" className="absolute inset-0 h-full" sizes="20vw" reveal={false} />
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-copy"}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                role="tabpanel"
              >
                <p className="meta text-leaf">
                  {current.num} / {current.label}
                </p>
                <h3 className="display mt-4 max-w-[18ch] text-[clamp(1.8rem,3.4vw,3rem)]">
                  {current.title}
                </h3>
                <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">{current.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
