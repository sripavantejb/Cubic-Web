import type { gsap } from "gsap";

export const revealVars = {
  from: { y: 28, autoAlpha: 0 },
  to: { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
} as const;

export function revealChildren(
  timeline: gsap.core.Timeline,
  targets: gsap.TweenTarget,
  position: gsap.Position = "-=0.55",
) {
  timeline.fromTo(targets, revealVars.from, { ...revealVars.to, stagger: 0.08 }, position);
}
