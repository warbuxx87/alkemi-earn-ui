import { combineReducers } from "redux";

import stats from "./stats";
import lend from "./lend";

export default combineReducers({
  stats,
  lend
  // other data reducers go here
});
