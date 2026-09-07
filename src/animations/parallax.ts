import type { gsap } from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

export function parallaxY(
  gsapApi: typeof gsap,
  trigger: Element,
  target: gsap.TweenTarget,
  distance = 48,
  scroller?: ScrollTrigger.Vars["scroller"],
) {
  return gsapApi.to(target, {
    y: distance,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.6,
      scroller,
    },
  });
}
