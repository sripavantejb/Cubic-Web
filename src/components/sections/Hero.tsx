"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BarChart3, Leaf, Play, ShieldCheck } from "lucide-react";
import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { HeroPulse } from "@/components/visuals/HeroPulse";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { useApp } from "@/components/providers/AppProviders";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const featureIcons = {
  leaf: Leaf,
  chart: BarChart3,
  shield: ShieldCheck,
} as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo, ready } = useApp();
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const live = ready && mounted && !reduced;

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!root.current || !ready || reduced) return;
      gsap.to(".hero-pulse-dot", {
        scale: 1.45,
        opacity: 0.45,
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
    <section id="top" ref={root} className="relative isolate min-h-svh overflow-x-clip bg-paper text-ink">
      <div className="hero-visual absolute inset-y-0 right-0 hidden w-[50%] lg:block">
        <Image
          src={hero.visual}
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-paper from-0% via-paper/80 via-18% to-transparent to-55%" />
        <div className="absolute top-[40%] left-[7%]">
          <HeroPulse live={live} />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1440px] flex-col px-5 pt-[max(6.25rem,calc(env(safe-area-inset-top)+5rem))] pb-8 md:px-8 lg:px-[max(2rem,calc((100vw-1440px)/2+2rem))]">
        <div className="flex max-w-xl flex-1 flex-col justify-center lg:max-w-[36rem]">
          <div className="mb-5 flex items-center gap-3.5">
            <span className="h-px w-8 shrink-0 bg-ink/25" />
            <p className="meta text-[0.64rem] tracking-[0.2em] text-ink/55">{hero.tag}</p>
          </div>

          <h1 className="display text-[clamp(2.35rem,5.6vw,4.35rem)] leading-[0.96] text-ink">
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[34rem] text-[16px] leading-[1.65] text-muted md:text-[17px]">
            {hero.lede}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={hero.primary.href}
              magnetic
              onClick={(e) => {
                e.preventDefault();
                scrollTo(hero.primary.href);
              }}
            >
              {hero.primary.label}
            </Button>
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
          </div>
        </div>

        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden lg:hidden">
          <Image
            src={hero.visual}
            alt={hero.visualAlt}
            fill
            sizes="100vw"
            className="object-cover object-[70%_center]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-paper/55 to-transparent" />
          <div className="absolute inset-x-4 bottom-4">
            <HeroPulse live={live} />
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap items-center divide-x divide-line border-t border-line/80 pt-6 lg:mt-0 lg:max-w-[40rem]">
          {hero.features.map((item) => {
            const Icon = featureIcons[item.icon];
            return (
              <li
                key={item.label}
                className="flex items-center gap-2.5 px-6 py-1 text-[13px] font-medium tracking-tight text-ink/70 first:pl-0 last:pr-0"
              >
                <span className="grid size-8 place-items-center rounded-full bg-leaf/10 text-leaf">
                  <Icon className="size-3.5" strokeWidth={1.7} />
                </span>
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
