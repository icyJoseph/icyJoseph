import React, { useEffect } from "react";

import { AppProps } from "next/app";
import Router from "next/router";
import Head from "next/head";

import styled, { ThemeProvider } from "styled-components";

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

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;base64,PHN2ZyBpZD0idmlzdWFsIiB2aWV3Qm94PSIwIDAgOTYwIDU0MCIgd2lkdGg9Ijk2MCIgaGVpZ2h0PSI1NDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9Ijk2MCIgaGVpZ2h0PSI1NDAiIGZpbGw9IiMwMDEyMjAiPjwvcmVjdD4KICAgIDxwYXRoCiAgICAgICAgZD0iTTAgMzUzTDIyLjggMzQ4LjdDNDUuNyAzNDQuMyA5MS4zIDMzNS43IDEzNyAzMzNDMTgyLjcgMzMwLjMgMjI4LjMgMzMzLjcgMjc0IDMzMS43QzMxOS43IDMyOS43IDM2NS4zIDMyMi4zIDQxMS4yIDMzMS43QzQ1NyAzNDEgNTAzIDM2NyA1NDguOCAzNjcuOEM1OTQuNyAzNjguNyA2NDAuMyAzNDQuMyA2ODYgMzQwLjJDNzMxLjcgMzM2IDc3Ny4zIDM1MiA4MjMgMzYwLjVDODY4LjcgMzY5IDkxNC4zIDM3MCA5MzcuMiAzNzAuNUw5NjAgMzcxTDk2MCA1NDFMOTM3LjIgNTQxQzkxNC4zIDU0MSA4NjguNyA1NDEgODIzIDU0MUM3NzcuMyA1NDEgNzMxLjcgNTQxIDY4NiA1NDFDNjQwLjMgNTQxIDU5NC43IDU0MSA1NDguOCA1NDFDNTAzIDU0MSA0NTcgNTQxIDQxMS4yIDU0MUMzNjUuMyA1NDEgMzE5LjcgNTQxIDI3NCA1NDFDMjI4LjMgNTQxIDE4Mi43IDU0MSAxMzcgNTQxQzkxLjMgNTQxIDQ1LjcgNTQxIDIyLjggNTQxTDAgNTQxWiIKICAgICAgICBmaWxsPSIjMjEyNzM4Ij48L3BhdGg+CiAgICA8cGF0aAogICAgICAgIGQ9Ik0wIDM1N0wyMi44IDM2MkM0NS43IDM2NyA5MS4zIDM3NyAxMzcgMzgxLjdDMTgyLjcgMzg2LjMgMjI4LjMgMzg1LjcgMjc0IDM4OEMzMTkuNyAzOTAuMyAzNjUuMyAzOTUuNyA0MTEuMiAzOTQuMkM0NTcgMzkyLjcgNTAzIDM4NC4zIDU0OC44IDM4OEM1OTQuNyAzOTEuNyA2NDAuMyA0MDcuMyA2ODYgNDA2LjJDNzMxLjcgNDA1IDc3Ny4zIDM4NyA4MjMgMzc5LjNDODY4LjcgMzcxLjcgOTE0LjMgMzc0LjMgOTM3LjIgMzc1LjdMOTYwIDM3N0w5NjAgNTQxTDkzNy4yIDU0MUM5MTQuMyA1NDEgODY4LjcgNTQxIDgyMyA1NDFDNzc3LjMgNTQxIDczMS43IDU0MSA2ODYgNTQxQzY0MC4zIDU0MSA1OTQuNyA1NDEgNTQ4LjggNTQxQzUwMyA1NDEgNDU3IDU0MSA0MTEuMiA1NDFDMzY1LjMgNTQxIDMxOS43IDU0MSAyNzQgNTQxQzIyOC4zIDU0MSAxODIuNyA1NDEgMTM3IDU0MUM5MS4zIDU0MSA0NS43IDU0MSAyMi44IDU0MUwwIDU0MVoiCiAgICAgICAgZmlsbD0iIzM5MzE1NyI+PC9wYXRoPgogICAgPHBhdGgKICAgICAgICBkPSJNMCAzOTNMMjIuOCAzOTUuMkM0NS43IDM5Ny4zIDkxLjMgNDAxLjcgMTM3IDQwNC4zQzE4Mi43IDQwNyAyMjguMyA0MDggMjc0IDQxMC41QzMxOS43IDQxMyAzNjUuMyA0MTcgNDExLjIgNDE5QzQ1NyA0MjEgNTAzIDQyMSA1NDguOCA0MjVDNTk0LjcgNDI5IDY0MC4zIDQzNyA2ODYgNDQyLjhDNzMxLjcgNDQ4LjcgNzc3LjMgNDUyLjMgODIzIDQ1M0M4NjguNyA0NTMuNyA5MTQuMyA0NTEuMyA5MzcuMiA0NTAuMkw5NjAgNDQ5TDk2MCA1NDFMOTM3LjIgNTQxQzkxNC4zIDU0MSA4NjguNyA1NDEgODIzIDU0MUM3NzcuMyA1NDEgNzMxLjcgNTQxIDY4NiA1NDFDNjQwLjMgNTQxIDU5NC43IDU0MSA1NDguOCA1NDFDNTAzIDU0MSA0NTcgNTQxIDQxMS4yIDU0MUMzNjUuMyA1NDEgMzE5LjcgNTQxIDI3NCA1NDFDMjI4LjMgNTQxIDE4Mi43IDU0MSAxMzcgNTQxQzkxLjMgNTQxIDQ1LjcgNTQxIDIyLjggNTQxTDAgNTQxWiIKICAgICAgICBmaWxsPSIjNjMzNTZkIj48L3BhdGg+CiAgICA8cGF0aAogICAgICAgIGQ9Ik0wIDQ2M0wyMi44IDQ1OS4yQzQ1LjcgNDU1LjMgOTEuMyA0NDcuNyAxMzcgNDQ2LjJDMTgyLjcgNDQ0LjcgMjI4LjMgNDQ5LjMgMjc0IDQ1Mi41QzMxOS43IDQ1NS43IDM2NS4zIDQ1Ny4zIDQxMS4yIDQ2MS44QzQ1NyA0NjYuMyA1MDMgNDczLjcgNTQ4LjggNDc1LjJDNTk0LjcgNDc2LjcgNjQwLjMgNDcyLjMgNjg2IDQ2Ny44QzczMS43IDQ2My4zIDc3Ny4zIDQ1OC43IDgyMyA0NTMuMkM4NjguNyA0NDcuNyA5MTQuMyA0NDEuMyA5MzcuMiA0MzguMkw5NjAgNDM1TDk2MCA1NDFMOTM3LjIgNTQxQzkxNC4zIDU0MSA4NjguNyA1NDEgODIzIDU0MUM3NzcuMyA1NDEgNzMxLjcgNTQxIDY4NiA1NDFDNjQwLjMgNTQxIDU5NC43IDU0MSA1NDguOCA1NDFDNTAzIDU0MSA0NTcgNTQxIDQxMS4yIDU0MUMzNjUuMyA1NDEgMzE5LjcgNTQxIDI3NCA1NDFDMjI4LjMgNTQxIDE4Mi43IDU0MSAxMzcgNTQxQzkxLjMgNTQxIDQ1LjcgNTQxIDIyLjggNTQxTDAgNTQxWiIKICAgICAgICBmaWxsPSIjOTUyZjczIj48L3BhdGg+CiAgICA8cGF0aAogICAgICAgIGQ9Ik0wIDQ5OUwyMi44IDQ5Ny4yQzQ1LjcgNDk1LjMgOTEuMyA0OTEuNyAxMzcgNDg5LjJDMTgyLjcgNDg2LjcgMjI4LjMgNDg1LjMgMjc0IDQ4My4yQzMxOS43IDQ4MSAzNjUuMyA0NzggNDExLjIgNDgyLjJDNDU3IDQ4Ni4zIDUwMyA0OTcuNyA1NDguOCA1MDMuN0M1OTQuNyA1MDkuNyA2NDAuMyA1MTAuMyA2ODYgNTExLjVDNzMxLjcgNTEyLjcgNzc3LjMgNTE0LjMgODIzIDUxMEM4NjguNyA1MDUuNyA5MTQuMyA0OTUuMyA5MzcuMiA0OTAuMkw5NjAgNDg1TDk2MCA1NDFMOTM3LjIgNTQxQzkxNC4zIDU0MSA4NjguNyA1NDEgODIzIDU0MUM3NzcuMyA1NDEgNzMxLjcgNTQxIDY4NiA1NDFDNjQwLjMgNTQxIDU5NC43IDU0MSA1NDguOCA1NDFDNTAzIDU0MSA0NTcgNTQxIDQxMS4yIDU0MUMzNjUuMyA1NDEgMzE5LjcgNTQxIDI3NCA1NDFDMjI4LjMgNTQxIDE4Mi43IDU0MSAxMzcgNTQxQzkxLjMgNTQxIDQ1LjcgNTQxIDIyLjggNTQxTDAgNTQxWiIKICAgICAgICBmaWxsPSIjYzYyMzY4Ij48L3BhdGg+Cjwvc3ZnPg==");
  background-size: cover;
  background-repeat: no-repeat;
`;

const Layout = styled.div`
  isolation: isolate;
`;

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

        <Background />

        <Layout>
          <Navigation />

          <Component {...pageProps} />

          <Footer />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
