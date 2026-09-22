"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useGSAP } from "@gsap/react";
import { bindLenisToGsap } from "@/animations/lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/animations/gsap-register";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Grain } from "@/components/chrome/Grain";
import { PageLoader } from "@/components/chrome/PageLoader";
import { WhatsAppChat } from "@/components/chrome/WhatsAppChat";
import { site } from "@/content/site";

type AppContextValue = {
  ready: boolean
  completeLoader: () => void
  scrollTo: (target: string) => void
  openContact: () => void
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
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  const completeLoader = useCallback(() => setReady(true), []);
  const openContact = useCallback(() => {
    window.open(site.whatsapp.href, "_blank", "noopener,noreferrer");
  }, []);

  const scrollTo = useCallback((target: string) => {
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
  }, [reduced]);

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
      duration: 1.35,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
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

  // Every route opens at the top. Clicking a link already did, but the browser
  // restores a remembered offset on reload and on back/forward, which drops you
  // partway down a page you have not just been reading. `scrollRestoration` is a
  // property of the current history entry rather than the document, so each route
  // has to opt out as it is entered.
  //
  // Going through ScrollTrigger rather than assigning to `history` directly: it
  // snapshots scrollRestoration when it initialises and writes that snapshot back
  // on every refresh, so a plain assignment gets reverted by the next refresh.
  const firstRoute = useRef(true);
  useEffect(() => {
    ScrollTrigger.clearScrollMemory("manual");

    // A fresh load already starts at the top, and skipping the first run leaves an
    // incoming `/#section` deep link to resolve its own position.
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    // A hash link resolves its own position; leave it alone.
    if (window.location.hash) return;

    // Lenis drives the scroll position itself, so the window alone is not enough.
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    // The incoming page's triggers have to measure against the reset position.
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  // Honor deep links like `/#machinery` when arriving from a service page.
  useGSAP(() => {
    if (!ready) return;
    const hash = window.location.hash;
    if (!hash || hash === "#top") return;
    const id = window.setTimeout(() => scrollTo(hash), 120);
    return () => window.clearTimeout(id);
  }, { dependencies: [ready, scrollTo] });

  const value = useMemo(
    () => ({ ready, completeLoader, scrollTo, openContact }),
    [ready, completeLoader, scrollTo, openContact],
  );

  return (
    <AppContext.Provider value={value}>
      <Grain />
      <PageLoader onComplete={completeLoader} />
      {children}
      <WhatsAppChat />
    </AppContext.Provider>
  );
}
