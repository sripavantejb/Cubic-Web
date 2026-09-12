"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { footer, site } from "@/content/site";
import { useApp } from "@/components/providers/AppProviders";
import { cn } from "@/lib/cn";

function isPageHref(href: string) {
  return href.startsWith("/") && !href.startsWith("/#");
}

function FooterLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  const { scrollTo, openContact } = useApp();

  if (href === "#contact") {
    return (
      <button
        type="button"
        onClick={openContact}
        className={cn("text-left transition-colors hover:text-mist", className)}
      >
        {children}
      </button>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          scrollTo(href);
        }}
        className={cn("transition-colors hover:text-mist", className)}
      >
        {children}
      </a>
    );
  }

  if (isPageHref(href)) {
    return (
      <Link href={href} className={cn("transition-colors hover:text-mist", className)}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={cn("transition-colors hover:text-mist", className)}
    >
      {children}
    </a>
  );
}

const columns = [
  { heading: "Company", links: footer.company },
  { heading: "Services", links: footer.services },
  {
    heading: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      ...footer.social,
      ...footer.portals.slice(0, 2),
    ],
  },
] as const;

export function Footer() {
  const { openContact } = useApp();

  return (
    <footer className="relative overflow-hidden bg-charcoal text-paper">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src={footer.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/92 to-ink" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mist/25 to-transparent" />
      </div>

      <div className="section-x relative mx-auto max-w-[1440px] pt-14 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pt-20 md:pb-8">
        {/* CTA band */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between md:pb-12">
          <div className="max-w-[34rem]">
            <p className="meta text-mist/70">Hazel India</p>
            <p className="mt-3 text-[clamp(1.55rem,3.2vw,2.35rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
              Cleaner spaces. Greener operations. One accountable partner.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-paper/60 md:text-[15px]">
              {site.footerBlurb}
            </p>
          </div>

          <button
            type="button"
            onClick={openContact}
            className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-sun px-6 text-[14px] font-semibold text-hero-ink transition-colors hover:bg-sun-deep"
          >
            Get a free facility audit
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Link grid + contact */}
        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="grid grid-cols-2 gap-8 min-[520px]:grid-cols-3 sm:gap-10">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="meta mb-4 text-mist/55">{col.heading}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FooterLink
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-[13.5px] text-paper/60"
                      >
                        <span>{l.label}</span>
                        {isPageHref(l.href) || l.href.startsWith("http") ? (
                          <ArrowUpRight
                            className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
                            aria-hidden="true"
                          />
                        ) : null}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-7">
            <p className="meta text-mist/55">Reach us</p>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={site.emailHref}
                  className="group flex items-start gap-3 text-[14px] text-paper/75 transition-colors hover:text-mist"
                >
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-mist/10 text-mist">
                    <Mail className="size-3.5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] tracking-[0.14em] text-paper/40 uppercase">
                      Email
                    </span>
                    <span className="mt-0.5 block font-medium">{site.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="group flex items-start gap-3 text-[14px] text-paper/75 transition-colors hover:text-mist"
                >
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-mist/10 text-mist">
                    <Phone className="size-3.5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] tracking-[0.14em] text-paper/40 uppercase">
                      Phone
                    </span>
                    <span className="mt-0.5 block font-medium">{site.phone}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-paper/75">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-mist/10 text-mist">
                  <MapPin className="size-3.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[11px] tracking-[0.14em] text-paper/40 uppercase">
                    Based in
                  </span>
                  <span className="mt-0.5 block font-medium">Hyderabad, India</span>
                </span>
              </li>
            </ul>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-[11px] tracking-[0.14em] text-paper/40 uppercase">
                {footer.assocLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {footer.assocBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-mist/20 bg-mist/5 px-3 py-1.5 text-[11px] font-medium tracking-wide text-mist/90"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wordmark */}
        <div className="relative mt-14 overflow-x-clip md:mt-20">
          <p className="display select-none pb-[0.06em] text-[clamp(3.2rem,22vw,14.5rem)] leading-none tracking-[-0.06em] text-paper/[0.14]">
            <span className="relative inline-block bg-gradient-to-b from-paper/35 to-paper/[0.08] bg-clip-text text-transparent">
              HAZEL
              <span
                className="absolute top-[0.1em] -right-[0.2em] text-[0.1em] font-medium tracking-normal text-mist/50"
                aria-hidden
              >
                ©
              </span>
            </span>
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-white/8 pt-5 text-[12px] text-paper/40 sm:flex-row sm:items-center sm:justify-between md:mt-6">
          <p>{footer.copyright}</p>
          <p className="sm:text-right">
            <a
              href={footer.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-mist"
            >
              {footer.credit.label}
            </a>
          </p>
        </div>

        <p className="sr-only">
          {site.name}. {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
