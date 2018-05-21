import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../rootReducer";
import saveToStore from "../../utils/saveStateToLocalStorage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  saveToStore()
);

// sagaMiddleware.run(rootSaga);

export default function(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept("../rootReducer", () => {
      const nextRootReducer = require("../rootReducer");
      store.replaceReducer(nextRootReducer);
    });
    return store;
  }
}
