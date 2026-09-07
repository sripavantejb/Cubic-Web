"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/components/providers/AppProviders";

export function Navbar() {
  const { scrollTo } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-3 md:p-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-[1440px] items-center gap-5 rounded-full bg-[#e7eadc]/92 pr-2 pl-3 shadow-[0_10px_40px_rgba(14,26,18,0.10)] backdrop-blur-xl transition-[box-shadow] duration-500 md:h-16 md:gap-8 md:pr-2.5 md:pl-4",
          scrolled && "shadow-[0_12px_48px_rgba(14,26,18,0.14)]",
        )}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-moss text-[11px] font-semibold tracking-tight text-paper md:size-9">
            HI
          </span>
          <span className="text-[14px] font-medium tracking-tight md:text-[15px]">{site.name}</span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              className="whitespace-nowrap text-[13px] leading-none font-medium tracking-[-0.01em] text-ink/80 transition-colors hover:text-leaf"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          <a
            href={nav.greenImpact.href}
            onClick={(e) => {
              e.preventDefault();
              go(nav.greenImpact.href);
            }}
            className="whitespace-nowrap text-[13px] leading-none font-medium text-ink/70 hover:text-leaf"
          >
            {nav.greenImpact.label}
          </a>
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
          className="ml-auto flex size-10 items-center justify-center rounded-full border border-line lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink text-paper lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-5">
              <span className="text-[15px] font-medium">{site.name}</span>
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-6 pt-8" aria-label="Mobile">
              {[...nav.links, nav.greenImpact].map((link, i) => (
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
                  className="display py-3 text-[12vw] leading-none"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-8"
              >
                <Button href={nav.cta.href} variant="inverse" onClick={(e) => { e.preventDefault(); go(nav.cta.href); }}>
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
