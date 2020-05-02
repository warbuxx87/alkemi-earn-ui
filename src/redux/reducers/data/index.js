import { combineReducers } from "redux";

import stats from "./stats";
import lend from "./lend";
import borrow from "./borrow";

export default combineReducers({
    stats,
    lend,
    // other data reducers go here
});
