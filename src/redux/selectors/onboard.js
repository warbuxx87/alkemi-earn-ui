// Libs
// import { createSelector } from "reselect";

// Drizzle state selector
export const isWalletConnected = (state) => {
    return state.status.onboard.isConnected;
};

export const walletAddress = (state) => {
    return state.status.onboard.walletAddress;
};

export const walletNetwork = (state) => {
    return state.status.onboard.walletNetwork;
};
