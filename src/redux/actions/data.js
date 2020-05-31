//                                     //
// ------------ STATS ACTIONS -------- //
//                                     //

// Declare action type as a constant
export const FETCH_STATS_PENDING = "FETCH_STATS_PENDING";

// Declare action creator
export const fetchStatsPending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_STATS_PENDING
});

// Declare action type as a constant
export const FETCH_STATS_SUCCESS = "FETCH_STATS_SUCCESS";

// Declare action creator
export const fetchStatsSuccess = tx => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_STATS_SUCCESS,
    payload: tx
});

// Declare action type as a constant
export const FETCH_STATS_ERROR = "FETCH_STATS_ERROR";

// Declare action creator
export const fetchStatsError = error => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_STATS_ERROR,
    payload: new Error(),
    error: true
});

//                                      //
// ------------ BORROW ACTIONS -------- //
//                                      //

// Declare action type as a constant
export const FETCH_BORROW_PENDING = "FETCH_BORROW_PENDING";

// Declare action creator
export const fetchBorrowPending = asset => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_BORROW_PENDING,
    asset
});

// Declare action type as a constant
export const FETCH_BORROW_SUCCESS = "FETCH_BORROW_SUCCESS";

// Declare action creator
export const fetchBorrowSuccess = asset => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_BORROW_SUCCESS,
    asset
});

// Declare action type as a constant
export const FETCH_BORROW_ERROR = "FETCH_BORROW_ERROR";

// Declare action creator
export const fetchBorrowError = error => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_BORROW_ERROR,
    payload: new Error(),
    error: true
});

//                                      //
// ------------ LEND ACTIONS --------   //
//                                      //

// Declare action type as a constant
export const FETCH_LEND_PENDING = "FETCH_LEND_PENDING";

// Declare action creator
export const fetchLendPending = asset => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_PENDING,
    asset
});

// Declare action type as a constant
export const FETCH_LEND_SUCCESS = "FETCH_LEND_SUCCESS";

// Declare action creator
export const fetchLendSuccess = asset => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_SUCCESS,
    asset
});

// Declare action type as a constant
export const FETCH_LEND_ERROR = "FETCH_LEND_ERROR";

// Declare action creator
export const fetchLendError = (asset, error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_ERROR,
    payload: {
        error,
        asset
    }
});

//                                      //
// ------------ SUPPLY METHOD ACTIONS --------   //
//                                      //

export const SUPPLY_PENDING = "SUPPLY_PENDING";
export const supplyPending = asset => ({
    type: SUPPLY_PENDING,
    payload: asset
});

export const SUPPLY_SUCCESS = "SUPPLY_SUCCESS";
export const supplySuccess = asset => ({
    type: SUPPLY_SUCCESS,
    payload: asset
});

export const SUPPLY_ERROR = "SUPPLY_ERROR";
export const supplyError = (asset, error) => ({
    type: SUPPLY_ERROR,
    payload: {
        error,
        asset
    }
});

//                                               //
// ------------ BORROW METHOD ACTIONS --------   //
//                                               //

export const BORROW_PENDING = "BORROW_PENDING";
export const borrowPending = asset => ({
    type: BORROW_PENDING,
    payload: asset
});

export const BORROW_SUCCESS = "BORROW_SUCCESS";
export const borrowSuccess = asset => ({
    type: BORROW_SUCCESS,
    payload: asset
});

export const BORROW_ERROR = "BORROW_ERROR";
export const borrowError = (asset, error) => ({
    type: BORROW_ERROR,
    payload: {
        error,
        asset
    }
});

//                                               //
// ------------ REPAY METHOD ACTIONS --------   //
//                                               //

export const REPAY_PENDING = "REPAY_PENDING";
export const repayPending = asset => ({
    type: REPAY_PENDING,
    payload: asset
});

export const REPAY_SUCCESS = "REPAY_SUCCESS";
export const repaySuccess = asset => ({
    type: REPAY_SUCCESS,
    payload: asset
});

export const REPAY_ERROR = "REPAY_ERROR";
export const repayError = (asset, error) => ({
    type: REPAY_ERROR,
    payload: {
        error,
        asset
    }
});

//                                               //
// ------------ REDEEM METHOD ACTIONS --------   //
//                                               //

export const REDEEM_PENDING = "REDEEM_PENDING";
export const redeemPending = asset => ({
    type: REDEEM_PENDING,
    payload: asset
});

export const REDEEM_SUCCESS = "REDEEM_SUCCESS";
export const redeemSuccess = asset => ({
    type: REDEEM_SUCCESS,
    payload: asset
});

export const REDEEM_ERROR = "REDEEM_ERROR";
export const redeemError = (asset, error) => ({
    type: REDEEM_ERROR,
    payload: {
        error,
        asset
    }
});

//                                               //
// ------------ APPROVE METHOD ACTIONS --------   //
//                                               //

export const APPROVE_PENDING = "APPROVE_PENDING";
export const approvePending = asset => ({
    type: APPROVE_PENDING,
    payload: asset
});

export const APPROVE_SUCCESS = "APPROVE_SUCCESS";
export const approveSuccess = asset => ({
    type: APPROVE_SUCCESS,
    payload: asset
});

export const APPROVE_ERROR = "APPROVE_ERROR";
export const approveError = (asset, error) => ({
    type: APPROVE_ERROR,
    payload: {
        error,
        asset
    }
});

//                                               //
// ------------ ALLOCATE METHOD ACTIONS --------   //
//                                               //

export const ALLOCATE_PENDING = "ALLOCATE_PENDING";
export const allocatePending = asset => ({
    type: ALLOCATE_PENDING,
    payload: asset
});

export const ALLOCATE_SUCCESS = "ALLOCATE_SUCCESS";
export const allocateSuccess = asset => ({
    type: ALLOCATE_SUCCESS,
    payload: asset
});

export const ALLOCATE_ERROR = "ALLOCATE_ERROR";
export const allocateError = (asset, error) => ({
    type: ALLOCATE_ERROR,
    payload: {
        error,
        asset
    }
});
