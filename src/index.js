import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./ducks/store/";

if ("ontouchstart" in document.documentElement) {
  const highlight = "-webkit-tap-highlight-color";
  document.body.style.cursor = "pointer";
  document.body.style[highlight] = "transparent";
}

const storedState = localStorage.getItem("state");

const store = configureStore(storedState ? JSON.parse(storedState) : undefined);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
