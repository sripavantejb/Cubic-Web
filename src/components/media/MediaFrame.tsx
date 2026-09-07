"use client";

import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/animations/gsap-register";
import { clipReveal, kenBurns, parallaxY } from "@/animations/scroll-media";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
  reveal?: boolean
  parallax?: boolean
  kenBurns?: boolean
};

export function MediaFrame({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  reveal = true,
  parallax = false,
  kenBurns: burn = false,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current || !media.current) return;
      if (reveal) clipReveal(gsap, media.current, root.current);
      if (parallax) parallaxY(gsap, media.current, root.current, 36);
      if (burn) {
        const img = media.current.querySelector("img");
        if (img) kenBurns(gsap, img, root.current);
      }
    },
    { scope: root, dependencies: [reduced, src, reveal, parallax, burn] },
  );

  return (
    <div ref={root} className={cn("relative overflow-hidden", className)}>
      <div ref={media} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imgClassName)}
        />
      </div>
    </div>
  );
}
