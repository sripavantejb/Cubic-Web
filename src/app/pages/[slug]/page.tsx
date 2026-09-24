import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicePages, type ServicePageSlug } from "@/content/service-pages";
import { servicePageMedia, type ServiceMediaSlug } from "@/content/service-media";
import { site } from "@/content/site";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { ServiceCardIcon } from "@/components/ui/ServiceCardIcon";
import { IfmServicesPage } from "@/components/sections/IfmServicesPage";

const slugs = Object.keys(servicePages) as ServicePageSlug[];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages[slug as ServicePageSlug];
  if (!page) return { title: "Page not found" };
  return {
    title: `${page.title} — ${site.name}`,
    description: page.header.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = servicePages[slug as ServicePageSlug];
  if (!page || !page.visible) notFound();

  if (slug === "ifm-services") {
    return (
      <>
        <Navbar />
        <IfmServicesPage />
        <Footer />
      </>
    );
  }

  const media = servicePageMedia[slug as ServiceMediaSlug];

  return (
    <>
      <Navbar />
      <main className="bg-paper text-ink">
        <header className="relative overflow-hidden border-b border-line pt-[calc(max(0.75rem,env(safe-area-inset-top))+5.5rem)]">
          {media ? (
            <div className="absolute inset-0">
              <Image
                src={media.hero}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/78 via-ink/55 to-ink/25" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-mint-2" />
          )}

          <div className="relative mx-auto max-w-[1280px] px-5 pt-10 pb-14 md:px-8 md:pt-14 md:pb-20">
            {page.header.eyebrow ? (
              <p className={`text-[0.78rem] font-semibold tracking-[0.04em] ${media ? "text-mist" : "text-moss"}`}>
                {page.header.eyebrow}
              </p>
            ) : null}
            <h1
              className={`mt-3 max-w-[18ch] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] ${media ? "text-paper" : "text-ink"}`}
            >
              {page.header.heading || page.title}
            </h1>
            {page.header.description ? (
              <p
                className={`mt-4 max-w-[40rem] text-[1.05rem] leading-relaxed ${media ? "text-paper/78" : "text-muted"}`}
              >
                {page.header.description}
              </p>
            ) : null}
          </div>
        </header>

        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8 md:py-20">
          {(() => {
            const textSections = page.sections.filter((s) => s.type === "text");
            const otherSections = page.sections.filter((s) => s.type !== "text");
            const intro = textSections[0];
            const gallery = media?.gallery?.length
              ? media.gallery
              : media?.hero
                ? [media.hero]
                : [];

            return (
              <>
                {intro ? (
                  <section className="lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12 xl:gap-16">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                      <p className="meta text-leaf">{page.header.eyebrow || page.title}</p>
                      {intro.heading ? (
                        <h2 className="mt-3 max-w-[14ch] text-[clamp(1.65rem,2.8vw,2.35rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-hero-ink">
                          {intro.heading}
                        </h2>
                      ) : null}
                      {"body" in intro ? (
                        <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-muted md:text-[16px]">
                          {intro.body.replace(/\n{2,}/g, " ")}
                        </p>
                      ) : null}

                      {"highlights" in intro && Array.isArray(intro.highlights) && intro.highlights.length > 0 ? (
                        <ul className="mt-8 max-w-[28rem] border-t border-hero-ink/10">
                          {intro.highlights.map((item, idx) => (
                            <li
                              key={item}
                              className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 border-b border-hero-ink/10 py-3.5"
                            >
                              <span className="font-mono text-[11px] tracking-[0.14em] text-leaf/75">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[14px] font-medium tracking-tight text-hero-ink md:text-[15px]">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="mt-8">
                        <Link
                          href="/#contact"
                          className="inline-flex h-11 items-center justify-center rounded-full bg-sun px-5 text-[14px] font-semibold text-hero-ink transition-colors hover:bg-sun-deep"
                        >
                          Get a Free Audit
                        </Link>
                      </div>
                    </div>

                    {gallery.length > 0 ? (
                      <div className="mt-10 space-y-5 lg:mt-0 lg:space-y-6">
                        {gallery.map((src, idx) => (
                          <div
                            key={`${src}-${idx}`}
                            className="overflow-hidden rounded-[22px] bg-mint shadow-[0_18px_40px_-28px_rgba(17,35,27,0.35)]"
                          >
                            <Image
                              src={src}
                              alt={media?.heroAlt ?? ""}
                              width={1536}
                              height={1024}
                              sizes="(min-width: 1024px) 46vw, 100vw"
                              className="block h-auto w-full"
                              priority={idx === 0}
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </section>
                ) : null}

                <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
                  {otherSections.map((section, i) => (
                    <section key={`${section.type}-${section.heading ?? i}`}>
                      {section.heading ? (
                        <h2 className="max-w-[22ch] text-[clamp(1.35rem,2.2vw,1.85rem)] leading-tight font-semibold tracking-[-0.02em] text-hero-ink">
                          {section.heading}
                        </h2>
                      ) : null}

                      {"intro" in section && section.intro ? (
                        <p className="mt-3 max-w-[40rem] text-[15px] text-muted">{section.intro}</p>
                      ) : null}

                      {section.type === "cards" && "items" in section ? (
                        <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                          {section.items.map((item) => {
                            const href = "href" in item ? item.href : "";
                            const cardClass =
                              "group flex h-full flex-col rounded-[20px] bg-white p-5 ring-1 ring-hero-ink/8 transition-[box-shadow,transform,color] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(17,35,27,0.35)] hover:ring-leaf/25 md:p-6";
                            const inner = (
                              <>
                                {"icon" in item && item.icon ? (
                                  <ServiceCardIcon name={item.icon} />
                                ) : null}
                                {"title" in item && item.title ? (
                                  <h3 className="text-[1.05rem] font-semibold tracking-tight text-hero-ink transition-colors group-hover:text-leaf">
                                    {item.title}
                                  </h3>
                                ) : null}
                                {"text" in item && item.text ? (
                                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">
                                    {item.text}
                                  </p>
                                ) : null}
                              </>
                            );
                            return (
                              <li key={"title" in item ? item.title : String(item)} className="h-full">
                                {href ? (
                                  <Link href={href} className={cardClass}>
                                    {inner}
                                  </Link>
                                ) : (
                                  <div className={cardClass}>{inner}</div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}

                      {section.type === "steps" && "items" in section ? (
                        <ol className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
                          {section.items.map((step, idx) => (
                            <li
                              key={step.title}
                              className="flex h-full flex-col rounded-[20px] bg-white p-5 ring-1 ring-hero-ink/8 md:p-6"
                            >
                              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-moss text-[13px] font-semibold tracking-tight text-paper">
                                {String(idx + 1).padStart(2, "0")}
                              </div>
                              <h3 className="text-[1.05rem] font-semibold tracking-tight text-hero-ink">
                                {step.title}
                              </h3>
                              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">
                                {step.text}
                              </p>
                            </li>
                          ))}
                        </ol>
                      ) : null}

                      {section.type === "faq" && "items" in section ? (
                        <div className="mt-8 divide-y divide-line border-y border-line">
                          {section.items.map((faq) => (
                            <div key={faq.q} className="py-5">
                              <p className="font-semibold tracking-tight text-hero-ink">{faq.q}</p>
                              <p className="mt-2 max-w-[48rem] text-[0.95rem] leading-relaxed text-muted">
                                {faq.a}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </section>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </main>
      <Footer />
    </>
  );
}
