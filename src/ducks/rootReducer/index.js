import { combineReducers } from "redux";
import drawer from "../drawer";
import github from "../github";

const rootReducer = combineReducers({
  drawer,
  github
});

export default rootReducer;
