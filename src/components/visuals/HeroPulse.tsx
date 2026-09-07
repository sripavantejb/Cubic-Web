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
    <aside className="hero-pulse w-[min(100%,22rem)] rounded-[1.35rem] border border-white/70 bg-paper/70 p-5 shadow-[0_24px_60px_rgba(14,26,18,0.12)] backdrop-blur-xl md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-leaf/12 text-leaf" aria-hidden>
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 19c8-1 12-8 13-14-7 2-13 7-13 14Z" />
              <path d="M8 14c3-2 6-6 7-10" />
            </svg>
          </span>
          <p className="text-[14px] font-medium tracking-tight">Live Air Quality</p>
        </div>
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-leaf">
          <span className="hero-pulse-dot size-1.5 rounded-full bg-sprout" />
          Good
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <p className="display flex items-end gap-2 leading-none">
          <span className="text-[3.4rem] tracking-[-0.05em]">
            {reduced ? 38 : <CountUp to={38} duration={1.6} delay={0.15} startWhen={live} />}
          </span>
          <span className="mb-1.5 text-[13px] font-medium tracking-[0.14em] text-muted">AQI</span>
        </p>
        <div className="mb-1 flex h-12 items-end gap-1" aria-hidden>
          {bars.map((h, i) => (
            <span
              key={h}
              className={i >= 3 ? "w-1.5 rounded-full bg-leaf" : "w-1.5 rounded-full bg-ink/18"}
              style={{ height: `${h * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
        <p className="max-w-[10rem] text-[13px] leading-snug text-muted">Water reuse vs baseline</p>
        <p className="display text-[2rem] leading-none tracking-tight">
          {reduced ? 80 : <CountUp to={80} duration={1.6} delay={0.25} startWhen={live} />}
          <span className="text-[1.15rem]">%</span>
        </p>
      </div>
    </aside>
  );
}
