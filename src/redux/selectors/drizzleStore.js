// Libs
// import { createSelector } from "reselect";
import _ from "lodash";

// Stats Selectors
export const getAccountAddress = state => _.get(state, "accounts[0]");
