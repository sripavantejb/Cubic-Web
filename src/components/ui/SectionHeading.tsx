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
        <p className={cn("meta mb-5", light ? "text-mist/80" : "text-leaf")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "display max-w-[16ch] text-[clamp(2rem,5.4vw,4.4rem)]",
          light ? "text-paper" : "text-ink",
          headingClassName,
        )}
      >
        {heading}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-6 max-w-xl text-[17px] leading-relaxed md:text-[18px]",
            light ? "text-mist/90" : "text-muted",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
