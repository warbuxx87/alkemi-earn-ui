import { combineReducers } from "redux";

import lend from "./lend";
import borrow from "./borrow";
import onboard from "./onboard";
import transactions from "./transactions";

export default combineReducers({
    lend,
    borrow,
    onboard,
    transactions,
    // other status reducers go here
});
