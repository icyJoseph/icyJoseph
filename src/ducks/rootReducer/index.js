import { combineReducers } from "redux";
import auth from "../auth";
import drawer from "../drawer";
import github from "../github";
import gist from "../gist";

const rootReducer = combineReducers({
  auth,
  drawer,
  github,
  gist
});

export default rootReducer;
