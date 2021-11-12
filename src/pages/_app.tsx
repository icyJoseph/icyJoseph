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
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: block;
                font-weight: 300;
                src: local(""),
                  url("/fonts/recursive-v21-latin-300.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-300.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: block;
                font-weight: 400;
                src: local(""),
                  url("/fonts/recursive-v21-latin-regular.woff2")
                    format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-regular.woff")
                    format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: block;
                font-weight: 500;
                src: local(""),
                  url("/fonts/recursive-v21-latin-500.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: block;
                font-weight: 600;
                src: local(""),
                  url("/fonts/recursive-v21-latin-600.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-600.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: block;
                font-weight: 700;
                src: local(""),
                  url("/fonts/recursive-v21-latin-700.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: block;
                font-weight: 800;
                src: local(""),
                  url("/fonts/recursive-v21-latin-800.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-800.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: block;
                font-weight: 900;
                src: local(""),
                  url("/fonts/recursive-v21-latin-900.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-900.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }`
          }}
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
