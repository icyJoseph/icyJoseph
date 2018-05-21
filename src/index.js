import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./ducks/store/";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
