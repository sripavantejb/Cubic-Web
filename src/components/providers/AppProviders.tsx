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

type AppContextValue = {
  ready: boolean
  completeLoader: () => void
  scrollTo: (target: string) => void
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

  const completeLoader = useCallback(() => setReady(true), []);

  const scrollTo = useCallback((target: string) => {
    const el = document.querySelector(target);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: -72 });
      return;
    }
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }, [reduced]);

  useGSAP(() => {
    registerGsap();
    if (reduced) return;

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

  const value = useMemo(
    () => ({ ready, completeLoader, scrollTo }),
    [ready, completeLoader, scrollTo],
  );

  return (
    <AppContext.Provider value={value}>
      <Grain />
      <PageLoader onComplete={completeLoader} />
      {children}
    </AppContext.Provider>
  );
}
