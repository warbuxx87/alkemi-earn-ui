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
// ------------ SUPPLY ACTIONS --------   //
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
