import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Props = {
  className?: string
  priority?: boolean
};

export function Logo({ className, priority }: Props) {
  return (
    <Image
      src={site.logo}
      alt={site.name}
      width={318}
      height={396}
      priority={priority}
      className={cn("h-10 w-auto object-contain object-left", className)}
    />
  );
}
