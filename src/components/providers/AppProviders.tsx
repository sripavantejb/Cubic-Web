"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useGSAP } from "@gsap/react";
import { bindLenisToGsap } from "@/animations/lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Grain } from "@/components/chrome/Grain";
import { PageLoader } from "@/components/chrome/PageLoader";
import { ContactPopup } from "@/components/chrome/ContactPopup";

type AppContextValue = {
  ready: boolean
  completeLoader: () => void
  scrollTo: (target: string) => void
  contactOpen: boolean
  openContact: () => void
  closeContact: () => void
};

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const completeLoader = useCallback(() => setReady(true), []);
  const openContact = useCallback(() => {
    try {
      sessionStorage.setItem("hazel-contact-seen", "1");
    } catch {
      /* ignore */
    }
    setContactOpen(true);
  }, []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  const scrollTo = useCallback((target: string) => {
    if (target === "#contact") {
      openContact();
      return;
    }
    if (target === "#top") {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { offset: 0 });
        return;
      }
      gsap.to(window, {
        duration: reduced ? 0 : 1.1,
        ease: "power3.inOut",
        scrollTo: { y: 0, autoKill: false },
        overwrite: true,
      });
      return;
    }
    const el = document.querySelector(target);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: -72 });
      return;
    }
    // Touch devices (no Lenis): a GSAP-driven scroll. A native smooth scroll is cancelled
    // whenever a ScrollTrigger refresh lands mid-flight, which the cinema video triggers.
    gsap.to(window, {
      duration: reduced ? 0 : 1.1,
      ease: "power3.inOut",
      scrollTo: { y: el, offsetY: 72, autoKill: false },
      overwrite: true,
    });
  }, [reduced, openContact]);

  useGSAP(() => {
    registerGsap();
    if (reduced) return;

    const touch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (touch) {
      ScrollTrigger.normalizeScroll(true);
      return () => {
        ScrollTrigger.normalizeScroll(false);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    const unbind = bindLenisToGsap(lenis, gsap, ScrollTrigger);

    return () => {
      unbind();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, { dependencies: [reduced] });

  useGSAP(() => {
    if (!ready) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => window.clearTimeout(id);
  }, { dependencies: [ready] });

  // Honor deep links like `/#machinery` when arriving from a service page.
  useGSAP(() => {
    if (!ready) return;
    const hash = window.location.hash;
    if (!hash || hash === "#top") return;
    const id = window.setTimeout(() => scrollTo(hash), 120);
    return () => window.clearTimeout(id);
  }, { dependencies: [ready, scrollTo] });

  const value = useMemo(
    () => ({ ready, completeLoader, scrollTo, contactOpen, openContact, closeContact }),
    [ready, completeLoader, scrollTo, contactOpen, openContact, closeContact],
  );

  return (
    <AppContext.Provider value={value}>
      <Grain />
      <PageLoader onComplete={completeLoader} />
      {children}
      <ContactPopup />
    </AppContext.Provider>
  );
}
