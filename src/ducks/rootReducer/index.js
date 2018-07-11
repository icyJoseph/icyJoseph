import { combineReducers } from "redux";
import auth from "../auth";
import drawer from "../drawer";
import github from "../github";
import gist from "../gist";
import medium from "../medium";

const rootReducer = combineReducers({
  auth,
  drawer,
  github,
  gist,
  medium
});

export default rootReducer;
