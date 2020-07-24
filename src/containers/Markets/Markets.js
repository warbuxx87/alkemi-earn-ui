/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import Markets from "components/Markets/Markets_refactor";
import _ from "lodash";

import WETH from "assets/images/WETH.svg";
import USDT from "assets/images/USDT.svg";
import WBTC from "assets/images/WBTC.svg";
import DAI from "assets/images/DAI.svg";
import USDC from "assets/images/USDC.svg";
import PAX from "assets/images/pax.png";

import { compare_supply, compare_borrow } from "utils/markets";

const markets = {
    loaded: false,
    token: {
        WETH: WETH,
        USDT: USDT,
        USDC: USDC,
        PAX: PAX,
        WBTC: WBTC,
        DAI: DAI,
    },
    arr_token: [
        "0x249987094de97C9612b8d04C15Ca8273e43C20AC", // usdt
        "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa", // dai
        "0xC8b1a5ef2e19937dd6c0f804DF2e3efE9F093B1e", // weth
        "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b", // usdc
        "0x722E6238335d89393A42e2cA316A5fb1b8B2EB55", // pax
        "0x577d296678535e4903d59a4c929b718e1d575e0a", // wbtc
    ],
};

const markets_api = "https://api.alkemi.network/markets";

const get_markets_data = () => {
    fetch(markets_api)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                let obj_data = JSON.parse(data);
                console.log("obj_data", obj_data);

                let arr_markets = [];
                let key_markets = Object.keys(obj_data);
                console.log("key_markets", key_markets);

                for (let i = 0; i < key_markets.length; i++) {
                    arr_markets.push(obj_data[key_markets[i]]);
                }
                console.log("arr_markets", arr_markets);

                let arr_items = [];

                let asset;
                let totalSupplyBalanceUSD = 0;
                let totalBorrowBalanceUSD = 0;

                for (let x = 0; x < arr_markets.length; x++) {
                    let key_items = Object.values(arr_markets[x]);

                    asset = key_items[1];

                    totalSupplyBalanceUSD += parseFloat(asset.totalSupplyUSD);
                    totalBorrowBalanceUSD += parseFloat(asset.totalBorrowUSD);

                    arr_items.push(asset);
                }
                console.log("arr_items", arr_items);

                let totalCollateralRatio =
                    (totalSupplyBalanceUSD / totalBorrowBalanceUSD) * 100;

                let totals = {};

                totals.totalSupplyBalanceUSD = totalSupplyBalanceUSD.toFixed(2);
                totals.totalBorrowBalanceUSD = totalBorrowBalanceUSD.toFixed(2);
                totals.totalCollateralRatio = totalCollateralRatio.toFixed(2);

                arr_markets = arr_items;
                // return;

                this.setState(
                    {
                        data: obj_data,
                        data_is_ok: true,
                        data_markets: arr_markets,
                        totals: totals,
                    },
                    () => {
                        let supply_array = _.cloneDeep(this.state.data_markets);
                        let borrow_array = _.cloneDeep(this.state.data_markets);

                        supply_array.sort(compare_supply);
                        borrow_array.sort(compare_borrow);

                        for (let i = 0; i < supply_array.length; i++) {
                            supply_array[i].percentage_supply = Number(
                                (supply_array[i].totalSupplyUSD /
                                    this.state.totals.totalSupplyBalanceUSD) *
                                    100
                            ).toFixed(1);
                        }
                        for (let j = 0; j < borrow_array.length; j++) {
                            borrow_array[j].percentage_borrow = Number(
                                (borrow_array[j].totalBorrowUSD /
                                    this.state.totals.totalBorrowBalanceUSD) *
                                    100
                            ).toFixed(1);
                        }

                        this.setState({
                            supply_array: supply_array,
                            borrow_array: borrow_array,
                            array_is_ok: true,
                        });
                    }
                );
            }
        });
};

const MarketContainer = (markets, data) => {
    return <Markets markets={markets} data={data} />;
};

const mapStateToProps = (state) => ({
    markets: markets,
    data: get_markets_data(),
});

export default connect(mapStateToProps)(MarketContainer);
