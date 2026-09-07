"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { contact } from "@/content/site";
import { ContactForm } from "@/components/sections/ContactForm";
import { useApp } from "@/components/providers/AppProviders";

const SEEN_KEY = "hazel-contact-seen";
const DONE_KEY = "hazel-contact-done";

export function ContactPopup() {
  const { ready, contactOpen, openContact, closeContact } = useApp();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest('a[href="#contact"]');
      if (!link) return;
      event.preventDefault();
      openContact();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openContact]);

  useEffect(() => {
    if (!ready || contactOpen) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY) || sessionStorage.getItem(DONE_KEY)) return;
    } catch {
      /* continue */
    }

    let shown = false;
    let scrollTimer: number | null = null;
    const show = () => {
      if (shown) return;
      shown = true;
      window.clearTimeout(dwellTimer);
      if (scrollTimer) window.clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      openContact();
    };

    const onScroll = () => {
      if (scrollTimer != null) return;
      scrollTimer = window.setTimeout(show, 10_000);
    };

    const dwellTimer = window.setTimeout(show, 30_000);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      window.clearTimeout(dwellTimer);
      if (scrollTimer) window.clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
    };
  }, [ready, contactOpen, openContact]);

  useEffect(() => {
    if (!contactOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContact();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [contactOpen, closeContact]);

  return (
    <AnimatePresence>
      {contactOpen ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <button
            type="button"
            aria-label="Close contact form"
            className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
            onClick={closeContact}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[min(92dvh,44rem)] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-paper p-5 shadow-[0_24px_80px_rgba(14,26,18,0.22)] md:p-8"
          >
            <button
              type="button"
              onClick={closeContact}
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full border border-line text-ink/70 hover:text-ink"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <p className="meta text-leaf">{contact.eyebrow}</p>
            <h2
              id="contact-popup-title"
              className="display mt-3 max-w-[16ch] pr-10 text-[clamp(1.6rem,4vw,2.6rem)] leading-[0.96]"
            >
              {contact.heading}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{contact.text}</p>
            <div className="mt-6">
              <ContactForm compact />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
