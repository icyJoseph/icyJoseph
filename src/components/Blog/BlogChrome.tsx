"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

export function BlogChrome({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.blog = "true";
    return () => {
      delete document.documentElement.dataset.blog;
    };
  }, []);

  return children;
}
