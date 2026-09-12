"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { faq, hazelAI, nav, pricing, problem, site, siteWalkthrough, trustStrip } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/providers/AppProviders";

type PanelItem = { label: string; href: string; text?: string };
type Panel = { eyebrow: string; heading: string; items: PanelItem[]; exploreHref?: string };

const appleEase = [0.32, 0.08, 0.24, 1] as const;
const IFM_KEY = "ifm";

const panels: Record<string, Panel> = {
  "#problem": {
    eyebrow: problem.eyebrow,
    heading: problem.heading,
    items: problem.pains.map((pain) => ({
      label: pain.title,
      href: "#problem",
      text: pain.text,
    })),
  },
  "#trust": {
    eyebrow: trustStrip.eyebrow,
    heading: trustStrip.heading,
    items: [
      ...trustStrip.today.items.map((item) => ({
        label: `${item.value} · ${item.label}`,
        href: "#trust",
        text: "note" in item && item.note ? item.note : trustStrip.today.label,
      })),
      ...trustStrip.ahead.items.map((item) => ({
        label: `${item.value} · ${item.label}`,
        href: "#trust",
        text: trustStrip.ahead.label,
      })),
    ],
  },
  "#ai": {
    eyebrow: hazelAI.eyebrow,
    heading: hazelAI.heading,
    items: hazelAI.states.map((state) => ({
      label: `${state.label} — ${state.title}`,
      href: "#ai",
      text: state.text,
    })),
  },
  "#walkthrough": {
    eyebrow: siteWalkthrough.eyebrow,
    heading: siteWalkthrough.heading,
    items: siteWalkthrough.images.slice(0, 6).map((image) => ({
      label: image.alt,
      href: "#walkthrough",
      text: "Tap to expand in the site gallery.",
    })),
  },
  "#pricing": {
    eyebrow: pricing.eyebrow,
    heading: pricing.heading,
    items: pricing.models.map((model) => ({
      label: model.title,
      href: "#pricing",
      text: `Best for: ${model.bestFor}. ${model.text}`,
    })),
  },
  "#faq": {
    eyebrow: faq.eyebrow,
    heading: faq.heading,
    items: faq.items.slice(0, 6).map((item) => ({
      label: item.q,
      href: "#faq",
      text: item.a,
    })),
  },
  [IFM_KEY]: {
    eyebrow: nav.ifm.eyebrow,
    heading: nav.ifm.heading,
    exploreHref: nav.ifm.overview.href,
    items: nav.ifm.items.map((item) => ({
      label: item.label,
      href: item.href,
      text: item.text,
    })),
  },
};

const desktopLinks = nav.links;

function isPageHref(href: string) {
  return href.startsWith("/") && !href.startsWith("/#");
}

