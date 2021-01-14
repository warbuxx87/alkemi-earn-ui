import { combineReducers } from "redux";

import onboard from "./onboard";
import transactions from "./transactions";

export default combineReducers({
    onboard,
    transactions,
    // other status reducers go here
});
