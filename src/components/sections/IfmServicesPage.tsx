"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { servicePages } from "@/content/service-pages";
import { servicePageMedia } from "@/content/service-media";
import { nav, solutions } from "@/content/site";
import { useApp } from "@/components/providers/AppProviders";
import { cn } from "@/lib/cn";

const page = servicePages["ifm-services"];
const media = servicePageMedia["ifm-services"];

const advantage =
  page.sections.find((s) => s.type === "cards" && s.heading === "The Hazel India Advantage");
const process =
  page.sections.find((s) => s.type === "steps");
const properties =
  page.sections.find(
    (s) => s.type === "cards" && s.heading === "Facility Management for Different Properties",
  );
const faq = page.sections.find((s) => s.type === "faq");
const intro = page.sections.find((s) => s.type === "text");

const services = solutions.items;

export function IfmServicesPage() {
  const { openContact } = useApp();

  return (
    <main className="bg-paper text-ink">
      {/* Hero */}
      <header className="relative min-h-[70svh] overflow-hidden border-b border-line pt-[calc(max(0.75rem,env(safe-area-inset-top))+5.5rem)] md:min-h-[78svh]">
        <div className="absolute inset-0">
          <Image
            src={media.hero}
            alt={media.heroAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/82 via-ink/58 to-ink/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20" />
        </div>

        <div className="section-x relative mx-auto flex max-w-[1440px] flex-col justify-end pb-14 md:pb-20">
          <p className="meta text-mist/80">{page.header.eyebrow}</p>
          <h1 className="mt-3 max-w-[16ch] text-[clamp(2.15rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-paper">
            {page.header.heading}
          </h1>
          <p className="mt-5 max-w-[38rem] text-[16px] leading-relaxed text-paper/78 md:text-[18px]">
            {page.header.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openContact}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sun px-6 text-[14px] font-semibold text-hero-ink transition-colors hover:bg-sun-deep"
            >
              Get a Free Audit
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#ifm-services-list"
              className="inline-flex h-12 items-center justify-center rounded-full border border-paper/25 bg-paper/5 px-6 text-[14px] font-semibold text-paper backdrop-blur-sm transition-colors hover:bg-paper/12"
            >
              Explore services
            </a>
          </div>
        </div>
      </header>

      {/* Intro */}
      {intro && intro.type === "text" ? (
        <section className="section-x border-b border-hero-ink/8 bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <div>
              <p className="meta text-leaf">Overview</p>
              <h2 className="mt-3 max-w-[16ch] text-[clamp(1.75rem,3.5vw,2.85rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink">
                {intro.heading}
              </h2>
              <p className="mt-5 max-w-[36rem] text-[15px] leading-relaxed text-muted md:text-[17px]">
                {intro.body}
              </p>
            </div>
            {"highlights" in intro && intro.highlights ? (
              <ul className="border-t border-hero-ink/10">
                {intro.highlights.map((item, idx) => (
                  <li
                    key={item}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 border-b border-hero-ink/10 py-4"
                  >
                    <span className="font-mono text-[11px] tracking-[0.14em] text-leaf/75">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] font-medium tracking-tight text-hero-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Service lines — matched to navbar */}
      <section
        id="ifm-services-list"
        className="section-x bg-mint-2 py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <div>
              <p className="meta text-leaf">{nav.ifm.eyebrow}</p>
              <h2 className="mt-3 max-w-[18ch] text-[clamp(1.75rem,3.5vw,2.85rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink">
                Every service line. One accountable team.
              </h2>
            </div>
            <p className="max-w-md text-[14px] leading-relaxed text-muted md:text-[15px]">
              The same services listed in our IFM menu — each delivered by trained Hazel India teams under a single contract.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 xl:grid-cols-2">
            {services.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group grid h-full grid-cols-[112px_1fr] overflow-hidden rounded-[18px] bg-white ring-1 ring-hero-ink/8 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-22px_rgba(17,35,27,0.32)] hover:ring-leaf/20 sm:grid-cols-[132px_1fr]"
                >
                  <div className="relative min-h-[112px] bg-mint sm:min-h-full">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="132px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-col justify-center px-4 py-4 sm:px-5 sm:py-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] tracking-[0.14em] text-leaf/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-hero-ink transition-colors group-hover:text-leaf sm:text-[16px]">
                          {item.title}
                        </h3>
                      </div>
                      <ArrowUpRight
                        className="mt-1 size-4 shrink-0 text-hero-ink/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-leaf"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-[14px]">
                      {item.text}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Advantage */}
      {advantage && advantage.type === "cards" ? (
        <section className="section-x bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <p className="meta text-leaf">Why Hazel</p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(1.75rem,3.5vw,2.85rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink">
              {advantage.heading}
            </h2>
            <ul className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
              {advantage.items.map((item, i) => (
                <li
                  key={"title" in item ? item.title : i}
                  className="border-t border-hero-ink/10 py-6"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-leaf/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {"title" in item && item.title ? (
                    <h3 className="mt-2 text-[16px] font-semibold tracking-tight text-hero-ink">
                      {item.title}
                    </h3>
                  ) : null}
                  {"text" in item && item.text ? (
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                      {item.text}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Process */}
      {process && process.type === "steps" ? (
        <section className="section-x bg-mint-2 py-16 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <p className="meta text-leaf">How it works</p>
            <h2 className="mt-3 max-w-[20ch] text-[clamp(1.75rem,3.5vw,2.85rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink">
              {process.heading}
            </h2>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
              {process.items.map((step, idx) => (
                <li key={step.title} className="relative">
                  <span className="font-mono text-[28px] leading-none font-medium tracking-tight text-leaf/25 md:text-[34px]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-[16px] font-semibold tracking-tight text-hero-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Properties */}
      {properties && properties.type === "cards" ? (
        <section className="section-x bg-white py-16 md:py-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="meta text-leaf">Who we serve</p>
                <h2 className="mt-3 max-w-[18ch] text-[clamp(1.55rem,3vw,2.25rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-hero-ink">
                  {properties.heading}
                </h2>
              </div>
              {"intro" in properties && properties.intro ? (
                <p className="max-w-md text-[14px] leading-relaxed text-muted md:text-[15px]">
                  {properties.intro}
                </p>
              ) : null}
            </div>
            <ul className="mt-8 flex flex-wrap gap-2.5 md:mt-10">
              {properties.items.map((item) =>
                "title" in item && item.title ? (
                  <li
                    key={item.title}
                    className="rounded-full bg-mint-2 px-4 py-2.5 text-[13px] font-medium tracking-tight text-hero-ink ring-1 ring-hero-ink/8 sm:text-[14px]"
                  >
                    {item.title}
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {faq && faq.type === "faq" ? (
        <section className="section-x border-t border-hero-ink/8 bg-paper py-16 md:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="meta text-leaf">FAQ</p>
              <h2 className="mt-3 max-w-[14ch] text-[clamp(1.75rem,3.5vw,2.85rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-hero-ink">
                {faq.heading}
              </h2>
            </div>
            <div className="divide-y divide-hero-ink/10 border-y border-hero-ink/10">
              {faq.items.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="text-[16px] font-semibold tracking-tight text-hero-ink">
                    {item.q}
                  </h3>
                  <p className="mt-2 max-w-[40rem] text-[14px] leading-relaxed text-muted md:text-[15px]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing CTA */}
      <section className="section-x bg-charcoal py-16 text-paper md:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[34rem]">
            <p className="meta text-mist/60">Next step</p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
              Ready for one partner across every facility need?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/65 md:text-[16px]">
              Tell us about your site. We’ll send a free facility audit and a clear IFM plan — not a brochure guess.
            </p>
          </div>
          <button
            type="button"
            onClick={openContact}
            className={cn(
              "group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-sun px-6 text-[14px] font-semibold text-hero-ink transition-colors hover:bg-sun-deep",
            )}
          >
            Get a Free Audit
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>
    </main>
  );
}
