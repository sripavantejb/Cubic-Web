"use client";

import CountUp from "@/components/CountUp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  live?: boolean
};

export function HeroPulse({ live = false }: Props) {
  const reduced = usePrefersReducedMotion();
  const bars = [0.28, 0.42, 0.58, 0.78, 1];

  return (
    <aside className="hero-pulse w-[min(100%,20.5rem)] rounded-2xl border border-line/70 bg-paper p-5 shadow-[0_16px_40px_rgba(14,26,18,0.10)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-leaf/10 text-leaf" aria-hidden>
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 19c8-1 12-8 13-14-7 2-13 7-13 14Z" />
              <path d="M8 14c3-2 6-6 7-10" />
            </svg>
          </span>
          <p className="text-[13px] font-medium tracking-tight">Live Air Quality</p>
        </div>
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-leaf">
          <span className="hero-pulse-dot size-1.5 rounded-full bg-sprout" />
          Good
        </p>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <p className="display flex items-end gap-2 leading-none">
          <span className="text-[2.75rem] tracking-[-0.05em]">
            {reduced ? 38 : <CountUp to={38} duration={1.6} delay={0.15} startWhen={live} />}
          </span>
          <span className="mb-1 text-[12px] font-medium tracking-[0.16em] text-muted">AQI</span>
        </p>
        <div className="mb-1 flex h-10 items-end gap-1" aria-hidden>
          {bars.map((h, i) => (
            <span
              key={h}
              className={i >= 3 ? "w-1.5 rounded-full bg-leaf" : "w-1.5 rounded-full bg-ink/15"}
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4 border-t border-line pt-3.5">
        <p className="text-[12px] leading-snug text-muted">Water reuse vs baseline</p>
        <p className="display text-[1.65rem] leading-none tracking-tight">
          {reduced ? 80 : <CountUp to={80} duration={1.6} delay={0.25} startWhen={live} />}
          <span className="text-[0.95rem]">%</span>
        </p>
      </div>
    </aside>
  );
}
