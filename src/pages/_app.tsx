import "nprogress/nprogress.css";

import "styles/normalize.css";
import "styles/reset.css";
import "styles/typography.css";
import "styles/theme.css";
import "styles/global.css";

import type { AppProps } from "next/app";
import Router from "next/router";

import { Background, IsolatedLayout } from "components/Background";
import { Footer } from "composition/Footer";
import { Navigation } from "composition/Navigation";

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

function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
