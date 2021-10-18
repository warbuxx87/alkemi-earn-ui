import { combineReducers } from "redux";

import tx from "./tx";
import lend from "./lend";
import borrow from "./borrow";
import liquidations from "./liquidations";
import history from "./history";
import markets from "./markets";

export default combineReducers({
    tx,
    lend,
    borrow,
    liquidations,
    history,
    markets,
    // other data reducers go here
});
