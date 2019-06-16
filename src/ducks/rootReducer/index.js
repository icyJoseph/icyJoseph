import { combineReducers } from "redux";
import github from "../github";
import medium from "../medium";

const rootReducer = combineReducers({
  github,
  medium
});

export default rootReducer;
