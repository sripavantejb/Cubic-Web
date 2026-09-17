import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { careers, site } from "@/content/site";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";

export const metadata: Metadata = {
  title: `Careers — ${site.name}`,
  description: careers.lede,
};

export default function CareersPage() {
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent("Career application — Hazel India")}`;

  return (
    <>
      <Navbar />
      <main className="bg-paper text-ink">
        <header className="relative overflow-hidden border-b border-line pt-[calc(max(0.75rem,env(safe-area-inset-top))+5.5rem)]">
          <div className="absolute inset-0">
            <Image
              src="/images/people.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/25" />
          </div>

          <div className="relative mx-auto max-w-[1280px] px-5 pt-10 pb-14 md:px-8 md:pt-14 md:pb-20">
            <p className="text-[0.78rem] font-semibold tracking-[0.04em] text-mist">
              {careers.eyebrow}
            </p>
            <h1 className="mt-3 max-w-[16ch] text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-paper">
              {careers.heading}
            </h1>
            <p className="mt-4 max-w-[40rem] text-[1.05rem] leading-relaxed text-paper/78">
              {careers.lede}
            </p>
            <a
              href={mailHref}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-sun px-6 text-[14px] font-semibold text-hero-ink transition-colors hover:bg-sun-deep"
            >
              {careers.ctaLabel}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </header>

        <section className="section-x mx-auto max-w-[1280px] py-14 md:py-20">
          <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
            {careers.highlights.map((item) => (
              <li key={item.title}>
                <h2 className="text-[1.15rem] font-semibold tracking-tight text-ink">
                  {item.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-line bg-mint-2">
          <div className="section-x mx-auto max-w-[1280px] py-14 md:py-20">
            <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] text-ink">
              {careers.rolesHeading}
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {careers.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-[16px] border border-line bg-paper px-5 py-4 text-[15px] font-medium text-ink"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-x mx-auto max-w-[1280px] py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] text-ink">
              {careers.ctaHeading}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-[16px]">
              {careers.ctaText}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={mailHref}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-sun px-6 text-[14px] font-semibold text-hero-ink transition-colors hover:bg-sun-deep"
              >
                {careers.ctaLabel}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center rounded-full border border-line px-6 text-[14px] font-semibold text-ink transition-colors hover:border-leaf hover:text-leaf"
              >
                Contact Us
              </Link>
            </div>
            <p className="mt-4 text-[13px] text-muted">{careers.ctaNote}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
