import { cn } from "@/lib/cn";

type Props = {
  id?: string
  className?: string
  innerClassName?: string
  backdrop?: React.ReactNode
  children: React.ReactNode
  as?: "section" | "footer" | "div"
};

export function SectionFrame({
  id,
  className,
  innerClassName,
  backdrop,
  children,
  as: Tag = "section",
}: Props) {
  return (
    <Tag id={id} className={cn("section-screen", className)}>
      {backdrop}
      <div
        className={cn(
          "section-screen-inner relative z-10 px-5 pt-24 pb-6 md:px-8 md:pt-24 md:pb-8",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
