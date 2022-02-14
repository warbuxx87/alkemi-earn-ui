// Primary use is to select wallet

// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

//                                               //
// ----------- WALLET SELECT ACTIONS ----------- //
//                                               //

// Declare action type as a constant
export const SHOW_WALLET_MODAL = "SHOW_WALLET_MODAL";

// Declare action creator
export const setShowWalletModal = (showWalletModal) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SHOW_WALLET_MODAL,
    payload: {
        showWalletModal,
    },
});

// Declare action type as a constant
export const SET_SELECTED_WALLET = "SET_SELECTED_WALLET";

// Declare action creator
export const setSelectedWallet = (selectedWallet) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_SELECTED_WALLET,
    payload: {
        selectedWallet,
    },
});

// Declare action type as a constant
export const SET_RESET_SELECTION_WALLET = "SET_RESET_SELECTION_WALLET";

// Declare action creator
// @param askToConnect
export const setResetSelectionWallet = (
    askToConnect = false,
    lastSelectedWallet = null
) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_RESET_SELECTION_WALLET,
    payload: {
        askToConnect,
        lastSelectedWallet,
    },
});

// Declare action type as a constant
export const SET_DISMISS_WALLET_SELECTION = "SET_DISMISS_WALLET_SELECTION";

// Declare action creator
export const setDismissWalletSelection = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_DISMISS_WALLET_SELECTION,
});

// Declare action type as a constant
export const SET_ACTIVATED_WALLET = "SET_ACTIVATED_WALLET";

// Declare action creator
export const setActivatedWallet = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_ACTIVATED_WALLET,
});

// Section 3: Action dispatch methods and async funcs
