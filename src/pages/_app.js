import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { GlobalStyle } from "styles/global";

import { Footer } from "composition/Footer";
import { Navigation } from "composition/Navigation";

function App({ Component, pageProps }) {
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
