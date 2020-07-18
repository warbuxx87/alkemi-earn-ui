// Libs
// import { createSelector } from "reselect";
import _ from "lodash";
import constants from "constants/constant.json";

// Drizzle state selector
export const isDrizzleInitialized = (state) => state.drizzleStatus.initialized;

export const networkSelector = (state) =>
    constants.network_type[state.web3.networkId]; // Not the source of truth, to be cleaned up in UI-221

export const getAccountAddress = (state) => _.get(state, "accounts[0]"); // Not the source of truth, to be cleaned up in UI-221
