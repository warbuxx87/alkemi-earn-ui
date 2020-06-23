import { combineReducers } from "redux";

import lend from "./lend";
import borrow from "./borrow";

export default combineReducers({
    lend,
    borrow,
    // other status reducers go here
});
