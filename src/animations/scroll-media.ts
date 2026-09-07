import type { gsap } from "gsap";

export function clipReveal(
  gsapApi: typeof gsap,
  target: gsap.TweenTarget,
  trigger?: Element | string | null,
) {
  return gsapApi.fromTo(
    target,
    { clipPath: "inset(18% 18% 18% 18%)", scale: 1.08, autoAlpha: 0.7 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      autoAlpha: 1,
      duration: 1.15,
      ease: "power3.out",
      scrollTrigger: trigger
        ? { trigger, start: "top 82%" }
        : undefined,
    },
  );
}

export function parallaxY(
  gsapApi: typeof gsap,
  target: gsap.TweenTarget,
  trigger: Element | string,
  amount = 48,
) {
  return gsapApi.to(target, {
    y: amount,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.7,
    },
  });
}

export function kenBurns(
  gsapApi: typeof gsap,
  target: gsap.TweenTarget,
  trigger?: Element | string | null,
) {
  return gsapApi.fromTo(
    target,
    { scale: 1.08 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: trigger
        ? { trigger, start: "top bottom", end: "bottom top", scrub: 0.8 }
        : undefined,
    },
  );
}