export function Navbar() {
  const { scrollTo } = useApp();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileIfmOpen, setMobileIfmOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setActive(null);
    setMobileIfmOpen(false);
    if (isPageHref(href)) return;
    scrollTo(href);
  };

  const openPanel = (href: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActive(href);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActive(null), 180);
  };

  const panel = active ? panels[active] : null;
  const ifmOpen = active === IFM_KEY;

  return (
    <header
      className={cn(
        "section-x fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 md:pt-[max(1rem,env(safe-area-inset-top))] md:pb-4",
        open && "z-[75]",
      )}
    >
      <AnimatePresence>
        {panel ? (
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: appleEase }}
            className="fixed inset-0 z-0 bg-ink/20"
            onClick={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>

      <div
        className="relative z-10 mx-auto max-w-[1440px]"
        onMouseEnter={() => {
          if (closeTimer.current) window.clearTimeout(closeTimer.current);
        }}
        onMouseLeave={scheduleClose}
      >
        <div
          className={cn(
            "flex h-14 items-center gap-3 rounded-full bg-white/72 pr-2 pl-3 text-hero-ink shadow-[0_1px_2px_rgba(17,35,27,0.04),0_10px_30px_-14px_rgba(17,35,27,0.16)] ring-1 ring-hero-ink/6 backdrop-blur-md transition-[background-color,box-shadow] duration-300 md:h-16 md:gap-8 md:pr-2.5 md:pl-4",
            scrolled && "bg-white/85 shadow-[0_1px_2px_rgba(17,35,27,0.05),0_14px_36px_-16px_rgba(17,35,27,0.22)]",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} home`}
            onClick={(e) => {
              setOpen(false);
              setActive(null);
              setMobileIfmOpen(false);
              if (onHome) {
                e.preventDefault();
                scrollTo("#top");
              }
            }}
            className="flex min-w-0 shrink items-center gap-2.5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-moss text-[11px] font-semibold tracking-tight text-paper md:size-9">
              HI
            </span>
            <span className="truncate text-[14px] font-medium tracking-tight md:text-[15px]">{site.name}</span>
          </Link>

          <nav className="hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1" aria-label="Primary">
            {desktopLinks.map((link) => {
              const isOn = active === link.href;
              return (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  aria-expanded={isOn}
                  aria-haspopup="true"
                  onMouseEnter={() => openPanel(link.href)}
                  onFocus={() => openPanel(link.href)}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className={cn(
                    "rounded-full px-2.5 py-2 text-[13px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap transition-colors xl:px-3 xl:text-[13.5px]",
                    isOn ? "bg-hero-ink/5 text-hero-ink" : "text-hero-ink/70 hover:text-hero-ink",
                  )}
                >
                  {link.label}
                </a>
              );
            })}

            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={ifmOpen}
              onMouseEnter={() => openPanel(IFM_KEY)}
              onFocus={() => openPanel(IFM_KEY)}
              onClick={() => setActive(ifmOpen ? null : IFM_KEY)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-[13px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap transition-colors xl:px-3 xl:text-[13.5px]",
                ifmOpen ? "bg-hero-ink/5 text-hero-ink" : "text-hero-ink/70 hover:text-hero-ink",
              )}
            >
              {nav.ifm.label}
              <ChevronDown className={cn("size-3.5 transition-transform duration-200", ifmOpen && "rotate-180")} />
            </button>
          </nav>

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <Button
              href={nav.cta.href}
              magnetic
              onClick={(e) => {
                e.preventDefault();
                go(nav.cta.href);
              }}
              className="h-11 !py-0 !text-[13.5px]"
              arrow={
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              }
            >
              {nav.cta.label}
            </Button>
          </div>

          <button
            type="button"
            className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-full border border-hero-ink/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        <AnimatePresence>
          {panel ? (
            <motion.div
              key="nav-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.38, ease: appleEase }}
              className="absolute inset-x-0 top-full z-20 hidden pt-2 lg:block"
            >
              <div className="overflow-hidden rounded-[24px] bg-white/92 text-hero-ink shadow-[0_18px_50px_-20px_rgba(17,35,27,0.25)] ring-1 ring-hero-ink/6 backdrop-blur-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: appleEase }}
                    className="px-6 py-6 md:px-8 md:py-7"
                  >
                    <div className="mb-5 flex items-end justify-between gap-6">
                      <div>
                        <p className="meta text-leaf">{panel.eyebrow}</p>
                        <p className="display mt-2 max-w-[22ch] text-[clamp(1.4rem,2.4vw,2.1rem)]">{panel.heading}</p>
                      </div>
                      {panel.exploreHref ? (
                        <Link
                          href={panel.exploreHref}
                          onClick={() => setActive(null)}
                          className="mb-1 hidden items-center gap-1 text-[13px] font-medium text-ink/70 hover:text-leaf xl:flex"
                        >
                          {nav.ifm.overview.label}
                          <ArrowUpRight className="size-3.5" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => go(active!)}
                          className="mb-1 hidden items-center gap-1 text-[13px] font-medium text-ink/70 hover:text-leaf xl:flex"
                        >
                          Explore
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      )}
                    </div>
                    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                      {panel.items.map((item) => (
                        <li key={item.label}>
                          {isPageHref(item.href) ? (
                            <Link
                              href={item.href}
                              onClick={() => setActive(null)}
                              className="group block rounded-xl py-1.5 transition-colors hover:text-leaf"
                            >
                              <span className="block text-[15px] font-medium tracking-tight">{item.label}</span>
                              {item.text ? (
                                <span className="mt-1 block max-w-[36ch] text-[12px] leading-snug text-muted group-hover:text-ink/60">
                                  {item.text}
                                </span>
                              ) : null}
                            </Link>
                          ) : (
                            <a
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault();
                                go(item.href);
                              }}
                              className="group block rounded-xl py-1.5 transition-colors hover:text-leaf"
                            >
                              <span className="block text-[15px] font-medium tracking-tight">{item.label}</span>
                              {item.text ? (
                                <span className="mt-1 block max-w-[36ch] text-[12px] leading-snug text-muted group-hover:text-ink/60">
                                  {item.text}
                                </span>
                              ) : null}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink text-paper lg:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-5 pt-[env(safe-area-inset-top)] sm:h-20">
              <span className="text-[15px] font-medium">{site.name}</span>
              <button
                type="button"
                className="grid size-11 place-items-center"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav
              className="flex flex-1 flex-col gap-1 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6"
              aria-label="Mobile"
            >
              {desktopLinks.map((link, i) => (
                <motion.a
                  key={link.href + link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className="display py-2 text-[clamp(1.65rem,8vw,3rem)] leading-[1.05]"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * desktopLinks.length, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  aria-expanded={mobileIfmOpen}
                  onClick={() => setMobileIfmOpen((v) => !v)}
                  className="display flex w-full items-center justify-between py-2 text-left text-[clamp(1.65rem,8vw,3rem)] leading-[1.05]"
                >
                  {nav.ifm.label}
                  <ChevronDown className={cn("size-6 shrink-0 transition-transform", mobileIfmOpen && "rotate-180")} />
                </button>
                {mobileIfmOpen ? (
                  <div className="mb-4 space-y-1">
                    <Link
                      href={nav.ifm.overview.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl py-2 text-[15px] font-medium text-mist"
                    >
                      {nav.ifm.overview.label}
                    </Link>
                    {nav.ifm.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl py-2"
                      >
                        <span className="block text-[15px] font-medium text-paper">{item.label}</span>
                        <span className="mt-1 block text-[12px] leading-snug text-paper/55">{item.text}</span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-auto pt-8"
              >
                <Button
                  href={nav.cta.href}
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    go(nav.cta.href);
                  }}
                >
                  {nav.cta.label}
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
