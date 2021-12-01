import { combineReducers } from "redux";

import onboard from "./onboard";
import transactions from "./transactions";
import pool from "./pool";
import walletSelect from "./walletSelect";

export default combineReducers({
    onboard,
    transactions,
    pool,
    walletSelect,
    // other status reducers go here
});
