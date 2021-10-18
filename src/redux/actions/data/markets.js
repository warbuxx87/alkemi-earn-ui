// Section 1: Utilities imports and low level imports

import _ from "lodash";
import marketsByNetwork from "constants/markets_by_network.json";
import { compare_supply, compare_borrow } from "utils/markets";

const url_map = require("constants/url_map.json");
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
const fetchMarketsSuccess = (data) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_MARKETS_SUCCESS,
    payload: {
        ...data,
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

export const fetchMarketsCall = ({
    currentNetworkName,
    currentPool,
    lastPool,
    dispatch,
}) => {
    if (
        !url_map[currentNetworkName][currentPool] ||
        !url_map[currentNetworkName][currentPool].markets_url
    )
        return;

    const markets_api = url_map[currentNetworkName][currentPool].markets_url;

    dispatch(fetchMarketsPending());

    fetch(markets_api)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            // if (lastPool !== currentPool) return; // prevent slower resolution and verified data overriding open data due to the fact that verified pool is the default one

            if (data) {
                let obj_data = JSON.parse(data);

                // filtering data by network and pool
                const arrayOfAssets =
                    marketsByNetwork[currentNetworkName][currentPool];

                const dataFilteredByAssets = obj_data.filter((marketData) =>
                    arrayOfAssets.includes(Object.values(marketData)[0].symbol)
                );
                // could filter out past tokens from here based on only configured assets in UI

                let key_markets = Object.keys(dataFilteredByAssets);

                const arr_markets = key_markets.map((e) => {
                    return dataFilteredByAssets[e];
                });

                let totalSupplyBalanceUSD = 0;
                let totalBorrowBalanceUSD = 0;

                const arr_items = arr_markets.map((market) => {
                    let key_items = Object.values(market);

                    let asset = key_items[0];

                    totalSupplyBalanceUSD += parseFloat(asset.totalSupplyUSD);
                    totalBorrowBalanceUSD += parseFloat(asset.totalBorrowUSD);

                    return asset;
                });

                let totalCollateralRatio =
                    (totalSupplyBalanceUSD / totalBorrowBalanceUSD) * 100;

                let totals = {};

                totals.totalSupplyBalanceUSD = totalSupplyBalanceUSD.toFixed(2);
                totals.totalBorrowBalanceUSD = totalBorrowBalanceUSD.toFixed(2);
                totals.totalCollateralRatio = totalCollateralRatio.toFixed(2);

                let supply_array = _.cloneDeep(arr_items);
                let borrow_array = _.cloneDeep(arr_items);

                supply_array.sort(compare_supply);
                borrow_array.sort(compare_borrow);

                supply_array = supply_array.map((e) => {
                    e.percentage_supply = Number(
                        (e.totalSupplyUSD / totals.totalSupplyBalanceUSD) * 100
                    ).toFixed(1);

                    return e;
                });

                borrow_array = borrow_array.map((e) => {
                    e.percentage_borrow = Number(
                        (e.totalBorrowUSD / totals.totalBorrowBalanceUSD) * 100
                    ).toFixed(1);

                    if (isNaN(e.percentage_borrow)) e.percentage_borrow = "0";
                    return e;
                });

                dispatch(
                    fetchMarketsSuccess({
                        marketsData: arr_items,
                        supplyArray: supply_array,
                        borrowArray: borrow_array,
                        calculationsTotals: totals,
                    })
                );
            }
        });
};

// This call may be fetched from multiple containers but only executes once every 15 seconds
const throttledFetchMarkets = _.throttle(fetchMarketsCall, 15 * 1000, {
    trailing: false,
});

// Section 3: Action dispatch methods and async funcs

export const fetchMarkets = ({
    currentNetworkName,
    currentPool,
    lastPool,
}) => async (dispatch) => {
    throttledFetchMarkets({
        currentNetworkName,
        currentPool,
        lastPool,
        dispatch,
    });
};
