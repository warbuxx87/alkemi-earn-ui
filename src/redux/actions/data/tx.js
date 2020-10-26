// Section 1: Utilities imports and low level imports
import _ from "lodash";

import { fetchTimestampsOfBlocks } from "./history";

const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                     //
// ------------ TX ACTIONS --------    //
//                                     //

// Declare action type as a constant
export const FETCH_TX_PENDING = "FETCH_TX_PENDING";

// Declare action creator
const fetchTxPending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_TX_PENDING,
});

// Declare action type as a constant
export const FETCH_TX_SUCCESS = "FETCH_TX_SUCCESS";

// Declare action creator
const fetchTxSuccess = (txList) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_TX_SUCCESS,
    payload: {
        txList,
    },
});

// Declare action type as a constant
export const FETCH_TX_ERROR = "FETCH_TX_ERROR";

// Declare action creator
const fetchTxError = (error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_TX_ERROR,
    payload: new Error(),
    error: true,
});

//                                               //
// ---------------- RESET TX DATA -------------- //
//                                               //

export const RESET_TX_DATA = "RESET_TX_DATA";

const resetTxData = () => ({
    type: RESET_TX_DATA,
});

// Section 3: Action dispatch methods and async funcs
const fetchTxCall = ({ currentNetworkName, address, drizzle, dispatch }) => {
    if (!address) return;
    if (!url_map[currentNetworkName].history_url) return;

    dispatch(fetchTxPending());

    const params = "?account=" + address.toLowerCase();

    const accountURL = url_map[currentNetworkName].history_url + params;

    fetch(accountURL)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                const userTxList = JSON.parse(data);

                dispatch(fetchTxSuccess(userTxList));

                dispatch(
                    fetchTimestampsOfBlocks({
                        blocks: userTxList.map(
                            ({ blockNumber }) => blockNumber
                        ),
                        drizzle,
                    })
                );
            }
        })
        .catch((error) => {
            dispatch(fetchTxError(error.message));
        });
};

// This call may be fetched from multiple containers but only executes once every 60 seconds
const throttledFetchTx = _.throttle(fetchTxCall, 60 * 1000, {
    trailing: false,
});

export const fetchTx = ({
    currentNetworkName,
    address,
    drizzle,
    fetchPeriodically,
}) => async (dispatch) => {
    if (fetchPeriodically)
        // if fetchPeriodically set to true it will go through the throttled method
        throttledFetchTx({
            currentNetworkName,
            address,
            drizzle,
            dispatch,
        });
    // if not, it will call on fetch directly no matter what
    else
        fetchTxCall({
            currentNetworkName,
            address,
            drizzle,
            dispatch,
        });

    // this is to avoid the throttle to block the call when the user reconnects their wallet.
    // Of course as it is now, the call is triggered whenever the user opens the page, which good in a sense that the user wants fresh data each time
    // <!> Should think about a different logic flow if useFetchTx start being used from different sources,
    // The throttle code kept back so there is no need to rewrite it again, could be refactored later one if unnecessary
};

// Reset Tx data and cancels throttled recurring fetch calls
export const resetTxDataAndCancelFetch = () => (dispatch) => {
    if (throttledFetchTx) {
        throttledFetchTx.cancel();
    }

    dispatch(resetTxData());
};
