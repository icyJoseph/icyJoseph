import "nprogress/nprogress.css";

import "styles/normalize.css";
import "styles/reset.css";
import "styles/typography.css";
import "styles/theme.css";
import "styles/global.css";

import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import Router from "next/router";

import { Background, IsolatedLayout } from "components/Background";
import { Footer } from "composition/Footer";
import { Navigation } from "composition/Navigation";
import { pageview } from "ga";

import NProgress from "nprogress";

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
  return (
    <>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
          }}
        />
      </Head>

      <Background />

      <IsolatedLayout renderAs="main">
        <Navigation />

        <Component {...pageProps} />

        <Footer />
      </IsolatedLayout>
    </>
  );
}

export default App;
