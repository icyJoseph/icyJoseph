import type { AppProps } from "next/app";
import Router from "next/router";

import { ThemeProvider } from "styled-components";

import { theme } from "styles/theme";
import { GlobalStyle } from "styles/global";

import { Background, Layout } from "components/Background";
import { Footer } from "composition/Footer";
import { Navigation } from "composition/Navigation";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

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

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Background />

        <Layout>
          <Navigation />

          <Component {...pageProps} />

          <Footer />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
