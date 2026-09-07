"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { about, hazelAI, impact, machinery, nav, promise, services, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/providers/AppProviders";

type PanelItem = { label: string; href: string; text?: string };
type Panel = { eyebrow: string; heading: string; items: PanelItem[] };

const appleEase = [0.32, 0.08, 0.24, 1] as const;

const panels: Record<string, Panel> = {
  "#about": {
    eyebrow: "Get to know us",
    heading: "Planet, people, intelligence.",
    items: about.tabs.map((tab) => ({
      label: tab.label,
      href: "#about",
      text: tab.title,
    })),
  },
  "#services": {
    eyebrow: "What we do",
    heading: "One partner for every space.",
    items: services.items.map((item) => ({
      label: item.title,
      href: "#services",
      text: item.text,
    })),
  },
  "#ai": {
    eyebrow: "HazelAI",
    heading: "Predict. Sense. Prove. Serve.",
    items: hazelAI.states.map((state) => ({
      label: state.title,
      href: "#ai",
      text: state.text,
    })),
  },
  "#impact": {
    eyebrow: "Impact",
    heading: "The opportunity we are building into.",
    items: impact.stats.map((stat) => ({
      label: `${stat.n} · ${stat.title}`,
      href: "#impact",
      text: stat.text,
    })),
  },
  "#machinery": {
    eyebrow: "Equipment",
    heading: "Machines behind a lighter footprint.",
    items: machinery.items.slice(0, 6).map((item) => ({
      label: item.title,
      href: "#machinery",
      text: item.metricLabel,
    })),
  },
  "#promise": {
    eyebrow: "Green Impact",
    heading: promise.heading,
    items: promise.stats.map((stat) => ({
      label: `${stat.value}${stat.suffix} ${stat.label}`,
      href: "#promise",
    })),
  },
};

const desktopLinks = [...nav.links, nav.greenImpact];

export function Navbar() {
  const { scrollTo } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:p-4 md:pt-[max(1rem,env(safe-area-inset-top))]">
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
            "flex h-14 items-center gap-3 rounded-full bg-[#e7eadc]/94 pr-2 pl-3 shadow-[0_10px_40px_rgba(14,26,18,0.10)] backdrop-blur-xl md:h-16 md:gap-8 md:pr-2.5 md:pl-4",
            scrolled && "shadow-[0_12px_48px_rgba(14,26,18,0.14)]",
          )}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="flex min-w-0 shrink items-center gap-2.5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-moss text-[11px] font-semibold tracking-tight text-paper md:size-9">
              HI
            </span>
            <span className="truncate text-[14px] font-medium tracking-tight md:text-[15px]">{site.name}</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary">
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
                    "rounded-full px-3 py-2 text-[13px] leading-none font-medium tracking-[-0.01em] whitespace-nowrap transition-colors",
                    isOn ? "bg-ink/6 text-ink" : "text-ink/80 hover:text-leaf",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <Button
              href={nav.cta.href}
              magnetic
              onClick={(e) => {
                e.preventDefault();
                go(nav.cta.href);
              }}
              className="!py-2.5 !text-[13px]"
            >
              {nav.cta.label}
            </Button>
          </div>

          <button
            type="button"
            className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-full border border-line lg:hidden"
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
              <div className="overflow-hidden rounded-[24px] bg-[#e7eadc]/96 shadow-[0_18px_50px_rgba(14,26,18,0.14)] backdrop-blur-xl">
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
                      <button
                        type="button"
                        onClick={() => go(active!)}
                        className="mb-1 hidden items-center gap-1 text-[13px] font-medium text-ink/70 hover:text-leaf xl:flex"
                      >
                        Explore
                        <ArrowUpRight className="size-3.5" />
                      </button>
                    </div>
                    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                      {panel.items.map((item) => (
                        <li key={item.label}>
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-auto pt-8"
              >
                <Button
                  href={nav.cta.href}
                  variant="inverse"
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
