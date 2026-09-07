import type { ScrollTrigger } from "gsap/ScrollTrigger";

export function refreshScroll(ScrollTriggerApi: typeof ScrollTrigger) {
  ScrollTriggerApi.refresh();
}

export function killScrollTriggers(ScrollTriggerApi: typeof ScrollTrigger) {
  ScrollTriggerApi.getAll().forEach((t) => t.kill());
}
