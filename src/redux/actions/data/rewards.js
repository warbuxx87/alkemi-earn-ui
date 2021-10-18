// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

//                                     //
// -------- ALK PRICE ACTIONS -------- //
//                                     //

// Declare action type as a constant
export const FETCH_ALK_PRICE_PENDING = "FETCH_ALK_PRICE_PENDING";

// Declare action creator
const fetchAlkPricePending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_ALK_PRICE_PENDING,
});

// Declare action type as a constant
export const FETCH_ALK_PRICE_SUCCESS = "FETCH_ALK_PRICE_SUCCESS";

// Declare action creator
const fetchAlkPriceSuccess = (txList) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_ALK_PRICE_SUCCESS,
    payload: {
        txList,
    },
});

// Declare action type as a constant
export const FETCH_ALK_PRICE_ERROR = "FETCH_ALK_PRICE_ERROR";

// Declare action creator
const fetchAlkPriceError = (error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_ALK_PRICE_ERROR,
    payload: new Error(),
    error: true,
});
