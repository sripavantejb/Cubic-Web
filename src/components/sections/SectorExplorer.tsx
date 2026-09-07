"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { sectors } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function SectorExplorer() {
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);
  const current = sectors.items[active];

  return (
    <SectionFrame id="sectors" className="bg-charcoal text-paper">
      <SectionHeading light eyebrow={sectors.eyebrow} heading={sectors.heading} lede={sectors.lede} />
      <div className="mt-5 grid min-h-0 flex-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ul className="flex min-h-0 flex-col justify-center overflow-y-auto">
          {sectors.items.map((item, i) => (
            <li key={item.title}>
              <button
                type="button"
                onMouseEnter={() => {
                  setActive(i);
                  setShot(0);
                }}
                onFocus={() => {
                  setActive(i);
                  setShot(0);
                }}
                onClick={() => {
                  setActive(i);
                  setShot(0);
                }}
                className={cn(
                  "flex w-full items-baseline justify-between gap-4 border-t border-white/10 py-3 text-left",
                  i === active ? "text-paper" : "text-paper/40 hover:text-paper/75",
                )}
              >
                <span className="text-[15px] font-medium md:text-[18px]">{item.title}</span>
                <span className="meta shrink-0 text-mist">{item.tag}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="relative min-h-[220px] overflow-hidden lg:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.title}-${shot}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.images[shot] ?? current.image}
                alt={current.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="text-[14px] leading-relaxed text-paper/90">{current.text}</p>
                <div className="mt-4 flex gap-2">
                  {current.images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setShot(i)}
                      className={cn(
                        "relative h-10 w-14 overflow-hidden border",
                        i === shot ? "border-lime" : "border-white/20",
                      )}
                      aria-label={`View ${current.title} image ${i + 1}`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionFrame>
  );
}
