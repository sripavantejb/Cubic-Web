"use client";

import { ArrowRight } from "lucide-react";
import { siteWalkthrough } from "@/content/site";
import { useApp } from "@/components/providers/AppProviders";
import { BlurText, FadeContent } from "@/components/react-bits";
import {
  Gallery,
  GalleryGrid,
  GalleryImage,
} from "@/components/ui/shared-element-gallery";

export function SiteWalkthrough() {
  const { scrollTo } = useApp();

  return (
    <section id="walkthrough" className="section-x section-y bg-paper">
      <div className="mx-auto max-w-[1440px]">
        <FadeContent>
          <p className="meta text-leaf">{siteWalkthrough.eyebrow}</p>
        </FadeContent>
        <BlurText
          as="h2"
          text={siteWalkthrough.heading}
          className="mt-3 max-w-[18ch] text-[clamp(1.85rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink"
        />
        <FadeContent delay={0.1} className="mt-5">
          <p className="max-w-[40rem] text-[16px] leading-relaxed text-muted md:text-[18px]">
            {siteWalkthrough.lede}
          </p>
        </FadeContent>

        <FadeContent delay={0.12} className="mt-10 lg:mt-14">
          <Gallery>
            <GalleryGrid className="lg:columns-3">
              {siteWalkthrough.images.map((image) => (
                <GalleryImage
                  key={image.id}
                  id={image.id}
                  src={image.src}
                  alt={image.alt}
                />
              ))}
            </GalleryGrid>
          </Gallery>
        </FadeContent>

        <FadeContent delay={0.15} className="mt-10 md:mt-14">
          <div className="flex flex-col gap-4 border-t border-hero-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[36rem] text-[15px] leading-relaxed text-muted md:text-[16px]">
              {siteWalkthrough.cta.text}
            </p>
            <button
              type="button"
              onClick={() => scrollTo(siteWalkthrough.cta.href)}
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-sun px-5 text-[14px] font-semibold text-hero-ink transition-colors hover:bg-sun-deep"
            >
              {siteWalkthrough.cta.label}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
