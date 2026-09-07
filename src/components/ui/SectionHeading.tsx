import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string
  heading: string
  lede?: string
  light?: boolean
  compact?: boolean
  className?: string
  headingClassName?: string
  align?: "left" | "center"
};

export function SectionHeading({
  eyebrow,
  heading,
  lede,
  light = false,
  compact = true,
  className,
  headingClassName,
  align = "left",
}: Props) {
  return (
    <div className={cn("shrink-0", align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow ? (
        <p className={cn("meta", compact ? "mb-2" : "mb-5", light ? "text-mist/80" : "text-leaf")}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "display max-w-[18ch]",
          compact
            ? "text-[clamp(1.55rem,3.1vw,2.75rem)] leading-[0.96]"
            : "text-[clamp(2rem,5.4vw,4.4rem)]",
          light ? "text-paper" : "text-ink",
          headingClassName,
        )}
      >
        {heading}
      </h2>
      {lede ? (
        <p
          className={cn(
            "max-w-xl leading-relaxed",
            compact ? "mt-2.5 text-[14px] md:text-[15px]" : "mt-6 text-[17px] md:text-[18px]",
            light ? "text-mist/90" : "text-muted",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
