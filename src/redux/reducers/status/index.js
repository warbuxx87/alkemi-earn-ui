import { combineReducers } from "redux";

import onboard from "./onboard";
import transactions from "./transactions";
import pool from "./pool";

export default combineReducers({
    onboard,
    transactions,
    pool,
    // other status reducers go here
});
