import { combineReducers } from "redux";

import onboard from "./onboard";
import transactions from "./transactions";
import auth from "./auth";

export default combineReducers({
    onboard,
    transactions,
    auth,
    // other status reducers go here
});
