"use client";

import { AnimatePresence, motion } from "framer-motion";
import { hazelAI } from "@/content/site";
import { cn } from "@/lib/cn";

type Mode = (typeof hazelAI.states)[number]["id"];

const panels: Record<Mode, { label: string; value: string; unit: string }[]> = {
  predict: [
    { label: "Occupancy", value: "72", unit: "%" },
    { label: "Footfall", value: "1,284", unit: "today" },
    { label: "Task queue", value: "18", unit: "dynamic" },
    { label: "Routing", value: "On", unit: "AI" },
  ],
  sense: [
    { label: "AQI", value: "38", unit: "good" },
    { label: "CO₂", value: "612", unit: "ppm" },
    { label: "Water", value: "2.1", unit: "kL" },
    { label: "Energy", value: "96", unit: "kWh" },
  ],
  prove: [
    { label: "Carbon", value: "42", unit: "kg" },
    { label: "Waste", value: "90", unit: "% diverted" },
    { label: "Water", value: "2,180", unit: "L reused" },
    { label: "ESG", value: "Ready", unit: "export" },
  ],
  serve: [
    { label: "Requests", value: "6", unit: "open" },
    { label: "ETA", value: "14", unit: "min" },
    { label: "Quality", value: "4.8", unit: "/5" },
    { label: "Concierge", value: "Live", unit: "demo" },
  ],
};

const ease = [0.22, 1, 0.36, 1] as const;

export function DashboardPreview({ mode }: { mode: Mode }) {
  const stats = panels[mode];

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-white p-5 text-hero-ink shadow-[0_24px_60px_-28px_rgba(17,35,27,0.28)] ring-1 ring-hero-ink/8 sm:p-6 md:p-7">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,_rgba(47,125,79,0.12),_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="meta text-leaf">HazelAI</p>
          <p className="mt-1 text-[15px] font-semibold tracking-tight capitalize">{mode}</p>
        </div>
        <p className="w-fit rounded-full bg-leaf-soft px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-leaf uppercase">
          {hazelAI.demoNote}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
          className="relative grid grid-cols-2 gap-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
              className={cn(
                "rounded-[16px] border border-hero-ink/8 bg-mint-2/80 p-3.5 sm:p-4",
                i === 0 && "border-leaf/25 bg-leaf-soft/60",
              )}
            >
              <p className="text-[12px] text-muted">{s.label}</p>
              <p className="mt-2 text-[clamp(1.45rem,5vw,1.85rem)] leading-none font-semibold tracking-tight text-hero-ink">
                {s.value}
              </p>
              <p className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-leaf uppercase">
                {s.unit}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <svg viewBox="0 0 360 80" className="relative mt-6 w-full text-leaf" aria-hidden>
        <motion.path
          key={`line-${mode}`}
          d="M0 50 C 40 48, 70 22, 110 28 S 180 70, 220 46 S 300 18, 360 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.35 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease }}
        />
        <motion.path
          key={`fill-${mode}`}
          d="M0 50 C 40 48, 70 22, 110 28 S 180 70, 220 46 S 300 18, 360 30 L 360 80 L 0 80 Z"
          fill="url(#hazelDashFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        />
        <defs>
          <linearGradient id="hazelDashFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(47,125,79,0.18)" />
            <stop offset="100%" stopColor="rgba(47,125,79,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
