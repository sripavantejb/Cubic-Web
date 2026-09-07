"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import SplitText from "@/components/SplitText";
import DecryptedText from "@/components/DecryptedText";
import BlurText from "@/components/BlurText";
import Counter from "@/components/Counter";
import CountUp from "@/components/CountUp";

const LightRays = dynamic(() => import("@/components/LightRays"), { ssr: false });

const STATUS = [
  "CLEANER SPACES",
  "GREENER INDIA",
  "SMARTER BY DESIGN",
] as const;

const TICKS = Array.from({ length: 21 }, (_, i) => (i >= 9 && i <= 11 ? "*" : "–"));

type Props = {
  onComplete: () => void
};

export function PageLoader({ onComplete }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  const reduced = usePrefersReducedMotion();
  const [pct, setPct] = useState(0);
  const [boot, setBoot] = useState(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    document.body.style.overflow = "";
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (!reduced) setBoot(true);
  }, [reduced]);

  useEffect(() => {
    const t = window.setTimeout(() => finish(), 4500);
    return () => window.clearTimeout(t);
  }, [finish]);

  useGSAP(
    () => {
      const el = root.current;
      const line = bar.current;
      if (!el) return;

      if (reduced) {
        gsap.set(el, { autoAlpha: 0, display: "none" });
        finish();
        return;
      }

      document.body.style.overflow = "hidden";

      const progress = { n: 0 };
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".loader-frame", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0)
        .fromTo(".loader-panel", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.08)
        .fromTo(
          progress,
          { n: 0 },
          {
            n: 100,
            duration: 2.55,
            delay: 0.18,
            ease: "power2.inOut",
            onUpdate: () => {
              const next = Math.round(progress.n);
              setPct((prev) => (prev === next ? prev : next));
              if (line) gsap.set(line, { scaleX: progress.n / 100 });
            },
          },
          0.2,
        )
        .to(el, {
          autoAlpha: 0,
          y: -28,
          duration: 0.7,
          delay: 0.28,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(el, { display: "none" });
            finish();
          },
        });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-ink text-paper"
      role="progressbar"
      aria-label="Loading Hazel India"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        {boot && !reduced ? (
          <LightRays
            raysOrigin="top-center"
            raysColor="#c6e26a"
            raysSpeed={0.65}
            lightSpread={1.15}
            rayLength={1.35}
            pulsating
            fadeDistance={1.15}
            saturation={0.85}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.04}
            distortion={0.08}
            className="h-full w-full"
          />
        ) : null}
      </div>

      <div className="loader-frame pointer-events-none absolute inset-0">
        <span className="absolute top-4 left-4 font-mono text-[13px] text-mist/70">+</span>
        <span className="absolute top-4 right-4 font-mono text-[13px] text-mist/70">+</span>
        <span className="absolute bottom-4 left-4 font-mono text-[13px] text-mist/70">+</span>
        <span className="absolute right-4 bottom-4 font-mono text-[13px] text-mist/70">+</span>
        <div className="absolute top-1/2 left-3 hidden -translate-y-1/2 flex-col items-center gap-[3px] font-mono text-[9px] leading-none text-mist/45 md:flex">
          {TICKS.map((tick, i) => (
            <span key={`${tick}-${i}`} className={tick === "*" ? "text-lime" : undefined}>
              {tick}
            </span>
          ))}
        </div>
        <span className="absolute right-8 bottom-4 hidden font-mono text-[11px] tracking-[0.35em] text-mist/50 md:block">
          &lt;&lt;&lt;&lt;
        </span>
      </div>

      <div className="loader-panel relative flex h-full flex-col px-[max(1.5rem,env(safe-area-inset-left))] pt-[max(2.5rem,env(safe-area-inset-top))] pr-[max(1.5rem,env(safe-area-inset-right))] pb-[max(2.5rem,env(safe-area-inset-bottom))] md:px-12 md:py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <SplitText
              text="HAZEL INDIA"
              tag="p"
              className="meta text-mist"
              delay={28}
              duration={0.7}
              splitType="chars"
              from={{ opacity: 0, y: 18 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              rootMargin="0px"
              textAlign="left"
            />
            <BlurText
              text="Green facility systems · Hyderabad"
              className="mt-3 max-w-sm text-[13px] text-paper/55"
              animateBy="words"
              delay={80}
              direction="top"
              stepDuration={0.28}
            />
          </div>
          <p className="hidden font-mono text-[11px] tracking-[0.18em] text-mist/50 sm:block">
            SYS / 01
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="flex items-end justify-center">
            <CountUp
              from={0}
              to={100}
              duration={2.55}
              delay={0.4}
              padStart={3}
              startWhen={boot && !reduced}
              className="display text-[clamp(4.8rem,20vw,13rem)] leading-none tracking-[-0.07em] text-paper"
            />
            <span className="display text-[clamp(4.8rem,20vw,13rem)] leading-none tracking-[-0.07em] text-paper/75">
              %
            </span>
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 sm:gap-8">
          <div className="space-y-1 font-mono text-[11px] tracking-[0.14em] text-mist/80 md:text-[12px]">
            {STATUS.map((line, i) => (
              <p key={line} className="flex gap-2">
                <span className="text-lime">{i === 0 ? "<" : " "}</span>
                <DecryptedText
                  text={line}
                  animateOn="view"
                  sequential
                  revealDirection="start"
                  speed={28}
                  maxIterations={12}
                  className="text-paper/80"
                  encryptedClassName="text-mist/35"
                  parentClassName="block"
                />
              </p>
            ))}
          </div>
          <div className="flex items-center gap-2 text-mist/55">
            <Counter
              value={pct}
              places={[100, 10, 1]}
              fontSize={18}
              gap={1}
              padding={2}
              borderRadius={0}
              horizontalPadding={0}
              fontWeight={500}
              textColor="#a9d6b5"
              gradientFrom="#0e1a12"
              gradientTo="transparent"
              gradientHeight={6}
            />
            <span className="font-mono text-[11px] tracking-[0.16em]">/ 100</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-lime" />
      </div>
    </div>
  );
}
