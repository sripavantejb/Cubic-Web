"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { createVideoScrubber } from "@/animations/video-scrub";
import { useApp } from "@/components/providers/AppProviders";
import { cn } from "@/lib/cn";

// Two-column layout. Same query as the `wide` variant in globals.css.
const WIDE = "(min-width: 768px) and (min-aspect-ratio: 5/4)";
const NARROW = `not all and ${WIDE}`;
const REDUCED = "(prefers-reduced-motion: reduce)";

// Seconds the film takes to catch up with the scroll position: the glide in GSAP's scrub.
const SCRUB_SMOOTHING = 1.2;

const FILM = "hero-film absolute inset-0 size-full object-cover";

// Compact pills: 44px on phones, 48px from tablets up.
const CTA =
  "h-11 !py-0 px-4 text-[13.5px] min-[600px]:h-12 min-[600px]:px-6 min-[600px]:text-[14px] min-[1200px]:text-[15px]";
const CTA_ARROW =
  "hidden size-4 transition-transform duration-300 group-hover:translate-x-0.5 min-[600px]:block";

const ROTATING = hero.headlineRotating;
// Keep accent swaps inside the first ~75% of the pin so they finish before wide copy fades.
const ROTATE_WINDOW = 0.72;

export function Hero() {
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ready, scrollTo } = useApp();

  // The tour: pinned while the page scroll drives video.currentTime. One element, one file.
  useGSAP(
    () => {
      const trackEl = track.current;
      const section = root.current;
      const video = videoRef.current;
      if (!trackEl || !section || !video) return;

      const mm = gsap.matchMedia();
      // matchMedia only runs the setup while at least one condition matches, so wide and
      // narrow are both listed: one of them always does.
      mm.add(
        { wide: WIDE, narrow: NARROW, reduced: REDUCED },
        (context) => {
          const { wide, reduced } = context.conditions as Record<string, boolean>;
          // Reduced motion: no pin, no scrubbing, no film download — the first frame stays.
          if (reduced) return;

          if (video.getAttribute("src") !== hero.video) video.src = hero.video;

          const scrubber = createVideoScrubber(video, {
            onFirstFrame: () => gsap.to(video, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }),
          });

          // The film follows the timeline's eased playhead, not the raw scroll position, so it
          // glides to each new position and settles on the exact frame when scrolling stops.
          const film = { progress: 0 };
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              // The scroll length is the room .hero-track reserves below the hero (globals.css).
              end: () => `+=${trackEl.offsetHeight - section.offsetHeight}`,
              pin: true,
              pinSpacing: false,
              scrub: SCRUB_SMOOTHING,
              invalidateOnRefresh: true,
              // A refresh (load, resize, restored scroll) moves the playhead with callbacks
              // suppressed, so re-sync the film from it afterwards.
              onRefresh: () => scrubber.setProgress(film.progress),
            },
          });
          timeline.to(film, { progress: 1, duration: 1, onUpdate: () => scrubber.setProgress(film.progress) }, 0);

          // Accent line cycles with the tour: Better India → workplaces → communities → …
          const lines = gsap.utils.toArray<HTMLElement>(".hero-rotate-line", section);
          if (lines.length > 1) {
            gsap.set(lines, { autoAlpha: 0, y: 14 });
            gsap.set(lines[0], { autoAlpha: 1, y: 0 });

            const step = ROTATE_WINDOW / lines.length;
            const fade = Math.min(0.08, step * 0.45);

            for (let i = 0; i < lines.length - 1; i++) {
              const at = (i + 1) * step;
              timeline.to(lines[i], { autoAlpha: 0, y: -12, duration: fade }, at - fade);
              timeline.fromTo(
                lines[i + 1],
                { autoAlpha: 0, y: 14 },
                { autoAlpha: 1, y: 0, duration: fade },
                at - fade,
              );
            }
          }

          // The copy holds still while the film plays. Full screen, it and its wash then ease
          // away so the tour's final view plays clean before the next section slides over.
          // Stacked above the film, the copy simply stays put.
          if (wide) {
            timeline
              .to(".hero-content", { autoAlpha: 0, y: -12, duration: 0.14 }, 0.8)
              .to(".hero-scrim", { autoAlpha: 0, duration: 0.14 }, 0.8);
          }
          scrubber.setProgress(film.progress);

          return () => {
            scrubber.destroy();
            gsap.killTweensOf(video);
            gsap.set(video, { clearProps: "opacity,visibility" });
          };
        },
        section,
      );
    },
    { scope: root },
  );

  // Calm entrance once the page loader lifts. Reduced motion shows everything immediately via CSS.
  useGSAP(
    () => {
      if (!ready || window.matchMedia(REDUCED).matches) return;
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .fromTo(
          ".hero-video-container",
          { autoAlpha: 0, scale: 1.02, transformOrigin: "50% 50%" },
          { autoAlpha: 1, scale: 1, duration: 1.2 },
          0,
        )
        .fromTo(".hero-reveal", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.15);
    },
    { scope: root, dependencies: [ready] },
  );

  const longestAccent = ROTATING.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <div id="top" ref={track} className="hero-track">
      <section
        ref={root}
        aria-labelledby="hero-title"
        className="hero relative isolate flex h-svh flex-col overflow-hidden bg-mint-2 text-hero-ink"
      >
        <div className="hero-content relative z-10 flex flex-col px-(--inset) pt-[calc(max(0.75rem,env(safe-area-inset-top))+4.75rem)] pb-5 min-[600px]:pt-24 min-[600px]:pb-6 wide:h-full wide:w-(--seam) wide:justify-center wide:pr-6 wide:pb-10">
          <p className="hero-reveal flex items-center gap-2.5 text-[10px] font-medium tracking-[0.14em] text-hero-ink/60 uppercase motion-safe:opacity-0 min-[600px]:text-[11px] min-[600px]:tracking-[0.22em]">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-sun" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="hero-reveal hero-title mt-4 leading-none font-semibold tracking-[-0.035em] motion-safe:opacity-0 min-[600px]:mt-5 wide:mt-6"
          >
            {hero.headline.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
            <span className="relative block text-leaf-bright">
              {/* Holds height for the longest rotating line so the layout doesn't jump. */}
              <span className="invisible block whitespace-nowrap" aria-hidden="true">
                {longestAccent}
              </span>
              {ROTATING.map((line, i) => (
                <span
                  key={line}
                  className={cn(
                    "hero-rotate-line absolute inset-x-0 top-0 whitespace-nowrap",
                    i === 0 ? "opacity-100" : "opacity-0",
                    i !== 0 && "motion-reduce:hidden",
                  )}
                  aria-hidden={i !== 0}
                >
                  {line}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-reveal mt-3.5 max-w-[30rem] text-[16px] leading-[1.6] text-hero-ink/70 motion-safe:opacity-0 min-[600px]:mt-5 wide:mt-6 wide:text-[clamp(1.0625rem,1.25vw,1.1875rem)] short:hidden">
            {hero.lede}
          </p>

          {/* Phones keep both buttons on one row by dropping the arrows. */}
          <div className="hero-reveal mt-5 flex flex-wrap items-center gap-2 motion-safe:opacity-0 min-[600px]:mt-7 min-[600px]:gap-3 wide:mt-9">
            <Button
              href={hero.primary.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(hero.primary.href);
              }}
              className={CTA}
              arrow={<ArrowRight className={CTA_ARROW} />}
            >
              {hero.primary.label}
            </Button>
            <Button
              href={hero.secondary.href}
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(hero.secondary.href);
              }}
              className={CTA}
              arrow={<ArrowRight className={CTA_ARROW} />}
            >
              {hero.secondary.label}
            </Button>
          </div>

          <ul className="hero-reveal mt-5 flex gap-x-9 motion-safe:opacity-0 min-[600px]:mt-8 min-[600px]:gap-x-12 wide:mt-12 wide:max-w-[30rem] wide:border-t wide:border-hero-ink/10 wide:pt-6 short:hidden phone-short:hidden">
            {hero.trust.map((item) => (
              <li key={item.label}>
                <span className="block text-[16px] leading-tight font-semibold tracking-tight min-[600px]:text-[18px] wide:text-[20px]">
                  {item.value}
                </span>
                <span className="mt-0.5 block text-[11.5px] leading-snug text-hero-ink/55 min-[600px]:mt-1 min-[600px]:text-[13px]">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative: the copy carries the message. Stacked: the film fills the space under
            the copy. Wide: the film fills the whole screen behind the copy. */}
        <div className="hero-stage relative min-h-[36%] flex-1 wide:absolute wide:inset-0">
          <div
            aria-hidden="true"
            className="hero-video-container hero-media relative size-full overflow-hidden motion-safe:opacity-0"
          >
            <Image
              src={hero.poster}
              alt=""
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="hero-film object-cover"
            />
            {/* suppressHydrationWarning: browser extensions tag <video> elements (e.g. data-video)
                before React hydrates; that attribute noise is harmless. */}
            <video
              ref={videoRef}
              className={cn(FILM, "opacity-0 motion-reduce:hidden")}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              suppressHydrationWarning
            />
            <div className="hero-scrim pointer-events-none absolute inset-0 hidden wide:block" />
            <div className="hero-fade-bottom pointer-events-none absolute inset-0 hidden wide:block" />
          </div>
        </div>
      </section>
    </div>
  );
}
