// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

// Declare action type as a constant
export const SHOW_WALLET_CONNECT_MODAL = "SHOW_WALLET_CONNECT_MODAL";

// Declare action creator
export const setShowWalletConnectModal = (show) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SHOW_WALLET_CONNECT_MODAL,
    payload: {
        show,
    },
});

// Section 3: Action dispatch methods and async funcs
