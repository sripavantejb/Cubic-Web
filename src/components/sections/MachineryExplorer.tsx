"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { machinery } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function MachineryExplorer() {
  const [active, setActive] = useState(0);
  const current = machinery.items[active];

  return (
    <section id="machinery" className="bg-paper px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading eyebrow={machinery.eyebrow} heading={machinery.heading} lede={machinery.lede} />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.4fr_1fr] lg:gap-16">
          <ul className="lg:pt-4">
            {machinery.items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full border-t border-line py-4 text-left text-[16px] transition-colors",
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center"
            >
              <div>
                <div className="relative aspect-[5/4] overflow-hidden bg-ink">
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
                    <div key={src} className="relative aspect-[4/3] overflow-hidden">
                      <Image src={src} alt="" fill className="object-cover" sizes="15vw" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="display text-[clamp(2.6rem,5vw,4.4rem)] leading-none">{current.metric}</p>
                <p className="meta mt-3 text-leaf">{current.metricLabel}</p>
                <h3 className="mt-8 text-[22px] font-medium">{current.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{current.text}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
