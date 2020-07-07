// Libs
// import { createSelector } from "reselect";

// Drizzle state selector
export const isWalletConnected = (state) => {
    return state.status.onboard.isConnected;
};
