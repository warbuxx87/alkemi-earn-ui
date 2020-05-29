// Libs
// import { createSelector } from "reselect";
import _ from "lodash";
import constants from "contracts/constant.json";

// Drizzle state selector
export const isDrizzleInitialized = state => state.drizzleStatus.initialized;

export const networkSelector = state =>
    constants.network_type[state.web3.networkId];

export const getAccountAddress = state => _.get(state, "accounts[0]");
