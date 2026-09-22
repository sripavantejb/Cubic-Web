"use client";

import { contact } from "@/content/site";
import { MediaFrame } from "@/components/media/MediaFrame";
import { ContactForm } from "@/components/sections/ContactForm";
import { AnimatedContent, FadeContent } from "@/components/react-bits";

export function LeadForm() {
  return (
    <section id="contact" className="section-x bg-paper py-12 md:py-16">
      <div className="mx-auto grid max-w-[1440px] items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:gap-12">
        <div className="min-w-0">
          <FadeContent>
            <p className="meta text-leaf">{contact.eyebrow}</p>
            <h2 className="mt-2 max-w-[16ch] text-[clamp(1.45rem,2.8vw,2.15rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-hero-ink">
              {contact.heading}
            </h2>
            <p className="mt-2.5 max-w-md text-[14px] leading-relaxed text-muted md:text-[15px]">
              {contact.text}
            </p>
          </FadeContent>

          <FadeContent delay={0.08} className="mt-5 md:mt-6">
            <div className="rounded-[16px] bg-white p-4 ring-1 ring-hero-ink/8 sm:p-5 md:rounded-[18px]">
              <ContactForm compact />
            </div>
          </FadeContent>
        </div>

        <AnimatedContent
          delay={0.1}
          distance={20}
          className="hidden lg:block lg:sticky lg:top-28"
        >
          <MediaFrame
            src={contact.image}
            alt={contact.alt}
            className="h-[320px] rounded-[18px] xl:h-[360px]"
            sizes="(min-width: 1024px) 28vw, 100vw"
            kenBurns
          />
        </AnimatedContent>
      </div>
    </section>
  );
}
