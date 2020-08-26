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
    if (!url_map[currentNetworkName].accounts_url) return;

    dispatch(fetchLiquidationsPending());

    fetch(url_map[currentNetworkName].accounts_url)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                const obj_data = JSON.parse(data);
                console.log("obj_data: ", obj_data);
                const liquidationsData = [
                    {
                        address: "0x3C5EF68490b1E85B9474B1a6a7805651D95479D9",
                        totalSupplyETH: "447.90117363817166",
                        totalSupplyUSD: "171089.2903063089",
                        totalBorrowETH: "359.19912484127724",
                        totalBorrowUSD: "137206.88170687112",
                        shortfallETH: "1",
                        shortfallUSD: "383.09",
                        collateralRate: "1.1",
                        supply: [
                            {
                                asset:
                                    "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
                                name: "USD Coin",
                                symbol: "USDC",
                                decimal: 6,
                                amountToken: 500.299829,
                                priceETH: "0.0026179381119430327",
                                priceUSD: "1",
                                valueETH: "5.002998289999999e-10",
                                valueUSD: "500.299829",
                            },
                            {
                                asset:
                                    "0x577d296678535e4903d59a4c929b718e1d575e0a",
                                name: "Wrapped Bitcoin",
                                symbol: "WBTC",
                                decimal: 8,
                                amountToken: 15.01485012,
                                priceETH: "29.743315189911065",
                                priceUSD: "11361.351536242231",
                                valueETH: "446.591419648434",
                                valueUSD: "170588.99047730886",
                            },
                        ],
                        borrow: [
                            {
                                asset:
                                    "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
                                name: "USD Coin",
                                symbol: "USDC",
                                decimal: 6,
                                amountToken: 9828.957053,
                                priceETH: "0.0026179381119430327",
                                priceUSD: "1",
                                valueETH: "25.731601269699976",
                                valueUSD: "9828.957053",
                            },
                            {
                                asset:
                                    "0x577d296678535e4903d59a4c929b718e1d575e0a",
                                name: "Wrapped Bitcoin",
                                symbol: "WBTC",
                                decimal: 8,
                                amountToken: 11.21151161,
                                priceETH: "29.743315189911065",
                                priceUSD: "11361.351536242231",
                                valueETH: "333.46752357157726",
                                valueUSD: "127377.92465387112",
                            },
                        ],
                        created_at: "2020-08-26T09:53:41.228Z",
                        updated_at: "2020-08-26T09:53:41.228Z",
                    },
                ];

                dispatch(fetchLiquidationsSuccess(liquidationsData));
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
    /*
    amount,
    asset,
    */
}) => async (dispatch) => {
    console.log(
        "called liquidate",
        drizzle,
        userWalletNetwork,
        userWalletAddress,
        symbol
    );

    dispatch(liquidatePending(symbol));
    handle_liquidate_click({
        drizzle,
        userWalletNetwork,
        userWalletAddress,
        symbol,
        /*amount,
        asset,*/
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
