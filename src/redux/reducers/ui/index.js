import { combineReducers } from "redux";

import sidebar from "./sidebar";
import theme from "./theme";

export default combineReducers({
    sidebar,
    theme,
    // other ui reducers go here
});
