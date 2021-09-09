import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import { compare_supply, compare_borrow } from "utils/markets";

import { walletNetworkName } from "redux/selectors/data/onboard";
import { getPool } from "redux/selectors/status/pool";

import marketsByNetwork from "constants/markets_by_network.json";

const url_map = require("constants/url_map.json");

// Retrieve the USD price every 15 seconds
const useFetchMarkets = (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);

    const [marketsData, setMarketsData] = useState([]);

    const [supplyArray, setSupplyArray] = useState([]);
    const [borrowArray, setBorrowArray] = useState([]);

    const [calculationsTotals, setCalculationsTotals] = useState({});

    const currentPool = useSelector(getPool);

    useEffect(() => {
        let timer;

        // move this async call to redux if needs to be called from more than one place
        const get_markets_data = () => {
            if (
                !url_map[currentNetworkName][currentPool] ||
                !url_map[currentNetworkName][currentPool].markets_url
            )
                return;

            const markets_api =
                url_map[currentNetworkName][currentPool].markets_url;

            fetch(markets_api)
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                    if (data) {
                        let obj_data = JSON.parse(data);

                        // filtering data by network and pool
                        const arrayOfAssets =
                            marketsByNetwork[currentNetworkName][currentPool];

                        const dataFilteredByAssets = obj_data.filter(
                            (marketData) =>
                                arrayOfAssets.includes(
                                    Object.values(marketData)[0].symbol
                                )
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

                            totalSupplyBalanceUSD += parseFloat(
                                asset.totalSupplyUSD
                            );
                            totalBorrowBalanceUSD += parseFloat(
                                asset.totalBorrowUSD
                            );

                            return asset;
                        });

                        let totalCollateralRatio =
                            (totalSupplyBalanceUSD / totalBorrowBalanceUSD) *
                            100;

                        let totals = {};

                        totals.totalSupplyBalanceUSD = totalSupplyBalanceUSD.toFixed(
                            2
                        );
                        totals.totalBorrowBalanceUSD = totalBorrowBalanceUSD.toFixed(
                            2
                        );
                        totals.totalCollateralRatio = totalCollateralRatio.toFixed(
                            2
                        );

                        setMarketsData(arr_items);

                        let supply_array = _.cloneDeep(arr_items);
                        let borrow_array = _.cloneDeep(arr_items);

                        supply_array.sort(compare_supply);
                        borrow_array.sort(compare_borrow);

                        supply_array = supply_array.map((e) => {
                            e.percentage_supply = Number(
                                (e.totalSupplyUSD /
                                    totals.totalSupplyBalanceUSD) *
                                    100
                            ).toFixed(1);

                            return e;
                        });

                        borrow_array = borrow_array.map((e) => {
                            e.percentage_borrow = Number(
                                (e.totalBorrowUSD /
                                    totals.totalBorrowBalanceUSD) *
                                    100
                            ).toFixed(1);

                            if (isNaN(e.percentage_borrow))
                                e.percentage_borrow = "0";
                            return e;
                        });

                        setSupplyArray(supply_array);
                        setBorrowArray(borrow_array);
                        setCalculationsTotals(totals);
                    }
                });
        };

        const getMarketsData = (fetchPeriodically) => {
            if (currentNetworkName !== undefined) get_markets_data(); // TODO: retest this call when open network is set for main network

            if (fetchPeriodically === true) {
                timer = setTimeout(
                    () => getMarketsData(fetchPeriodically),
                    30 * 1000
                );
            }
        };

        if (currentNetworkName !== undefined) getMarketsData(fetchPeriodically);

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [dispatch, fetchPeriodically, currentNetworkName, currentPool]);

    return { marketsData, supplyArray, borrowArray, calculationsTotals };
};

export default useFetchMarkets;
