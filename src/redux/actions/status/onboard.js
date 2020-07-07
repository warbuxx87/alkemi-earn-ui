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

// Section 3: Action dispatch methods and async funcs
