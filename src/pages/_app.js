import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { GlobalStyle } from "styles/global";

import { Footer } from "composition/Footer";
import { Navigation } from "composition/Navigation";

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handler = (url) => {
      globalThis.gtag.pageview(url);
    };

    router.events.on("routerChangeComplete", handler);

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
