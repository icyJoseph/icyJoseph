import { combineReducers } from "redux";
import counter from "./counter";
import sideContainer from "./sideContainer";

const rootReducer = combineReducers({
  counter,
  sideContainer
});

export default rootReducer;
