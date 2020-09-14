// Section 1: Utilities imports and low level imports

import _ from "lodash";

const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                      //
// ------------ MARKETS ACTIONS -------- //
//                                      //

// Declare action type as a constant
export const FETCH_MARKETS_PENDING = "FETCH_MARKETS_PENDING";

// Declare action creator
const fetchMarketsPending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_MARKETS_PENDING,
});

// Declare action type as a constant
export const FETCH_MARKETS_SUCCESS = "FETCH_MARKETS_SUCCESS";

// Declare action creator
const fetchMarketsSuccess = (markets) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_MARKETS_SUCCESS,
    payload: {
        markets,
    },
});

// Declare action type as a constant
export const FETCH_MARKETS_ERROR = "FETCH_MARKETS_ERROR";

// Declare action creator
const fetchMarketsError = (error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_MARKETS_ERROR,
    payload: new Error(),
    error: true,
});

//                                               //
// ------------ MARKETS METHOD ACTIONS --------   //
//                                               //

const fetchMarketsCall = ({ currentNetworkName, address, dispatch }) => {
    if (!url_map[currentNetworkName].markets_url) return;
};

// This call may be fetched from multiple containers but only executes once every 15 seconds
const throttledFetchMarkets = _.throttle(fetchMarketsCall, 15 * 1000, {
    trailing: false,
});

// Section 3: Action dispatch methods and async funcs

export const fetchMarkets = ({ currentNetworkName, address }) => async (
    dispatch
) => {
    throttledFetchMarkets({ currentNetworkName, address, dispatch });
};
