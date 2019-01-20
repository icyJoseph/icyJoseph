import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./ducks/store/";
import { browserRender } from "./config";

import "./index.css";

const storedState = localStorage.getItem("icyJoseph");
const store = configureStore(storedState ? JSON.parse(storedState) : undefined);
// if the browser is IE it returns blue screen of death
// otherwise return the routes for the app
const App = browserRender();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
