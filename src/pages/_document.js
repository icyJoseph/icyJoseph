import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const GA_TRACKING_ID = "UA-84677777-1";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
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
                font-display: swap;
                font-weight: 300;
                src: local(""),
                  url("/fonts/recursive-v21-latin-300.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-300.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: swap;
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
                font-display: swap;
                font-weight: 500;
                src: local(""),
                  url("/fonts/recursive-v21-latin-500.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-500.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: swap;
                font-weight: 600;
                src: local(""),
                  url("/fonts/recursive-v21-latin-600.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-600.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: swap;
                font-weight: 700;
                src: local(""),
                  url("/fonts/recursive-v21-latin-700.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: swap;
                font-weight: 800;
                src: local(""),
                  url("/fonts/recursive-v21-latin-800.woff2") format("woff2"),
                  /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url("/fonts/recursive-v21-latin-800.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }

              @font-face {
                font-family: "Recursive";
                font-style: normal;
                font-display: swap;
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
