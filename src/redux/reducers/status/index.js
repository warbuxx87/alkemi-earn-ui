import { combineReducers } from "redux";

import lend from "./lend";
import onboard from "./onboard";
import transactions from "./transactions";

export default combineReducers({
    lend,
    onboard,
    transactions,
    // other status reducers go here
});
