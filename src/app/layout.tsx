import "design-system/Global/style.css";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { Recursive } from "next/font/google";

import { Footer } from "components/Footer";
import { Navigation } from "composition/Navigation";

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

        <main className="px-4 w-full md:px-0 md:w-4/5 mx-auto">{children}</main>

        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
