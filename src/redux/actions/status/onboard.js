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

// Section 3: Action dispatch methods and async funcs
