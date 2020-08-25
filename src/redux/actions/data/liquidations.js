// Section 1: Utilities imports and low level imports

import _ from "lodash";

const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                      //
// ------- LIQUIDATIONS ACTIONS ------- //
//                                      //

// Declare action type as a constant
export const FETCH_LIQUIDATIONS_PENDING =
    "FETCH_LIQUIDATIONS_PEFETCH_LIQUIDATIONS_PENDINGNDING";

// Declare action creator
const fetchLiquidationsPending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LIQUIDATIONS_PENDING,
});

// Declare action type as a constant
export const FETCH_LIQUIDATIONS_SUCCESS = "FETCH_LIQUIDATIONS_SUCCESS";

// Declare action creator
const fetchLiquidationsSuccess = (liquidations) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LIQUIDATIONS_SUCCESS,
    payload: {
        liquidations,
    },
});

// Declare action type as a constant
export const FETCH_LIQUIDATIONS_ERROR = "FETCH_LIQUIDATIONS_ERROR";

// Declare action creator
const fetchLiquidationsError = (error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LIQUIDATIONS_ERROR,
    payload: new Error(),
    error: true,
});

//                                               //
// ------- LIQUIDATIONS METHOD ACTIONS --------  //
//                                               //

const fetchLiquidationsCall = ({ currentNetworkName, address, dispatch }) => {
    if (!url_map[currentNetworkName].accounts_url) return;

    //dispatch(fetchLiquidationsPending());

    fetch(url_map[currentNetworkName].accounts_url)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                const obj_data = JSON.parse(data);
                console.log(obj_data);
                /*const marketsData = obj_data.find((market) =>
                    Object.prototype.hasOwnProperty.call(market, address)
                );*/

                /*
                dispatch(
                    fetchLiquidationsSuccess(
                        marketsData[address].oracleLiquidations.slice(0, -12)
                    )
                ); // TODO: USDC decimals should be only 6 but returns 12 zeros*/
            }
        })
        .catch((error) => {
            //dispatch(fetchLiquidationsError(error.message));
        });
};

// This call may be fetched from multiple containers but only executes once every 15 seconds
const throttledFetchLiquidations = _.throttle(
    fetchLiquidationsCall,
    15 * 1000,
    {
        trailing: false,
    }
);

// Section 3: Action dispatch methods and async funcs

export const fetchLiquidations = ({ currentNetworkName, address }) => async (
    dispatch
) => {
    throttledFetchLiquidations({ currentNetworkName, address, dispatch });
};
