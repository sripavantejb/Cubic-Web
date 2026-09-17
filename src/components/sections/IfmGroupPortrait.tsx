"use client";

import Image from "next/image";
import Link from "next/link";
import { ifmGroup } from "@/content/site";
import { AnimatedContent, FadeContent } from "@/components/react-bits";
import { cn } from "@/lib/cn";

type Props = {
  className?: string
  showCopy?: boolean
};

/**
 * One visual composition of IFM service-team portraits — the “group pic”
 * for every service line listed in the IFM tab.
 */
export function IfmGroupPortrait({ className, showCopy = true }: Props) {
  return (
    <div className={cn("w-full", className)}>
      {showCopy ? (
        <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <FadeContent>
              <p className="meta text-leaf">{ifmGroup.eyebrow}</p>
            </FadeContent>
            <h3 className="mt-2 max-w-[18ch] text-[clamp(1.45rem,2.8vw,2.15rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-hero-ink">
              {ifmGroup.heading}
            </h3>
          </div>
          <FadeContent delay={0.08}>
            <p className="max-w-md text-[14px] leading-relaxed text-muted md:text-[15px]">
              {ifmGroup.lede}
            </p>
          </FadeContent>
        </div>
      ) : null}

      <ul
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 md:grid-cols-5 md:gap-3"
        aria-label="IFM Services team group"
      >
        {ifmGroup.portraits.map((portrait, i) => (
          <AnimatedContent key={portrait.href} delay={i * 0.04} distance={24}>
            <li>
              <Link
                href={portrait.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[16px] bg-mint outline-offset-4 md:rounded-[18px]"
              >
                <Image
                  src={portrait.image}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 768px) 18vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent px-2.5 pt-10 pb-2.5 sm:px-3 sm:pb-3">
                  <span className="block text-[11px] leading-snug font-semibold tracking-tight text-paper sm:text-[12px] md:text-[13px]">
                    {portrait.label}
                  </span>
                </span>
              </Link>
            </li>
          </AnimatedContent>
        ))}
      </ul>
    </div>
  );
}
