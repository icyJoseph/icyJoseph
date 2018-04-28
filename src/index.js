import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./containers/App/";
import registerServiceWorker from "./registerServiceWorker";

import configureStore from "./ducks/store/";

const store = configureStore({ counter: 0 });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
