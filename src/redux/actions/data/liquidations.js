// Section 1: Utilities imports and low level imports

import _ from "lodash";

const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                      //
// ------- LIQUIDATIONS ACTIONS ------- //
//                                      //

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
                //const obj_data = JSON.parse(data);

                const liquidationsData = [
                    {
                        address: "0x4553e229A33023a262B1Fc5Dc0076e4798AdDfC1",
                        //shortfallEth: "0",

                        totalSupplyWeth: "3845.0579907454335",
                        totalSupplyUSD: "1530148.5175331268",
                        totalBorrowWeth: "2242.736099230467",
                        totalBorrowUSD: "892501.3161609628",
                        shortfallWeth: "1", //
                        collateralRate: "1.1", // supposed 110%
                        borrow: [
                            {
                                asset: "string",
                                name: "string",
                                symbol: "string",
                                decimal: 0,
                                oraclePrice: "string",
                                amount: "string",
                                USDValue: "string",
                                price: "string",
                            },
                        ],
                        supply: [
                            {
                                asset: "DAI",
                                name: "DAI",
                                symbol: "DAI",
                                decimal: 18,
                                oraclePrice: "153.45",
                                amount: "10",
                                USDValue: "1",
                                price: "1",
                            },
                        ],
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
