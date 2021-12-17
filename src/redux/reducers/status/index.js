import { combineReducers } from "redux";

import onboard from "./onboard";
import transactions from "./transactions";
import pool from "./pool";
import walletSelect from "./walletSelect";
import walletConnect from "./walletConnect";

export default combineReducers({
    onboard,
    transactions,
    pool,
    walletSelect,
    walletConnect,
    // other status reducers go here
});
