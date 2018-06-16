import { combineReducers } from "redux";
import drawer from "../drawer";
import github from "../github";
import gist from "../gist";

const rootReducer = combineReducers({
  drawer,
  github,
  gist
});

export default rootReducer;
