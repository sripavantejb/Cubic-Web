"use client";

import { story } from "@/content/site";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { MediaFrame } from "@/components/media/MediaFrame";

export function CompanyStory() {
  return (
    <SectionFrame className="overflow-hidden bg-moss text-paper">
      <div className="grid min-h-0 flex-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="font-deva text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.85] tracking-tight">
            {story.coreWord}
          </p>
          <p className="meta mt-3 text-mist">{story.coreCaption}</p>
          <p className="meta mt-8 text-mist/80">{story.eyebrow}</p>
          <h2 className="display mt-3 max-w-[16ch] text-[clamp(1.5rem,3.2vw,2.6rem)]">
            {story.heading}
          </h2>
          <div className="mt-5 max-w-2xl space-y-3">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[14px] leading-relaxed text-mist/90 md:text-[15px]">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="grid min-h-0 grid-cols-2 grid-rows-[1.1fr_0.9fr] gap-3">
          <MediaFrame
            src={story.images[0].src}
            alt={story.images[0].alt}
            className="col-span-2 min-h-0"
            sizes="(min-width: 1024px) 40vw, 100vw"
            kenBurns
          />
          <MediaFrame
            src={story.images[1].src}
            alt={story.images[1].alt}
            className="min-h-0"
            sizes="20vw"
            kenBurns
          />
          <MediaFrame
            src={story.images[2].src}
            alt={story.images[2].alt}
            className="min-h-0"
            sizes="20vw"
            kenBurns
          />
        </div>
      </div>
    </SectionFrame>
  );
}
