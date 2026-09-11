"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageSquareText, Minimize2 } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap-register";
import { useApp } from "@/components/providers/AppProviders";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Floating contact card — expanded in hero, eases into a pill after the hero. */
export function QuickActions() {
  const { scrollTo, openContact } = useApp();
  const reduced = usePrefersReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [manualExpand, setManualExpand] = useState(false);
  const expanded = !pastHero || manualExpand;

  const shellRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const sizesRef = useRef<{ ew: number; eh: number; mw: number; mh: number } | null>(null);
  const readyRef = useRef(false);
  const skipFirstMorph = useRef(true);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const expandedRef = useRef(expanded);
  expandedRef.current = expanded;

  const measure = () => {
    const shell = shellRef.current;
    const panel = panelRef.current;
    const pill = pillRef.current;
    if (!shell || !panel || !pill) return null;

    const stash = {
      panelDisplay: panel.style.display,
      panelPos: panel.style.position,
      panelAlpha: panel.style.opacity,
      pillDisplay: pill.style.display,
      pillPos: pill.style.position,
    };

    gsap.set(shell, { clearProps: "transform", width: "auto", height: "auto", overflow: "hidden" });
    gsap.set(panel, { display: "block", autoAlpha: 1, position: "relative", y: 0, scale: 1 });
    gsap.set(pill, { display: "none", autoAlpha: 0 });
    const ew = Math.ceil(panel.offsetWidth);
    const eh = Math.ceil(panel.offsetHeight);

    gsap.set(panel, { display: "none" });
    gsap.set(pill, { display: "flex", autoAlpha: 1, position: "relative" });
    const mw = Math.ceil(pill.offsetWidth);
    const mh = Math.ceil(pill.offsetHeight);

    gsap.set(panel, {
      display: stash.panelDisplay || "block",
      position: stash.panelPos || "relative",
      opacity: stash.panelAlpha || "",
    });
    gsap.set(pill, {
      display: stash.pillDisplay || "none",
      position: stash.pillPos || "absolute",
    });

    sizesRef.current = { ew, eh, mw, mh };
    return sizesRef.current;
  };

  const showExpanded = () => {
    const shell = shellRef.current;
    const panel = panelRef.current;
    const details = detailsRef.current;
    const pill = pillRef.current;
    if (!shell || !panel || !pill) return;

    gsap.set(pill, { display: "none", autoAlpha: 0, position: "absolute", clearProps: "inset,transform" });
    gsap.set(panel, { display: "block", autoAlpha: 1, position: "relative", clearProps: "left,top,width,transform" });
    gsap.set(details, { autoAlpha: 1, y: 0 });
    gsap.set(shell, {
      width: "auto",
      height: "auto",
      borderRadius: 16,
      clearProps: "transform",
    });
  };

  const showMinimized = () => {
    const shell = shellRef.current;
    const panel = panelRef.current;
    const details = detailsRef.current;
    const pill = pillRef.current;
    if (!shell || !panel || !pill) return;

    gsap.set(panel, { display: "none", autoAlpha: 0, position: "absolute", clearProps: "left,top,width,transform" });
    gsap.set(details, { autoAlpha: 1, y: 0 });
    gsap.set(pill, { display: "flex", autoAlpha: 1, position: "relative", clearProps: "inset,transform" });
    gsap.set(shell, {
      width: "auto",
      height: "auto",
      borderRadius: 999,
      clearProps: "transform",
    });
  };

  const morphTo = (nextExpanded: boolean) => {
    const shell = shellRef.current;
    const panel = panelRef.current;
    const details = detailsRef.current;
    const pill = pillRef.current;
    if (!shell || !panel || !pill) return;

    tlRef.current?.kill();
    gsap.killTweensOf([shell, panel, pill, details]);

    if (reduced) {
      if (nextExpanded) showExpanded();
      else showMinimized();
      return;
    }

    const sizes = sizesRef.current ?? measure();
    if (!sizes) return;
    const { ew, eh, mw, mh } = sizes;

    // Shrink toward the bottom-right anchor so it feels attached, not popping.
    gsap.set(shell, { transformOrigin: "100% 100%", overflow: "hidden" });

    if (nextExpanded) {
      gsap.set(shell, { width: mw, height: mh, borderRadius: 999, scale: 1 });
      gsap.set(pill, { display: "flex", position: "absolute", inset: 0, autoAlpha: 1 });
      gsap.set(panel, {
        display: "block",
        position: "absolute",
        right: 0,
        bottom: 0,
        width: ew,
        autoAlpha: 1,
      });
      gsap.set(details, { autoAlpha: 0, y: 8 });

      tlRef.current = gsap
        .timeline({
          onComplete: () => {
            showExpanded();
            measure();
          },
        })
        .to(
          shell,
          {
            width: ew,
            height: eh,
            borderRadius: 16,
            duration: 0.72,
            ease: "power2.inOut",
          },
          0,
        )
        .to(pill, { autoAlpha: 0, duration: 0.22, ease: "power1.out" }, 0)
        .to(details, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power2.out" }, 0.28);
      return;
    }

    const fromW = shell.offsetWidth || ew;
    const fromH = shell.offsetHeight || eh;

    gsap.set(shell, { width: fromW, height: fromH, borderRadius: 16, scale: 1 });
    gsap.set(panel, {
      display: "block",
      position: "absolute",
      right: 0,
      bottom: 0,
      width: fromW,
      autoAlpha: 1,
    });
    gsap.set(details, { autoAlpha: 1, y: 0 });
    gsap.set(pill, {
      display: "flex",
      position: "absolute",
      right: 0,
      bottom: 0,
      autoAlpha: 0,
      scale: 0.96,
    });

    tlRef.current = gsap
      .timeline({
        onComplete: () => {
          showMinimized();
          measure();
        },
      })
      // Soften copy first, then let the shell catch up — one continuous ease, no hard cut.
      .to(
        details,
        { autoAlpha: 0, y: -6, duration: 0.35, ease: "power2.inOut" },
        0,
      )
      .to(
        shell,
        {
          width: mw,
          height: mh,
          borderRadius: 999,
          duration: 0.78,
          ease: "power2.inOut",
        },
        0.08,
      )
      .to(
        pill,
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" },
        0.4,
      );
  };

  useGSAP(() => {
    measure();
    if (expandedRef.current) showExpanded();
    else showMinimized();
    readyRef.current = true;
  }, []);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#solutions",
      start: "top 78%",
      onEnter: () => {
        setPastHero(true);
        setManualExpand(false);
      },
      onLeaveBack: () => {
        setPastHero(false);
        setManualExpand(false);
      },
    });

    const solutions = document.querySelector("#solutions");
    if (solutions && solutions.getBoundingClientRect().top < window.innerHeight * 0.78) {
      setPastHero(true);
    }

    return () => {
      trigger.kill();
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!readyRef.current) return;
    if (skipFirstMorph.current) {
      skipFirstMorph.current = false;
      if (expanded) showExpanded();
      else showMinimized();
      return;
    }
    morphTo(expanded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, reduced]);

  return (
    <aside
      aria-label="Contact"
      className="pointer-events-none fixed z-60"
      style={{
        right: "max(1.25rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <div
        ref={shellRef}
        className="pointer-events-auto relative overflow-hidden bg-paper/95 text-hero-ink shadow-[0_18px_44px_-18px_rgba(14,26,18,0.35)] ring-1 ring-hero-ink/10 backdrop-blur-md"
        style={{ borderRadius: 16 }}
      >
        {/* Panel always mounts (incl. minimize control) so height never jumps mid-tween */}
        <div ref={panelRef} className="w-[min(17rem,calc(100vw-2.5rem))]">
          <div ref={detailsRef} className="relative flex flex-col px-4 py-4">
            <button
              type="button"
              onClick={() => setManualExpand(false)}
              aria-label="Minimize"
              tabIndex={pastHero && expanded ? 0 : -1}
              className="absolute top-3 right-3 z-10 grid size-7 place-items-center rounded-full text-hero-ink/40 transition-opacity hover:bg-hero-ink/5 hover:text-hero-ink/70"
              style={{ opacity: pastHero && expanded ? 1 : 0, pointerEvents: pastHero && expanded ? "auto" : "none" }}
            >
              <Minimize2 className="size-3.5" aria-hidden="true" />
            </button>

            <p className="text-[10px] font-semibold tracking-[0.18em] text-leaf uppercase">
              Free facility audit
            </p>
            <p className="mt-1.5 pr-6 text-[15px] leading-snug font-semibold tracking-[-0.02em]">
              Plan a greener space
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
              Tell us about your site — we reply within 48 hours.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={openContact}
                className="group flex h-11 w-full items-center justify-center gap-2 rounded-full bg-sun text-[13.5px] font-semibold tracking-[-0.01em] text-hero-ink transition-colors hover:bg-sun-deep"
              >
                Contact us
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>

              <a
                href="#solutions"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#solutions");
                }}
                className="flex h-10 w-full items-center justify-center gap-1.5 rounded-full text-[12.5px] font-medium text-hero-ink/65 transition-colors hover:bg-hero-ink/4 hover:text-leaf"
              >
                Explore our services
                <ArrowRight className="size-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <button
          ref={pillRef}
          type="button"
          onClick={() => setManualExpand(true)}
          aria-expanded={expanded}
          aria-label="Expand free facility audit"
          className="group absolute right-0 bottom-0 flex h-12 items-center gap-2.5 py-0 pr-4 pl-3.5 whitespace-nowrap"
          style={{ display: "none" }}
        >
          <span className="grid size-7 place-items-center rounded-full bg-sun text-hero-ink">
            <MessageSquareText className="size-3.5" strokeWidth={2} aria-hidden="true" />
          </span>
          <span className="text-[12px] font-semibold tracking-[0.04em] text-hero-ink">
            Free facility audit
          </span>
          <ArrowRight
            className="size-3.5 text-hero-ink/45 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </aside>
  );
}
