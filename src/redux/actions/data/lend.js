// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

//                                               //
// ------------ APPROVE  ACTIONS -------------   //
//                                               //

export const APPROVE_PENDING = "APPROVE_PENDING";
export const approvePending = (asset) => ({
    type: APPROVE_PENDING,
    payload: {
        asset,
    },
});

export const APPROVE_SUCCESS = "APPROVE_SUCCESS";
export const approveSuccess = (asset) => ({
    type: APPROVE_SUCCESS,
    payload: {
        asset,
    },
});

export const APPROVE_ERROR = "APPROVE_ERROR";
export const approveError = (asset, error) => ({
    type: APPROVE_ERROR,
    payload: {
        asset,
    },
    error,
});

//                                               //
// ------------- RESET LEND DATA -------------   //
//                                               //

export const RESET_LEND_DATA = "RESET_LEND_DATA";

export const resetLendData = () => ({
    type: RESET_LEND_DATA,
});

// Section 3: Action dispatch methods and async funcs
