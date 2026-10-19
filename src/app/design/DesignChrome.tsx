"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

export function DesignChrome({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.designMock = "true";
    return () => {
      delete document.documentElement.dataset.designMock;
    };
  }, []);

  return children;
}
