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

export const SET_CURRENTLY_SELECTED_WALLET_NETWORK_ID =
    "SET_CURRENTLY_SELECTED_WALLET_NETWORK_ID";

// Declare action creator
export const setCurrentlySelectedWalletNetworkID = (networkID) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_CURRENTLY_SELECTED_WALLET_NETWORK_ID,
    payload: {
        networkID,
    },
});

export const SET_CURRENTLY_SELECTED_WALLET_ADDRESS =
    "SET_CURRENTLY_SELECTED_WALLET_ADDRESS";

// Declare action creator
export const setCurrentlySelectedWalletAddress = (address) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_CURRENTLY_SELECTED_WALLET_ADDRESS,
    payload: {
        address,
    },
});
// Section 3: Action dispatch methods and async funcs
