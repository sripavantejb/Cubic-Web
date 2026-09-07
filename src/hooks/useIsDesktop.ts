"use client";

import { useEffect, useState } from "react";

export function useIsDesktop(minWidth = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidth}px)`);
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setIsDesktop(media.matches && fine.matches);
    update();
    media.addEventListener("change", update);
    fine.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
      fine.removeEventListener("change", update);
    };
  }, [minWidth]);

  return isDesktop;
}
