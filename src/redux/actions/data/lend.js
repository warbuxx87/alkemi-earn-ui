// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

//                                               //
// ------------- RESET LEND DATA -------------   //
//                                               //

export const RESET_LEND_DATA = "RESET_LEND_DATA";

export const resetLendData = () => ({
    type: RESET_LEND_DATA,
});

// Declare action type as a constant
export const SET_ETH_LEND_BALANCE = "SET_ETH_LEND_BALANCE";

// Declare action creator
export const setEthLendBalance = (walletETHBalance) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_ETH_LEND_BALANCE,
    payload: {
        walletETHBalance,
    },
});

// Section 3: Action dispatch methods and async funcs
