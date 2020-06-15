// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

//                                     //
// ------------ STATS ACTIONS -------- //
//                                     //

// Declare action type as a constant
export const FETCH_STATS_PENDING = "FETCH_STATS_PENDING";

// Declare action creator
const fetchStatsPending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_STATS_PENDING,
});

// Declare action type as a constant
export const FETCH_STATS_SUCCESS = "FETCH_STATS_SUCCESS";

// Declare action creator
const fetchStatsSuccess = (tx) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_STATS_SUCCESS,
    payload: tx,
});

// Declare action type as a constant
export const FETCH_STATS_ERROR = "FETCH_STATS_ERROR";
/*
// Declare action creator
const fetchStatsError = error => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_STATS_ERROR,
    payload: new Error(),
    error: true
});*/

// Section 3: Action dispatch methods and async funcs

export const fetchStatsAction = (tx) => async (dispatch) => {
    dispatch(fetchStatsPending());
    setTimeout(() => {
        // mock delay, will remove
        dispatch(fetchStatsSuccess(tx));
    }, 3000);
};
