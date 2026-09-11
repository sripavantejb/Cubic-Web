import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicePages, type ServicePageSlug } from "@/content/service-pages";
import { servicePageMedia, type ServiceMediaSlug } from "@/content/service-media";
import { site } from "@/content/site";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";

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

  const media = servicePageMedia[slug as ServiceMediaSlug];
  let cardImageIndex = 0;

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

        <div className="mx-auto max-w-[1280px] space-y-16 px-5 py-14 md:space-y-20 md:px-8 md:py-20">
          {page.sections.map((section, i) => {
            const galleryImage =
              media && section.type === "text" ? media.gallery[i % media.gallery.length] : null;

            return (
              <section key={`${section.type}-${section.heading ?? i}`}>
                {section.type === "text" ? (
                  <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                    <div>
                      {section.heading ? (
                        <h2 className="max-w-[28ch] text-[clamp(1.4rem,2.4vw,2rem)] leading-tight font-semibold tracking-[-0.02em]">
                          {section.heading}
                        </h2>
                      ) : null}
                      {"body" in section ? (
                        <div className="mt-5 max-w-[48rem] space-y-4 text-[1.05rem] leading-relaxed text-ink/85">
                          {section.body.split(/\n{2,}/).map((para) => (
                            <p key={para.slice(0, 48)}>{para}</p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    {galleryImage ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-mint">
                        <Image
                          src={galleryImage}
                          alt={media?.heroAlt ?? ""}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <>
                    {section.heading ? (
                      <h2 className="max-w-[28ch] text-[clamp(1.4rem,2.4vw,2rem)] leading-tight font-semibold tracking-[-0.02em]">
                        {section.heading}
                      </h2>
                    ) : null}

                    {"intro" in section && section.intro ? (
                      <p className="mt-3 max-w-[48rem] text-muted">{section.intro}</p>
                    ) : null}

                    {section.type === "cards" && "items" in section ? (
                      <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {section.items.map((item) => {
                          // Only attach distinct service photos (IFM hub). Single-service
                          // pages keep imagery in the hero / intro — not repeated on every card.
                          const useServicePhoto = Boolean(media && media.gallery.length > 1);
                          const img = useServicePhoto
                            ? media.gallery[cardImageIndex % media.gallery.length]
                            : null;
                          if (useServicePhoto) cardImageIndex += 1;
                          const href = "href" in item ? item.href : "";
                          const inner = (
                            <>
                              {img ? (
                                <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[14px] bg-mint">
                                  <Image
                                    src={img}
                                    alt={"title" in item && item.title ? item.title : ""}
                                    fill
                                    sizes="(min-width: 1280px) 22vw, (min-width: 640px) 40vw, 100vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                  />
                                </div>
                              ) : null}
                              {"icon" in item && item.icon && !img ? (
                                <span className="text-xl" aria-hidden="true">
                                  {item.icon}
                                </span>
                              ) : null}
                              {"title" in item && item.title ? (
                                <h3 className="text-[1.05rem] font-semibold tracking-tight">
                                  {item.title}
                                </h3>
                              ) : null}
                              {"text" in item && item.text ? (
                                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                                  {item.text}
                                </p>
                              ) : null}
                            </>
                          );
                          return (
                            <li key={"title" in item ? item.title : String(item)}>
                              {href ? (
                                <Link
                                  href={href}
                                  className="group block rounded-[18px] transition-colors hover:text-leaf"
                                >
                                  {inner}
                                </Link>
                              ) : (
                                <div className="group">{inner}</div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}

                    {section.type === "steps" && "items" in section ? (
                      <ol className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {section.items.map((step, idx) => (
                          <li key={step.title} className="relative">
                            <div className="mb-3 flex size-9 items-center justify-center rounded-full bg-moss text-sm font-semibold text-paper">
                              {idx + 1}
                            </div>
                            <h3 className="text-[1.05rem] font-semibold tracking-tight">{step.title}</h3>
                            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
                          </li>
                        ))}
                      </ol>
                    ) : null}

                    {section.type === "faq" && "items" in section ? (
                      <div className="mt-8 divide-y divide-line border-y border-line">
                        {section.items.map((faq) => (
                          <div key={faq.q} className="py-5">
                            <p className="font-semibold tracking-tight">{faq.q}</p>
                            <p className="mt-2 max-w-[48rem] text-[0.95rem] leading-relaxed text-muted">
                              {faq.a}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </>
                )}
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
