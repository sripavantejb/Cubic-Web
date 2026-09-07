"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BarChart3, Leaf, Play, ShieldCheck } from "lucide-react";
import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { HeroPulse } from "@/components/visuals/HeroPulse";
import Magnet from "@/components/Magnet";
import { Marquee } from "@/components/sections/Marquee";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { useApp } from "@/components/providers/AppProviders";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const featureIcons = {
  leaf: Leaf,
  chart: BarChart3,
  shield: ShieldCheck,
} as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo, ready } = useApp();
  const reduced = usePrefersReducedMotion();
  const desktop = useIsDesktop();
  const [mounted, setMounted] = useState(false);
  const live = ready && mounted && !reduced;

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || !ready || reduced) return;

      gsap.to(".hero-pulse-dot", {
        scale: 1.5,
        opacity: 0.4,
        duration: 0.9,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });
    },
    { scope: root, dependencies: [ready, reduced, mounted] },
  );

  return (
    <section
      id="top"
      ref={root}
      className="section-screen relative isolate overflow-hidden bg-paper text-ink"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[min(72%,40rem)]" aria-hidden>
        <Image
          src="/images/hero-leaves.jpg"
          alt=""
          fill
          sizes="40vw"
          className="object-cover object-left opacity-[0.16] mix-blend-multiply grayscale contrast-[1.4]"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-paper" />
      </div>

      <div className="hero-visual absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <Image
          src={hero.visual}
          alt=""
          fill
          priority
          sizes="46vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-paper via-paper/35 to-transparent" />
        <p
          className="absolute top-[46%] right-6 text-[11px] tracking-[0.42em] text-ink/25 uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          People Planet Progress
        </p>
        <div className="absolute top-[36%] left-[8%]">
          <HeroPulse live={live} />
        </div>
        <p className="hero-kicker absolute right-8 bottom-8 flex items-center gap-5 text-[13px] text-ink/55">
          <span className="h-px w-16 bg-ink/25" />
          A Cleaner Tomorrow
        </p>
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 flex-1 max-w-[1440px] flex-col px-5 pt-24 pb-14 md:px-8 lg:max-w-none lg:px-[max(2rem,calc((100vw-1440px)/2+2rem))]">
        <div className="flex max-w-xl flex-1 flex-col justify-center py-4 lg:max-w-[34rem] lg:py-6 xl:max-w-[38rem]">
          <div className="mb-4 flex items-center gap-4">
            <span className="h-px w-9 bg-ink/30" />
            <p className="meta text-[0.68rem] text-ink/70">{hero.tag}</p>
          </div>

          <h1 className="display text-[clamp(2.5rem,5.4vw,4.7rem)] leading-[0.98]">
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted md:text-[16px]">
            {hero.lede}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Magnet padding={40} magnetStrength={3.4} disabled={!desktop || reduced} wrapperClassName="hero-cta">
              <Button
                href={hero.primary.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(hero.primary.href);
                }}
              >
                {hero.primary.label}
              </Button>
            </Magnet>
            <Magnet padding={40} magnetStrength={3.8} disabled={!desktop || reduced} wrapperClassName="hero-cta">
              <Button
                href={hero.secondary.href}
                variant="secondary"
                arrow={false}
                icon={<Play className="size-3.5 fill-current" />}
                className="bg-paper"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(hero.secondary.href);
                }}
              >
                {hero.secondary.label}
              </Button>
            </Magnet>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {hero.features.map((item) => {
              const Icon = featureIcons[item.icon];
              return (
                <li key={item.label} className="hero-feature flex items-center gap-2.5 text-[13px] text-ink/75">
                  <span className="grid size-8 place-items-center rounded-full bg-leaf/10 text-leaf">
                    <Icon className="size-3.5" strokeWidth={1.8} />
                  </span>
                  {item.label}
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="hero-scroll mt-8 flex items-center gap-3 self-start text-muted lg:mt-10"
            aria-label="Scroll to explore"
            onClick={() => scrollTo("#about")}
          >
            <span className="grid size-10 place-items-center rounded-full border border-line">
              <svg viewBox="0 0 20 28" className="h-5 text-ink/70" fill="none" aria-hidden>
                <rect x="5.5" y="1.5" width="9" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="10" cy="6.5" r="1.1" fill="currentColor" />
                <path d="M10 20.5v4M7.5 22.5 10 25l2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[13px]">Scroll to explore</span>
          </button>
        </div>

        <div className="hero-visual relative mt-4 hidden aspect-[16/11] max-h-[28vh] overflow-hidden sm:max-lg:block">
          <Image
            src={hero.visual}
            alt={hero.visualAlt}
            fill
            sizes="100vw"
            className="object-cover object-[70%_center]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-paper/50 to-transparent" />
          <div className="absolute bottom-5 left-4 right-4">
            <HeroPulse live={live} />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10">
        <Marquee />
      </div>
    </section>
  );
}
