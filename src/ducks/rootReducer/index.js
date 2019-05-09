import { combineReducers } from "redux";
import github from "../github";
import gist from "../gist";
import medium from "../medium";

const rootReducer = combineReducers({
  github,
  gist,
  medium
});

export default rootReducer;
