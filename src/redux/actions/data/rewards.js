// Section 1: Utilities imports and low level imports
import _ from "lodash";

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
const fetchAlkPriceSuccess = (alkPrice) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_ALK_PRICE_SUCCESS,
    payload: {
        alkPrice,
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

//                                               //
// --------- ALK PRICE METHOD ACTIONS ---------  //
//                                               //

export const fetchAlkPriceCall = ({ dispatch }) => {
    dispatch(fetchAlkPricePending());

    const alk_price_api =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=alkemi-network-dao-token";

    fetch(alk_price_api)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                let obj_data = JSON.parse(data);

                dispatch(fetchAlkPriceSuccess(obj_data[0].current_price));
            }
        })
        .catch((e) => dispatch(fetchAlkPriceError()));
};

// This call may be fetched from multiple containers but only executes once every 15 seconds
const throttledFetchAlkPrice = _.throttle(fetchAlkPriceCall, 15 * 1000, {
    trailing: false,
});

// Section 3: Action dispatch methods and async funcs

export const fetchAlkPrice = () => async (dispatch) => {
    throttledFetchAlkPrice({
        dispatch,
    });
};
