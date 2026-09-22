"use client";

import Image from "next/image";
import { meetTeam } from "@/content/site";
import { BlurText, FadeContent } from "@/components/react-bits";

export function MeetTheTeam() {
  return (
    <section id="team" className="section-x bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-[22ch]">
            <FadeContent>
              <p className="meta text-leaf">{meetTeam.eyebrow}</p>
            </FadeContent>
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.65rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-hero-ink">
              <BlurText as="span" text={meetTeam.heading} />
            </h2>
          </div>
          <FadeContent delay={0.08}>
            <p className="max-w-md text-[15px] leading-relaxed text-muted md:text-[16px]">
              {meetTeam.lede}
            </p>
          </FadeContent>
        </div>

        <FadeContent delay={0.12} className="mt-8 md:mt-10">
          <figure className="overflow-hidden rounded-[20px] bg-mint md:rounded-[28px]">
            <div className="relative aspect-[16/10] sm:aspect-[21/11] md:aspect-[2.2/1]">
              <Image
                src={meetTeam.image}
                alt={meetTeam.alt}
                fill
                sizes="(min-width: 1440px) 1440px, 100vw"
                className="object-cover object-[center_35%]"
                priority={false}
              />
              <div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/65 via-ink/20 to-transparent px-5 pt-20 pb-5 sm:px-7 sm:pb-6 md:px-8 md:pb-7"
                aria-hidden="true"
              >
                <p className="text-[13px] font-medium tracking-tight text-paper sm:text-[14px]">
                  {meetTeam.caption}
                </p>
              </div>
            </div>
          </figure>
        </FadeContent>
      </div>
    </section>
  );
}
