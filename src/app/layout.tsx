import "design-system/global.css";
import type { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import { Recursive } from "next/font/google";

import { DeferredAnalytics } from "components/DeferredAnalytics";
import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";

const recursive = Recursive({
  subsets: ["latin"],
  variable: "--font-recursive",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a1612",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={recursive.variable}>
      <body className="font-sans text-paper-cool bg-room">
        <Navigation />

        <main className="px-4 w-full md:px-0 md:w-4/5 mx-auto max-w-7xl">
          {children}
        </main>

        <Footer />

        <DeferredAnalytics />
      </body>
    </html>
  );
}
