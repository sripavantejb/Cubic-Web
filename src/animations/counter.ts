import type { gsap } from "gsap";

type CounterOptions = {
  duration?: number;
  suffix?: string;
  prefix?: string;
};

export function animateCounter(
  gsapApi: typeof gsap,
  el: HTMLElement,
  end: number,
  options: CounterOptions = {},
) {
  const { duration = 1.4, suffix = "", prefix = "" } = options;
  const state = { value: 0 };

  return gsapApi.to(state, {
    value: end,
    duration,
    ease: "power3.out",
    onUpdate: () => {
      const rounded = Number.isInteger(end) ? Math.round(state.value) : Number(state.value.toFixed(1));
      el.textContent = `${prefix}${rounded}${suffix}`;
    },
  });
}
