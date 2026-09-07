"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useApp } from "@/components/providers/AppProviders";

export type CinemaBeat = {
  at: number
  title: string
  text: string
};

type Props = {
  src: string
  poster: string
  beats: readonly CinemaBeat[]
  className?: string
};

export function ScrollVideo({ src, poster, beats, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const { ready } = useApp();
  const beat = beats[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready || reduced) return;
    video.muted = true;
    const play = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };
    if (video.readyState >= 2) play();
    video.addEventListener("loadeddata", play);
    return () => {
      video.removeEventListener("loadeddata", play);
      video.pause();
    };
  }, [ready, reduced, src]);

  return (
    <section
      className={cn("section-screen overflow-hidden bg-ink text-paper", className)}
      aria-label="Cinematic film"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
      {ready && !reduced ? (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-black/20" />
      <div className="section-screen-inner relative z-10 justify-end px-5 pt-24 pb-10 md:px-8 md:pb-14">
        {beat ? (
          <div className="max-w-2xl">
            <p className="meta tracking-[0.28em] text-white/90">Hazel India</p>
            <h2 className="display mt-3 text-[clamp(2rem,5.5vw,4.4rem)] leading-[0.92] text-white">
              {beat.title}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85 md:text-[16px]">
              {beat.text}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
