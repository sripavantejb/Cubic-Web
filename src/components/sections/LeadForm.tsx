"use client";

import { contact } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/media/MediaFrame";
import { useApp } from "@/components/providers/AppProviders";
import { AnimatedContent, FadeContent } from "@/components/react-bits";

export function LeadForm() {
  const { openContact } = useApp();

  return (
    <section id="contact" className="section-x bg-paper py-16 md:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <FadeContent>
          <div>
            <p className="meta text-leaf">{contact.eyebrow}</p>
            <h2 className="display mt-3 max-w-[14ch] text-[clamp(1.7rem,4.2vw,3.2rem)] leading-[0.96]">
              {contact.heading}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{contact.text}</p>
            <div className="mt-7">
              <Button
                href="#contact"
                magnetic
                onClick={(e) => {
                  e.preventDefault();
                  openContact();
                }}
              >
                {contact.submit}
              </Button>
            </div>
          </div>
        </FadeContent>

        <AnimatedContent delay={0.1} distance={28}>
          <MediaFrame
            src={contact.image}
            alt={contact.alt}
            className="aspect-[16/11] rounded-[24px] md:aspect-[5/3]"
            sizes="(min-width: 1024px) 42vw, 100vw"
            kenBurns
          />
        </AnimatedContent>
      </div>
    </section>
  );
}
