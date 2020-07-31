import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import _ from "lodash";

import { compare_supply, compare_borrow } from "utils/markets";

// import { fetchPrice } from "redux/actions/data/price";

// Retrieve the USD price every 15 seconds
export default (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const [supplyArray, setSupplyArray] = useState([]);
    const [borrowArray, setBorrowArray] = useState([]);
    //const [array_is_ok, setArrayReady] = useState(false);

    useEffect(() => {
        let timer;

        // TODO: move to redux
        const get_markets_data = () => {
            const markets_api = "https://api.alkemi.network/markets";

            fetch(markets_api)
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                    if (data) {
                        let obj_data = JSON.parse(data);
                        // console.log("obj_data", obj_data);

                        let arr_markets = [];
                        let key_markets = Object.keys(obj_data);
                        // console.log("key_markets", key_markets);

                        for (var i = 0; i < key_markets.length; i++) {
                            arr_markets.push(obj_data[key_markets[i]]);
                        }
                        // console.log("arr_markets", arr_markets);

                        let arr_items = [];

                        let asset;
                        let totalSupplyBalanceUSD = 0;
                        let totalBorrowBalanceUSD = 0;

                        for (var x = 0; x < arr_markets.length; x++) {
                            let key_items = Object.values(arr_markets[x]);

                            asset = key_items[0];

                            totalSupplyBalanceUSD += parseFloat(
                                asset.totalSupplyUSD
                            );
                            totalBorrowBalanceUSD += parseFloat(
                                asset.totalBorrowUSD
                            );

                            arr_items.push(asset);
                        }
                        // console.log("arr_items", arr_items);

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

                        arr_markets = arr_items;
                        // return;

                        console.log({
                            data: obj_data,
                            data_is_ok: true,
                            data_markets: arr_markets,
                            totals: totals,
                        });

                        let supply_array = _.cloneDeep(arr_markets);
                        let borrow_array = _.cloneDeep(arr_markets);

                        supply_array.sort(compare_supply);
                        borrow_array.sort(compare_borrow);

                        for (var i = 0; i < supply_array.length; i++) {
                            supply_array[i].percentage_supply = Number(
                                (supply_array[i].totalSupplyUSD /
                                    totals.totalSupplyBalanceUSD) *
                                    100
                            ).toFixed(1);
                        }
                        for (var j = 0; j < borrow_array.length; j++) {
                            borrow_array[j].percentage_borrow = Number(
                                (borrow_array[j].totalBorrowUSD /
                                    totals.totalBorrowBalanceUSD) *
                                    100
                            ).toFixed(1);
                        }

                        setSupplyArray(supply_array);
                        setBorrowArray(borrow_array);
                    }
                });
        };

        const getPrice = () => {
            get_markets_data();

            if (fetchPeriodically === true) {
                timer = setTimeout(getPrice, 15 * 1000);
            }
        };

        getPrice();

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [dispatch, fetchPeriodically]);

    return { supplyArray, borrowArray };
};
