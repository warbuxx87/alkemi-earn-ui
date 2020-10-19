import { combineReducers } from "redux";

import tx from "./tx";
import lend from "./lend";
import borrow from "./borrow";
import liquidations from "./liquidations";

export default combineReducers({
    tx,
    lend,
    borrow,
    liquidations,
    // other data reducers go here
});
