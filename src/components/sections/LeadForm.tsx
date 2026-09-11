"use client";

import { contact } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/providers/AppProviders";
import { AnimatedContent, FadeContent } from "@/components/react-bits";

export function LeadForm() {
  const { openContact } = useApp();

  return (
    <section id="contact" className="section-x bg-paper py-16 md:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <FadeContent>
          <div>
            <p className="meta text-leaf">{contact.eyebrow}</p>
            <h2 className="display mt-3 max-w-[14ch] text-[clamp(1.7rem,4.2vw,3.2rem)] leading-[0.96]">
              {contact.heading}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{contact.text}</p>
          </div>
        </FadeContent>
        <AnimatedContent delay={0.1} distance={24}>
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
        </AnimatedContent>
      </div>
    </section>
  );
}
