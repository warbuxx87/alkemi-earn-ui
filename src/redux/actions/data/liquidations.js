// Section 1: Utilities imports and low level imports

import _ from "lodash";

import { handle_liquidate_click } from "utils/drizzle";
import notify from "utils/notify";

const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                      //
// ------- LIQUIDATIONS ACTIONS ------- //
//                                      //

// Liquidation data (ones that populate the table + drawer)

// Declare action type as a constant
export const FETCH_LIQUIDATIONS_PENDING = "FETCH_LIQUIDATIONS_PENDING";

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

//                                               //
// -------------- LIQUIDATE ACTIONS --------------  //
//                                               //

// track the smart contract calls

// Declare action type as a constant
export const LIQUIDATE_PENDING = "LIQUIDATE_PENDING";

const liquidatePending = (asset) => ({
    type: LIQUIDATE_PENDING,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const LIQUIDATE_SUCCESS = "LIQUIDATE_SUCCESS";

const liquidateSuccess = (asset) => ({
    type: LIQUIDATE_SUCCESS,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const LIQUIDATE_ERROR = "LIQUIDATE_ERROR";

const liquidateError = (symbol, error) => ({
    type: LIQUIDATE_ERROR,
    payload: {
        symbol,
    },
    error,
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
    if (!url_map[currentNetworkName].liquidations_url) return;

    dispatch(fetchLiquidationsPending());

    fetch(url_map[currentNetworkName].liquidations_url)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                const obj_data = JSON.parse(data);

                dispatch(fetchLiquidationsSuccess(obj_data));
            }
        })
        .catch((error) => {
            dispatch(fetchLiquidationsError(error.message));
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

export const onLiquidateAction = ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    symbol,
    amount,
    assetCollateral,
    assetBorrow,
    targetAccount,
}) => async (dispatch) => {
    dispatch(liquidatePending(symbol));
    handle_liquidate_click({
        drizzle,
        userWalletNetwork,
        userWalletAddress,
        symbol,
        amount,
        assetCollateral,
        assetBorrow,
        targetAccount,
    })
        .then(() => dispatch(liquidateSuccess(symbol)))
        .catch((error) => {
            notify.notification({
                eventCode: "liquidateError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(liquidateError(symbol, error.message));
        });
};
