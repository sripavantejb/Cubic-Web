"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { faq, groupByServiceCategory, nav, problem, site, trustStrip } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { useApp } from "@/components/providers/AppProviders";

type PanelItem = { label: string; href: string; text?: string };
type PanelGroup = { label?: string; items: PanelItem[] };
type Panel = {
  eyebrow: string;
  heading: string;
  items: PanelItem[];
  groups?: PanelGroup[];
  exploreHref?: string;
};

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
        text: trustStrip.today.label,
      })),
      ...trustStrip.ahead.items.map((item) => ({
        label: `${item.value} · ${item.label}`,
        href: "#trust",
        text: trustStrip.ahead.label,
      })),
    ],
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
    groups: groupByServiceCategory(nav.ifm.items).map((group) => ({
      label: group.label,
      items: group.items.map((item) => ({
        label: item.label,
        href: item.href,
        text: item.text,
      })),
    })),
  },
};

const ifmGroups = groupByServiceCategory(nav.ifm.items);

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

  const closeMenus = () => {
    setOpen(false);
    setActive(null);
    setMobileIfmOpen(false);
  };

  const go = (href: string) => {
    closeMenus();
    if (isPageHref(href)) return;
    if (href.startsWith("#") && !onHome) {
      window.location.href = `/${href}`;
      return;
    }
    scrollTo(href);
  };

  const openPanel = (key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActive(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActive(null), 160);
  };

  const panel = active ? panels[active] : null;
  const ifmOpen = active === IFM_KEY;

  const navItemClass = (isOn: boolean) =>
    cn(
      "rounded-full px-3 py-2 text-[12.5px] leading-none font-medium tracking-[-0.015em] whitespace-nowrap transition-colors duration-200 xl:px-3.5 xl:text-[13px]",
      isOn
        ? "bg-leaf/10 text-leaf"
        : "text-hero-ink/60 hover:bg-mint/80 hover:text-hero-ink",
    );

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
            transition={{ duration: 0.28, ease: appleEase }}
            className="fixed inset-0 z-0 bg-ink/15"
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
            "flex h-[3.5rem] items-center gap-4 rounded-full bg-white/80 pr-2 pl-3.5 text-hero-ink shadow-[0_1px_2px_rgba(17,35,27,0.04),0_12px_32px_-16px_rgba(17,35,27,0.18)] ring-1 ring-hero-ink/6 backdrop-blur-md transition-[background-color,box-shadow,height] duration-300 md:h-16 md:gap-6 md:pr-2.5 md:pl-5",
            scrolled && "bg-white/92 shadow-[0_1px_2px_rgba(17,35,27,0.05),0_16px_40px_-18px_rgba(17,35,27,0.24)]",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} home`}
            onClick={(e) => {
              closeMenus();
              if (onHome) {
                e.preventDefault();
                scrollTo("#top");
              }
            }}
            className="flex shrink-0 items-center"
          >
            <Logo priority className="h-8 md:h-9" />
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {desktopLinks.map((link) => {
              const isOn = active === link.href;
              const hasPanel = link.href in panels;

              if (isPageHref(link.href)) {
                return (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    onMouseEnter={scheduleClose}
                    onClick={closeMenus}
                    className={navItemClass(false)}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <a
                  key={link.href + link.label}
                  href={onHome ? link.href : `/${link.href}`}
                  aria-expanded={hasPanel ? isOn : undefined}
                  aria-haspopup={hasPanel ? "true" : undefined}
                  onMouseEnter={() => {
                    if (hasPanel) openPanel(link.href);
                    else scheduleClose();
                  }}
                  onFocus={() => {
                    if (hasPanel) openPanel(link.href);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className={navItemClass(isOn)}
                >
                  {link.label}
                </a>
              );
            })}

            <span
              className="mx-1.5 hidden h-4 w-px bg-hero-ink/10 xl:block"
              aria-hidden="true"
            />

            <div className="relative" onMouseEnter={() => openPanel(IFM_KEY)}>
              <Link
                href={nav.ifm.overview.href}
                aria-haspopup="true"
                aria-expanded={ifmOpen}
                onClick={closeMenus}
                className={cn(
                  navItemClass(ifmOpen),
                  "inline-flex items-center gap-1",
                )}
              >
                {nav.ifm.label}
                <ChevronDown
                  className={cn(
                    "size-3.5 opacity-60 transition-transform duration-200",
                    ifmOpen && "rotate-180 opacity-100",
                  )}
                />
              </Link>
            </div>
          </nav>

          <div className="ml-auto hidden shrink-0 items-center lg:flex">
            <Button
              href={nav.cta.href}
              magnetic
              onClick={(e) => {
                e.preventDefault();
                go(nav.cta.href);
              }}
              className="h-10 !px-5 !py-0 !text-[13px] md:h-11"
              arrow={
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              }
            >
              {nav.cta.label}
            </Button>
          </div>

          <button
            type="button"
            className="ml-auto flex size-10 shrink-0 items-center justify-center rounded-full border border-hero-ink/10 transition-colors hover:bg-mint lg:hidden"
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.32, ease: appleEase }}
              className="absolute inset-x-0 top-full z-20 hidden pt-2 lg:block"
            >
              <div className="overflow-hidden rounded-[22px] bg-white/95 text-hero-ink shadow-[0_18px_50px_-20px_rgba(17,35,27,0.28)] ring-1 ring-hero-ink/8 backdrop-blur-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.24, ease: appleEase }}
                    className={cn(ifmOpen ? "px-6 py-5 md:px-7" : "px-6 py-6 md:px-8 md:py-7")}
                  >
                    <div
                      className={cn(
                        "flex justify-between gap-6 border-b border-hero-ink/8",
                        ifmOpen ? "mb-4 items-center pb-3.5" : "mb-5 items-end pb-5",
                      )}
                    >
                      <div>
                        <p className="meta text-leaf">{panel.eyebrow}</p>
                        {ifmOpen ? null : (
                          <p className="mt-2 max-w-[28ch] text-[clamp(1.2rem,2vw,1.55rem)] leading-snug font-semibold tracking-[-0.025em] text-hero-ink">
                            {panel.heading}
                          </p>
                        )}
                      </div>
                      {panel.exploreHref ? (
                        <Link
                          href={panel.exploreHref}
                          onClick={closeMenus}
                          className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-[12px] font-semibold tracking-tight text-hero-ink transition-colors hover:bg-leaf/15 hover:text-leaf"
                        >
                          {nav.ifm.overview.label}
                          <ArrowUpRight className="size-3.5" />
                        </Link>
                      ) : active ? (
                        <button
                          type="button"
                          onClick={() => go(active)}
                          className="mb-0.5 hidden items-center gap-1.5 rounded-full bg-mint px-3.5 py-2 text-[12px] font-semibold tracking-tight text-hero-ink transition-colors hover:bg-leaf/15 hover:text-leaf xl:inline-flex"
                        >
                          Go to section
                          <ArrowUpRight className="size-3.5" />
                        </button>
                      ) : null}
                    </div>

                    {ifmOpen && panel.groups ? (
                      <div className="grid grid-cols-[2fr_1fr] gap-8">
                        {panel.groups.map((group, gi) => (
                          <div
                            key={group.label ?? gi}
                            className={cn(gi > 0 && "border-l border-hero-ink/8 pl-8")}
                          >
                            <p className="mb-2 text-[10.5px] font-semibold tracking-[0.14em] text-leaf uppercase">
                              {group.label}
                            </p>
                            <ul className={cn("grid gap-x-6", gi === 0 && "grid-cols-2")}>
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={closeMenus}
                                    className="group -mx-2 flex items-center justify-between gap-2 rounded-[10px] px-2 py-1.5 text-[13.5px] font-medium tracking-tight text-hero-ink/85 transition-colors hover:bg-mint hover:text-leaf"
                                  >
                                    {item.label}
                                    <ArrowUpRight className="size-3 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                    <div className="space-y-5">
                      {(panel.groups ?? [{ items: panel.items }]).map((group) => (
                        <div key={group.label ?? "items"}>
                          {group.label ? (
                            <p className="mb-2 px-3.5 text-[11px] font-semibold tracking-[0.14em] text-leaf uppercase">
                              {group.label}
                            </p>
                          ) : null}
                          <ul
                            className={cn(
                              "grid gap-1.5",
                              ifmOpen
                                ? "sm:grid-cols-2 xl:grid-cols-3"
                                : "sm:grid-cols-2",
                            )}
                          >
                            {group.items.map((item) => (
                              <li key={item.label}>
                                {isPageHref(item.href) ? (
                                  <Link
                                    href={item.href}
                                    onClick={closeMenus}
                                    className="group flex items-start justify-between gap-3 rounded-[14px] px-3.5 py-3 transition-colors hover:bg-mint"
                                  >
                                    <span>
                                      <span className="block text-[14px] font-semibold tracking-tight text-hero-ink transition-colors group-hover:text-leaf">
                                        {item.label}
                                      </span>
                                      {item.text ? (
                                        <span className="mt-1 block max-w-[36ch] text-[12.5px] leading-snug text-muted">
                                          {item.text}
                                        </span>
                                      ) : null}
                                    </span>
                                    <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-hero-ink/20 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-leaf" />
                                  </Link>
                                ) : (
                                  <a
                                    href={onHome ? item.href : `/${item.href}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      go(item.href);
                                    }}
                                    className="group flex items-start justify-between gap-3 rounded-[14px] px-3.5 py-3 transition-colors hover:bg-mint"
                                  >
                                    <span>
                                      <span className="block text-[14px] font-semibold tracking-tight text-hero-ink transition-colors group-hover:text-leaf">
                                        {item.label}
                                      </span>
                                      {item.text ? (
                                        <span className="mt-1 block max-w-[36ch] text-[12.5px] leading-snug text-muted">
                                          {item.text}
                                        </span>
                                      ) : null}
                                    </span>
                                    <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-hero-ink/20 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-leaf" />
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    )}
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
              <Logo className="h-10 brightness-0 invert" />
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
              {desktopLinks.map((link, i) =>
                isPageHref(link.href) ? (
                  <motion.div
                    key={link.href + link.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenus}
                      className="display block py-2 text-[clamp(1.65rem,8vw,3rem)] leading-[1.05]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.href + link.label}
                    href={link.href.startsWith("#") ? `/${link.href}` : link.href}
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
                ),
              )}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * desktopLinks.length, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between gap-3 py-2">
                  <Link
                    href={nav.ifm.overview.href}
                    onClick={closeMenus}
                    className="display text-[clamp(1.65rem,8vw,3rem)] leading-[1.05]"
                  >
                    {nav.ifm.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={mobileIfmOpen}
                    aria-label="Toggle IFM services list"
                    onClick={() => setMobileIfmOpen((v) => !v)}
                    className="grid size-11 place-items-center rounded-full border border-paper/15"
                  >
                    <ChevronDown
                      className={cn(
                        "size-5 transition-transform",
                        mobileIfmOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>
                {mobileIfmOpen ? (
                  <div className="mb-4 space-y-0.5 border-t border-paper/10 pt-3">
                    <Link
                      href={nav.ifm.overview.href}
                      onClick={closeMenus}
                      className="block rounded-xl px-2 py-2.5 text-[15px] font-medium text-mist"
                    >
                      {nav.ifm.overview.label}
                    </Link>
                    {ifmGroups.map((group) => (
                      <div key={group.id} className="pt-3">
                        <p className="px-2 pb-1 text-[11px] font-semibold tracking-[0.14em] text-mist/70 uppercase">
                          {group.label}
                        </p>
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenus}
                            className="block rounded-xl px-2 py-2.5"
                          >
                            <span className="block text-[15px] font-medium text-paper">
                              {item.label}
                            </span>
                            <span className="mt-1 block text-[12px] leading-snug text-paper/55">
                              {item.text}
                            </span>
                          </Link>
                        ))}
                      </div>
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
