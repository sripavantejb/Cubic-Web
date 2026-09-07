import type { gsap } from "gsap";

export function attachMagnetic(
  gsapApi: typeof gsap,
  el: HTMLElement,
  strength = 18,
) {
  const xTo = gsapApi.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
  const yTo = gsapApi.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

  const onMove = (event: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    xTo((relX / rect.width) * strength);
    yTo((relY / rect.height) * strength);
  };

  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);

  return () => {
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
    gsapApi.set(el, { x: 0, y: 0 });
  };
}
