import "design-system/Global/style.css";

import type { ReactNode } from "react";

import type { Metadata } from "next";
import { Recursive } from "next/font/google";

import { Navigation } from "composition/Navigation";

const VERCEL_URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const metadata: Metadata = {
  title: "icyJoseph | Señor Developer",
  description:
    "Señor Developer. JavaScript, TypeScript, Rust, CSS. I work with fullstack. I enjoy coding challenges.",
  openGraph: {
    url: VERCEL_URL,
    title: "icyJoseph | Señor Developer",
    siteName: "icyJoseph",
    description:
      "Señor Developer. JavaScript, TypeScript, Rust, CSS. I work with fullstack. I enjoy coding challenges.",
    images: [
      {
        url: `${VERCEL_URL}/waves_background.png`,
        width: 960,
        height: 540,
        alt: "icyJoseph wavy background",
        type: "image/png",
      },
    ],
  },
};

const recursive = Recursive({
  subsets: ["latin"],
  variable: "--font-recursive",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${recursive.className} ${recursive.variable} text-smoke-white bg-soft-black`}
      >
        <Navigation />

        <main className="max-w-[85ch] font-[sans-serif] mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
