import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import saveToStorage from "../../utils/saveStateToLocalStore";

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);
sagaMiddleware.run();

const enhancer = compose(middlewares, saveToStorage());

export default function(initialState) {
  return createStore(
    connectRouter(history)(rootReducer, initialState),
    initialState,
    enhancer
  );
}
