"use client";

import { ifmGroup } from "@/content/site";
import { BlurText, FadeContent } from "@/components/react-bits";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type Portrait = (typeof ifmGroup.portraits)[number];

type Props = {
  className?: string;
  showCopy?: boolean;
  /** When true, renders as a full homepage section with padding/background. */
  asSection?: boolean;
  /**
   * `marquee` — continuous opposite-direction rows (homepage).
   * `wrap` — aligned static pill grid (sidebar / detail pages).
   */
  layout?: "marquee" | "wrap";
};

/**
 * IFM services group labels — marquee on homepage, wrapped grid beside page copy.
 */
export function IfmGroupPortrait({
  className,
  showCopy = true,
  asSection = false,
  layout = "marquee",
}: Props) {
  const reduced = usePrefersReducedMotion();
  const mid = Math.ceil(ifmGroup.portraits.length / 2);
  const topRow = ifmGroup.portraits.slice(0, mid);
  const bottomRow = ifmGroup.portraits.slice(mid);
  const withCopy = asSection || showCopy;
  const useWrap = layout === "wrap" || reduced;

  const content = (
    <>
      {withCopy ? (
        <div className="mb-5 flex flex-col gap-2 md:mb-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <FadeContent>
              <p className="meta text-leaf">{ifmGroup.eyebrow}</p>
            </FadeContent>
            <h2
              id={asSection ? "ifm-team-title" : undefined}
              className="mt-1.5 max-w-[18ch] text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-hero-ink"
            >
              <BlurText as="span" text={ifmGroup.heading} />
            </h2>
          </div>
          <FadeContent delay={0.08}>
            <p className="max-w-sm text-[13px] leading-relaxed text-muted md:text-[14px]">
              {ifmGroup.lede}
            </p>
          </FadeContent>
        </div>
      ) : null}

      {useWrap ? (
        <ul
          className="flex flex-wrap content-start gap-2 sm:gap-2.5"
          aria-label="IFM Services"
        >
          {ifmGroup.portraits.map((portrait) => (
            <li key={portrait.href}>
              <PortraitCard portrait={portrait} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="flex flex-col gap-2"
          aria-label="IFM Services team by service line"
        >
          <PortraitMarquee portraits={topRow} direction="ltr" />
          <PortraitMarquee portraits={bottomRow} direction="rtl" />
        </div>
      )}
    </>
  );

  if (asSection) {
    return (
      <section
        id="ifm-team"
        aria-labelledby="ifm-team-title"
        className={cn("section-x bg-mint-2 py-12 md:py-16", className)}
      >
        <div className="mx-auto max-w-[1440px]">{content}</div>
      </section>
    );
  }

  return <div className={cn("w-full", className)}>{content}</div>;
}

function PortraitMarquee({
  portraits,
  direction,
}: {
  portraits: readonly Portrait[];
  direction: "ltr" | "rtl";
}) {
  const unit = [...portraits, ...portraits, ...portraits];
  const loop = [...unit, ...unit];
  const animateClass =
    direction === "ltr" ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div className="overflow-hidden">
      <ul className={cn("flex w-max gap-2 sm:gap-2.5", animateClass)}>
        {loop.map((portrait, i) => {
          const isClone = i >= portraits.length;
          return (
            <li
              key={`${portrait.href}-${i}`}
              aria-hidden={isClone || undefined}
            >
              <PortraitCard portrait={portrait} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PortraitCard({ portrait }: { portrait: Portrait }) {
  return (
    <div className="flex h-[44px] w-max shrink-0 items-center rounded-full bg-white px-4 ring-1 ring-hero-ink/8 sm:h-[48px] sm:px-5">
      <span className="text-[12px] leading-none font-semibold tracking-tight text-hero-ink sm:text-[13px]">
        {portrait.label}
      </span>
    </div>
  );
}
