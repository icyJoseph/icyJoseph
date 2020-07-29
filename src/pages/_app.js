import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { GlobalStyle } from "styles/global";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
