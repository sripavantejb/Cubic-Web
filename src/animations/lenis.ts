import type Lenis from "lenis";
import type { gsap } from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

export function bindLenisToGsap(
  lenis: Lenis,
  gsapApi: typeof gsap,
  ScrollTriggerApi: typeof ScrollTrigger,
) {
  const onScroll = () => ScrollTriggerApi.update();
  lenis.on("scroll", onScroll);

  const ticker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsapApi.ticker.add(ticker);
  gsapApi.ticker.lagSmoothing(0);

  return () => {
    lenis.off("scroll", onScroll);
    gsapApi.ticker.remove(ticker);
  };
}
