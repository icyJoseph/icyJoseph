import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/";
import registerServiceWorker from "./registerServiceWorker";

import configureStore from "./ducks/store/";

const store = configureStore({ counter: 0 });

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
