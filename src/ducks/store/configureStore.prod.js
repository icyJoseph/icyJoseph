import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../rootReducer";
import saveToStorage from "../../utils/saveStateToLocalStorage";

const sagaMiddleware = createSagaMiddleware();
const middlewares = applyMiddleware(sagaMiddleware);
//sagaMiddleware.run(rootSaga);

const enhancer = compose(middlewares, saveToStorage());

export default function(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
