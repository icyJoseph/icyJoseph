import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../rootSaga";
import rootReducer from "../rootReducer";
import saveToStorage from "../../utils/saveStateToLocalStorage";

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);

const enhancer = compose(
  middlewares,
  saveToStorage()
);

export default function(initialState) {
  sagaMiddleware.run(rootSaga);
  return createStore(rootReducer, initialState, enhancer);
}
