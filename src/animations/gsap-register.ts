"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);
}

export function registerGsap() {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
