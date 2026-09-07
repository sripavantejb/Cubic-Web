"use client";

import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Node = {
  x: number
  y: number
  vx: number
  vy: number
};

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const desktop = useIsDesktop(768);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !desktop || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let running = true;
    const nodes: Node[] = [];
    const count = 52;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes.length = 0;
      const { width, height } = canvas.getBoundingClientRect();
      for (let i = 0; i < count; i += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
        });
      }
    };

    const draw = () => {
      if (!running) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(93, 176, 117, ${0.18 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(169, 214, 181, 0.85)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    seed();
    frame = window.requestAnimationFrame(draw);
    const ro = new ResizeObserver(() => {
      resize();
      seed();
    });
    ro.observe(canvas);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [desktop, reduced]);

  return (
    <div className="hero-field absolute inset-0 overflow-hidden">
      <div className="grid-fade absolute inset-0 opacity-25" />
      <div className="hero-glow absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(47,125,79,0.22),transparent_42%),radial-gradient(circle_at_18%_78%,rgba(14,26,18,0.08),transparent_50%)]" />
      {desktop && !reduced ? (
        <canvas ref={canvasRef} className="absolute inset-0 size-full" aria-hidden />
      ) : null}
    </div>
  );
}
