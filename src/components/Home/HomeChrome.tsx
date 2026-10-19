"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

export function HomeChrome({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.home = "true";
    return () => {
      delete document.documentElement.dataset.home;
    };
  }, []);

  return children;
}
