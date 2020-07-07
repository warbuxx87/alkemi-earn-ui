// Libs
// import { createSelector } from "reselect";

// Drizzle state selector
export const isWalletConnected = (state) => {
    return state.status.onboard.isConnected;
};

export const getWalletCurrentNetworkID = (state) => {
    return state.status.onboard.networkID;
};

export const getWalletCurrentAddress = (state) => {
    return state.status.onboard.address;
};
