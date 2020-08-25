import { combineReducers } from "redux";

import tx from "./tx";
import lend from "./lend";
import borrow from "./borrow";
import price from "./price";
import liquidations from "./liquidations";

export default combineReducers({
    tx,
    lend,
    borrow,
    price,
    liquidations,
    // other data reducers go here
});
