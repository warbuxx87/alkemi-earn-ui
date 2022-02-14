// Libs
// import { createSelector } from "reselect";
import constants from "constants/constant.json";

// Drizzle state selector
export const isWalletConnected = (state) => {
    return state.status.onboard.isConnected;
};

export const walletAddress = (state) => {
    return state.status.onboard.walletAddress;
};

// Returns walletBalance in wei (Example: "14994502059642643129")
export const walletBalance = (state) =>
    constants.network_type[state.status.onboard.walletBalance];

// Returns walletNetwork ID (Example: 4)
export const walletNetwork = (state) => {
    return state.status.onboard.walletNetwork;
};

// Returns walletNetwork Name (Example: rinkeby)
export const walletNetworkName = (state) =>
    constants.network_type[state.status.onboard.walletNetwork];

export const isIFrame = (state) => {
    return state.status.onboard.isIFrame;
};
