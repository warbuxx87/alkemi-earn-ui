// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

//                                               //
// ------------- RESET BORROW DATA ------------- //
//                                               //

export const RESET_BORROW_DATA = "RESET_BORROW_DATA";

export const resetBorrowData = () => ({
    type: RESET_BORROW_DATA,
});

// Declare action type as a constant
export const SET_ETH_BORROW_BALANCE = "SET_ETH_BORROW_BALANCE";

// Declare action creator
export const setEthBorrowBalance = (walletETHBalance) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_ETH_BORROW_BALANCE,
    payload: {
        walletETHBalance,
    },
});

// Section 3: Action dispatch methods and async funcs
