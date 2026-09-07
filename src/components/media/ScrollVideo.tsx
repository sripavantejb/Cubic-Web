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
  const targetTime = useRef(0);
  const raf = useRef(0);
  const reduced = usePrefersReducedMotion();
  const { ready } = useApp();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready || reduced) return;

    let cancelled = false;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("playsinline", "true");

    const prime = async () => {
      video.muted = true;
      try {
        await video.play();
      } catch {
        /* iOS may require a touch first */
      }
      if (!cancelled) video.pause();
      ScrollTrigger.refresh();
    };

    const unlock = () => {
      void prime();
    };

    if (video.readyState >= 1) void prime();
    video.addEventListener("loadedmetadata", prime);
    video.addEventListener("canplay", prime);
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("pointerdown", unlock, { once: true });

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", prime);
      video.removeEventListener("canplay", prime);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("pointerdown", unlock);
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

      const applyTime = () => {
        raf.current = 0;
        const video = videoRef.current;
        if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
        const next = targetTime.current;
        if (Math.abs(video.currentTime - next) < 0.04) return;
        try {
          video.currentTime = next;
        } catch {
          /* iOS can reject seeks until primed */
        }
      };

      const showBeat = (progress: number) => {
        beats.forEach((beat, i) => {
          const end = beats[i + 1]?.at ?? 1;
          const on = progress >= beat.at && progress < end;
          gsap.to(`.cinema-beat-${i}`, {
            autoAlpha: on ? 1 : 0,
            y: on ? 0 : 16,
            duration: 0.28,
            overwrite: "auto",
            ease: "power2.out",
          });
        });
      };

      const st = ScrollTrigger.create({
        trigger: scroller,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 768 ? 2.6 : 3.4))}`,
        pin: true,
        scrub: 0.45,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const video = videoRef.current;
          if (video && Number.isFinite(video.duration) && video.duration > 0) {
            targetTime.current = self.progress * video.duration;
            if (!raf.current) raf.current = requestAnimationFrame(applyTime);
          }
          showBeat(self.progress);
        },
      });

      gsap.set(".cinema-beat", { autoAlpha: 0, y: 16 });
      gsap.set(".cinema-beat-0", { autoAlpha: 1, y: 0 });

      const onSeeked = () => {
        const video = videoRef.current;
        if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
        if (Math.abs(video.currentTime - targetTime.current) > 0.08) {
          if (!raf.current) raf.current = requestAnimationFrame(applyTime);
        }
      };
      videoRef.current?.addEventListener("seeked", onSeeked);

      return () => {
        videoRef.current?.removeEventListener("seeked", onSeeked);
        if (raf.current) cancelAnimationFrame(raf.current);
        st.kill();
      };
    },
    { scope: wrap, dependencies: [reduced, ready] },
  );

  return (
    <div ref={wrap} className={cn("relative bg-ink", className)}>
      <section
        className="relative flex h-dvh overflow-hidden bg-ink text-paper"
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
            disablePictureInPicture
            controls={false}
            aria-hidden
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-black/20" />
        <div className="section-x relative z-10 flex h-full w-full max-w-[1440px] flex-col justify-end pb-[max(4rem,calc(env(safe-area-inset-bottom)+3rem))] md:pb-24">
          {beats.map((beat, i) => (
            <div
              key={beat.title}
              className={cn(
                "cinema-beat pointer-events-none absolute inset-x-[max(1.25rem,env(safe-area-inset-left))] bottom-[max(4rem,calc(env(safe-area-inset-bottom)+3rem))] max-w-2xl md:inset-x-8 md:bottom-24",
                `cinema-beat-${i}`,
                reduced && i !== 0 && "hidden",
              )}
            >
              <p className="meta tracking-[0.28em] text-white/90">Hazel India</p>
              <h2 className="display mt-3 text-[clamp(2rem,10vw,6.2rem)] leading-[0.9] text-white md:mt-4">
                {beat.title}
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85 md:mt-5 md:text-[18px]">
                {beat.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
