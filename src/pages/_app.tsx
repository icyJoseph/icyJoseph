import { useEffect } from "react";

import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";

import { ThemeProvider } from "styled-components";

import { theme } from "styles/theme";
import { GlobalStyle } from "styles/global";

import { Footer } from "composition/Footer";
import { Navigation } from "composition/Navigation";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handler = (url: string) => {
      window.gtag?.pageview(url);
    };

    router.events.on("routeChangeComplete", handler);

    return () => {
      router.events.off("routeChangeComplete", handler);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
