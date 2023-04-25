import "design-system/Global/style.css";

import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { Recursive } from "next/font/google";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { Footer } from "composition/Footer";
import { Navigation } from "composition/Navigation";
import { Background } from "design-system/Background";
import { GlobalStyle } from "design-system/Global";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  if (typeof window === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { server } = require("mocks/server");
    server.listen({ onUnhandledRequest: "bypass" });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require("mocks/browser");
    worker.start({ onUnhandledRequest: "bypass" });
  }
}

if (typeof window !== "undefined") {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
}

const recursive = Recursive({
  // variable: '--font-recursive',
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

function App({ Component, pageProps }: AppProps) {
  const isBlog = useRouter().pathname.startsWith("/blog");

  return (
    <>
      <GlobalStyle fontFamily={recursive.style.fontFamily} />

      <Background readingMode={isBlog} />

      <Navigation />

      <main className="block min-h-screen z-10">
        <Component {...pageProps} />
      </main>

      <Footer />

      <Analytics />
    </>
  );
}

export default App;
