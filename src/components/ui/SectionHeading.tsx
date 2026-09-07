import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string
  heading: string
  lede?: string
  light?: boolean
  className?: string
  headingClassName?: string
  align?: "left" | "center"
};

export function SectionHeading({
  eyebrow,
  heading,
  lede,
  light = false,
  className,
  headingClassName,
  align = "left",
}: Props) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow ? (
        <p className={cn("meta mb-3 md:mb-5", light ? "text-mist/80" : "text-leaf")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "display max-w-[16ch] text-[clamp(1.85rem,8vw,4.4rem)]",
          light ? "text-paper" : "text-ink",
          headingClassName,
        )}
      >
        {heading}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-[15px] leading-relaxed md:mt-6 md:text-[18px]",
            light ? "text-mist/90" : "text-muted",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
