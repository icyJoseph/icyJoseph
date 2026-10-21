import type { ReactNode } from "react";

import type { Metadata } from "next";

import { DesignChrome } from "./DesignChrome";

export const metadata: Metadata = {
  title: "Design mockup | icyJoseph",
  robots: { index: false, follow: false },
};

export default function DesignLayout({ children }: { children: ReactNode }) {
  return <DesignChrome>{children}</DesignChrome>;
}
