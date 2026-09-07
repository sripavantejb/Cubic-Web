"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Leaf, Recycle, Shield, Sparkles, Wrench } from "lucide-react";
import { services } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const icons = { Sparkles, Wrench, Leaf, Recycle, Shield, Activity } as const;

export function ServicesExplorer() {
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);
  const current = services.items[active];
  const Icon = icons[current.icon as keyof typeof icons];
  const gallery = current.images;

  return (
    <section id="services" className="bg-charcoal text-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <SectionHeading light eyebrow={services.eyebrow} heading={services.heading} lede={services.lede} />

        <div className="mt-16 hidden gap-12 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <ul>
            {services.items.map((item, i) => (
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
                    "flex w-full items-center justify-between border-t border-white/10 py-6 text-left transition-colors",
                    i === active ? "text-paper" : "text-paper/45 hover:text-paper/80",
                  )}
                >
                  <span className="meta">{item.num}</span>
                  <span className="display text-[clamp(1.6rem,2.6vw,2.4rem)]">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative min-h-[560px] overflow-hidden">
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
                  src={gallery[shot] ?? current.image}
                  alt={current.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <Icon className="mb-4 size-6 text-mist" />
                  <p className="max-w-md text-[17px] leading-relaxed text-paper/90">{current.text}</p>
                  <div className="mt-6 flex gap-2">
                    {gallery.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setShot(i)}
                        className={cn(
                          "relative h-14 w-20 overflow-hidden border",
                          i === shot ? "border-lime" : "border-white/20",
                        )}
                        aria-label={`View image ${i + 1}`}
                      >
                        <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 divide-y divide-white/10 lg:hidden">
          {services.items.map((item, i) => {
            const ItemIcon = icons[item.icon as keyof typeof icons];
            const open = i === active;
            return (
              <div key={item.title}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-5 text-left"
                  aria-expanded={open}
                  onClick={() => setActive(i)}
                >
                  <span className="display text-[1.5rem]">{item.title}</span>
                  <span className="meta text-mist">{item.num}</span>
                </button>
                <AnimatePresence>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="relative mb-3 h-48 overflow-hidden">
                        <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="100vw" />
                      </div>
                      <div className="mb-4 grid grid-cols-3 gap-2">
                        {item.images.slice(1).map((src) => (
                          <div key={src} className="relative aspect-[4/3] overflow-hidden">
                            <Image src={src} alt="" fill className="object-cover" sizes="30vw" />
                          </div>
                        ))}
                      </div>
                      <p className="pb-6 text-[16px] text-paper/80">
                        <ItemIcon className="mb-3 size-5 text-mist" />
                        {item.text}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
