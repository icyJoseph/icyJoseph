import React, { useEffect } from "react";

import { AppProps } from "next/app";
import Router from "next/router";
import Head from "next/head";

import { ThemeProvider } from "styled-components";

import { theme } from "styles/theme";
import { GlobalStyle } from "styles/global";

import { Footer } from "composition/Footer";
import { Navigation } from "composition/Navigation";
import { pageview } from "ga";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handler = (url: string) => pageview(url);

    Router.events.on("routeChangeComplete", handler);

    return () => Router.events.off("routeChangeComplete", handler);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css"
        />

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

      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Navigation />

        <Component {...pageProps} />

        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;