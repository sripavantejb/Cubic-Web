"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap-register";
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
  const wrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const { ready } = useApp();

  useEffect(() => {
    if (!ready || reduced) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    video.muted = true;

    const prime = async () => {
      video.muted = true;
      try {
        await video.play();
      } catch {
        /* scrubbing still works after frames decode */
      }
      if (!cancelled) video.pause();
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 2) void prime();
    video.addEventListener("loadeddata", prime);

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", prime);
      video.pause();
    };
  }, [ready, reduced, src]);

  useGSAP(
    () => {
      const scroller = wrap.current;
      if (!scroller || !ready) return;

      if (reduced) {
        gsap.set(".cinema-beat", { autoAlpha: 1, y: 0 });
        return;
      }

      const st = ScrollTrigger.create({
        trigger: scroller,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        onUpdate: (self) => {
          const video = videoRef.current;
          if (
            video &&
            video.readyState >= 2 &&
            Number.isFinite(video.duration) &&
            video.duration > 0 &&
            !video.seeking
          ) {
            const next = self.progress * video.duration;
            if (Math.abs(video.currentTime - next) > 0.03) {
              video.currentTime = next;
            }
          }

          beats.forEach((beat, i) => {
            const end = beats[i + 1]?.at ?? 1;
            const on = self.progress >= beat.at && self.progress < end;
            gsap.to(`.cinema-beat-${i}`, {
              autoAlpha: on ? 1 : 0,
              y: on ? 0 : 18,
              duration: 0.35,
              overwrite: "auto",
              ease: "power2.out",
            });
          });
        },
      });

      gsap.set(".cinema-beat", { autoAlpha: 0, y: 18 });
      gsap.set(".cinema-beat-0", { autoAlpha: 1, y: 0 });

      return () => {
        st.kill();
      };
    },
    { scope: wrap, dependencies: [reduced, ready] },
  );

  return (
    <div
      ref={wrap}
      className={cn("relative bg-ink", reduced ? "h-svh" : "h-[300svh] md:h-[360svh]", className)}
    >
      <section
        className="sticky top-0 z-0 flex h-svh overflow-hidden bg-ink text-paper"
        aria-label="Cinematic scroll film"
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
            playsInline
            preload="auto"
            aria-hidden
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-black/20" />
        <div className="relative z-10 flex h-full w-full max-w-[1440px] flex-col justify-end px-5 pb-16 md:px-8 md:pb-24">
          {beats.map((beat, i) => (
            <div
              key={beat.title}
              className={cn(
                "cinema-beat pointer-events-none absolute inset-x-5 bottom-16 max-w-2xl md:inset-x-8 md:bottom-24",
                `cinema-beat-${i}`,
                reduced && i !== 0 && "hidden",
              )}
            >
              <p className="meta tracking-[0.28em] text-white/90">Hazel India</p>
              <h2 className="display mt-4 text-[clamp(2.4rem,7vw,6.2rem)] leading-[0.9] text-white">
                {beat.title}
              </h2>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/85 md:text-[18px]">
                {beat.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
