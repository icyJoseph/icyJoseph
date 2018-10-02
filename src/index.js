import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import Routes from "./routes";
import BSOD from "./containers/BSOD";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./ducks/store/";

const userAgent = window.navigator.userAgent;
const userHasIE = /MSIE|Trident/.test(userAgent);
const appRoot = document.getElementById("root");

if (userHasIE) {
  ReactDOM.render(<BSOD />, appRoot);
} else {
  if ("ontouchstart" in document.documentElement) {
    const highlight = "-webkit-tap-highlight-color";
    document.body.style.cursor = "pointer";
    document.body.style[highlight] = "transparent";
  }

  const storedState = localStorage.getItem("state");

  const store = configureStore(
    storedState ? JSON.parse(storedState) : undefined
  );

  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    appRoot
  );

  registerServiceWorker();
}
