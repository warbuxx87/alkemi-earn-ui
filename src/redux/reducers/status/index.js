import { combineReducers } from "redux";

import onboard from "./onboard";
import transactions from "./transactions";
import walletconnect from "./walletconnect";

export default combineReducers({
    onboard,
    transactions,
    walletconnect,
    // other status reducers go here
});
