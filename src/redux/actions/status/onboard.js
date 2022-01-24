// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

//                                      //
// ---------- ONBOARD ACTIONS --------- //
//                                      //

// Declare action type as a constant
export const SET_WALLET_CONNECTED = "SET_WALLET_CONNECTED";

// Declare action creator
export const setWalletConnected = (isConnected) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_WALLET_CONNECTED,
    payload: {
        isConnected,
    },
});

// Declare action type as a constant
export const SET_WALLET_ADDRESS = "SET_WALLET_ADDRESS";

// Declare action creator
export const setWalletAddress = (walletAddress) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_WALLET_ADDRESS,
    payload: {
        walletAddress,
    },
});

// Declare action type as a constant
export const SET_WALLET_NETWORK = "SET_WALLET_NETWORK";

// Declare action creator
export const setWalletNetwork = (walletNetwork) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_WALLET_NETWORK,
    payload: {
        walletNetwork,
    },
});

// Declare action type as a constant
export const SET_WALLET_BALANCE = "SET_WALLET_BALANCE";

// Declare action creator
export const setWalletBalance = (walletBalance) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_WALLET_BALANCE,
    payload: {
        walletBalance,
    },
});

// Declare action type as a constant
export const SET_WALLET_IS_IFRAME = "SET_WALLET_IS_IFRAME";

// Declare action creator
export const setWalletIsIframe = (isIFrame) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_WALLET_IS_IFRAME,
    payload: {
        isIFrame,
    },
});
// Section 3: Action dispatch methods and async funcs
