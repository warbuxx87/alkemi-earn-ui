import { combineReducers } from "redux";

import stats from "./stats";
import lend from "./lend";
import borrow from "./borrow";
import price from "./price";

export default combineReducers({
    stats,
    lend,
    borrow,
    price,
    // other data reducers go here
});
