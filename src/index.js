import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./ducks/store/";
import run from "./App";

import theme from "./theme";
import "./index.css";

const storedState = localStorage.getItem("icyJoseph");
const store = configureStore(storedState ? JSON.parse(storedState) : undefined);
// if the browser is IE it returns blue screen of death
// otherwise return the routes for the app
const App = run();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

registerServiceWorker();
