import { combineReducers } from "redux";

import tx from "./tx";
import lend from "./lend";
import borrow from "./borrow";
import liquidations from "./liquidations";
import history from "./history";

export default combineReducers({
    tx,
    lend,
    borrow,
    liquidations,
    history,
    // other data reducers go here
});
