"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { machinery } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function MachineryExplorer() {
  const [active, setActive] = useState(0);
  const current = machinery.items[active];

  return (
    <SectionFrame id="machinery" className="bg-paper">
      <SectionHeading eyebrow={machinery.eyebrow} heading={machinery.heading} lede={machinery.lede} />

      <div className="mt-5 grid min-h-0 flex-1 gap-8 lg:grid-cols-[0.38fr_1fr] lg:gap-12">
        <ul className="flex min-h-0 flex-col justify-center overflow-y-auto">
          {machinery.items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "w-full border-t border-line py-2.5 text-left text-[14px] transition-colors md:text-[15px]",
                  i === active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid min-h-0 gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center"
          >
            <div className="flex min-h-0 flex-col">
              <div className="relative min-h-[160px] flex-1 overflow-hidden bg-ink">
                <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {current.images.map((src) => (
                  <div key={src} className="relative aspect-[16/10] overflow-hidden">
                    <Image src={src} alt="" fill className="object-cover" sizes="15vw" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="display text-[clamp(2.2rem,4vw,3.4rem)] leading-none">{current.metric}</p>
              <p className="meta mt-2 text-leaf">{current.metricLabel}</p>
              <h3 className="mt-5 text-[18px] font-medium">{current.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted md:text-[15px]">{current.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionFrame>
  );
}
