"use client";

import { useState } from "react";
import { pledge } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { MediaFrame } from "@/components/media/MediaFrame";
import { useApp } from "@/components/providers/AppProviders";

export function GreenPledge() {
  const { scrollTo } = useApp();
  const [active, setActive] = useState(0);

  return (
    <SectionFrame id="pledge" className="bg-paper">
      <div className="grid min-h-0 flex-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="meta text-leaf">{pledge.eyebrow}</p>
          <h2 className="display mt-3 max-w-[14ch] text-[clamp(1.6rem,3.6vw,2.8rem)]">{pledge.heading}</h2>
          <ol className="mt-6">
            {pledge.items.map((item, i) => (
              <li key={item.label}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="flex w-full items-baseline justify-between gap-6 border-t border-line py-3.5 text-left"
                >
                  <span className="meta text-muted">0{i + 1}</span>
                  <span className="display flex-1 text-[clamp(1.2rem,2.4vw,2rem)]">{item.label}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Button
              href={pledge.cta.href}
              magnetic
              onClick={(e) => {
                e.preventDefault();
                scrollTo(pledge.cta.href);
              }}
            >
              {pledge.cta.label}
            </Button>
          </div>
        </div>
        <div className="relative hidden min-h-0 self-stretch overflow-hidden lg:block">
          {pledge.items.map((item, i) => (
            <div
              key={item.image}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <MediaFrame
                src={item.image}
                alt={item.alt}
                className="absolute inset-0 h-full"
                sizes="45vw"
                reveal={false}
                kenBurns
              />
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
