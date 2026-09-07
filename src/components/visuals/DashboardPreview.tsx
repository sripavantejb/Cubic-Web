"use client";

import { motion } from "framer-motion";
import { hazelAI } from "@/content/site";

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

export function DashboardPreview({ mode }: { mode: Mode }) {
  const stats = panels[mode];

  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#0b140e] p-4 text-paper shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-5 md:p-6">
      <div className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta text-mist">HazelAI · {mode}</p>
        <p className="max-w-full rounded-full border border-white/10 px-2 py-1 font-mono text-[10px] tracking-wider text-lime uppercase">
          {hazelAI.demoNote}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/10 bg-white/5 p-3 sm:p-4"
          >
            <p className="text-[12px] text-mist/80">{s.label}</p>
            <p className="display mt-2 text-[clamp(1.5rem,8vw,2rem)] leading-none">{s.value}</p>
            <p className="mt-1 font-mono text-[10px] tracking-wider text-sprout uppercase">{s.unit}</p>
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 360 80" className="mt-5 w-full text-sprout" aria-hidden>
        <motion.path
          d="M0 50 C 40 48, 70 22, 110 28 S 180 70, 220 46 S 300 18, 360 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}
