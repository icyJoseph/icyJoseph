import { combineReducers } from "redux";
import drawer from "../drawer";
import github from "../github";
import gist from "../gist";
import medium from "../medium";

const rootReducer = combineReducers({
  drawer,
  github,
  gist,
  medium
});

export default rootReducer;
