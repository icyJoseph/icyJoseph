import { useEffect } from "react";

import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import Script from "next/script";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { Footer } from "composition/Footer";
import { Navigation } from "composition/Navigation";
import { Background, Layout } from "design-system/Background";
import { GlobalStyle } from "design-system/Global";
import { pageview } from "ga";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handler = (url: string) => pageview(url);

    Router.events.on("routeChangeComplete", handler);

    return () => Router.events.off("routeChangeComplete", handler);
  }, []);

  const isBlog = useRouter().pathname.startsWith("/blog");

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />

      <GlobalStyle />

      <Background readingMode={isBlog} />

      <Navigation />

      <Layout as="main">
        <Component {...pageProps} />
      </Layout>

      <Footer />
    </>
  );
}

export default App;
