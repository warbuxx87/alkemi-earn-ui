// Section 1: Utilities imports and low level imports

import _ from "lodash";
import web3 from "web3";

const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                      //
// ------------ PRICE ACTIONS -------- //
//                                      //

// Declare action type as a constant
export const FETCH_PRICE_PENDING = "FETCH_PRICE_PENDING";

// Declare action creator
const fetchPricePending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_PRICE_PENDING,
});

// Declare action type as a constant
export const FETCH_PRICE_SUCCESS = "FETCH_PRICE_SUCCESS";

// Declare action creator
const fetchPriceSuccess = (price) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_PRICE_SUCCESS,
    payload: {
        price,
    },
});

// Declare action type as a constant
export const FETCH_PRICE_ERROR = "FETCH_PRICE_ERROR";

// Declare action creator
const fetchPriceError = (error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_PRICE_ERROR,
    payload: new Error(),
    error: true,
});

//                                               //
// ------------ PRICE METHOD ACTIONS --------   //
//                                               //

const fetchPriceCall = ({ currentNetworkName, address, dispatch }) => {
    if (!url_map[currentNetworkName].markets_url) return;

    dispatch(fetchPricePending());

    fetch(url_map[currentNetworkName].markets_url)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                const obj_data = JSON.parse(data);

                const marketsData = obj_data.find((market) =>
                    Object.prototype.hasOwnProperty.call(market, address)
                );

                dispatch(
                    fetchPriceSuccess(
                        web3.utils.toWei(
                            marketsData[address].oraclePrice.toString()
                        )
                    )
                );
            }
        })
        .catch((error) => {
            dispatch(fetchPriceError(error.message));
        });
};

// This call may be fetched from multiple containers but only executes once every 15 seconds
const throttledFetchPrice = _.throttle(fetchPriceCall, 15 * 1000, {
    trailing: false,
});

// Section 3: Action dispatch methods and async funcs

export const fetchPrice = ({ currentNetworkName, address }) => async (
    dispatch
) => {
    throttledFetchPrice({ currentNetworkName, address, dispatch });
};
