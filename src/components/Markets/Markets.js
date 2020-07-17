import React from "react";
import "./markets.scss";
import _ from "lodash";

import MyProgress from "./Progress";
import WETH from "assets/images/WETH.svg";
import USDT from "assets/images/USDT.svg";
import WBTC from "assets/images/WBTC.svg";
import DAI from "assets/images/DAI.svg";
// png
import USDC from "assets/images/USDC.svg";
import PAX from "assets/images/pax.png";

import {
    compare_supply,
    compare_borrow,
    format_str_to_kmb,
    format_str_to_percent,
} from "utils/markets";

// add i18n.
import { IntlProvider, FormattedMessage } from "react-intl";
import en_US from "language/en_US";
import zh_CN from "language/zh_CN";

export default class Markets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data_is_ok: false,
            token: {
                WETH: WETH,
                USDT: USDT,
                USDC: USDC,
                PAX: PAX,
                WBTC: WBTC,
                DAI: DAI,
            },
            cur_language: navigator.language === "zh-CN" ? "中文" : "English",
            arr_token: [
                "0x249987094de97C9612b8d04C15Ca8273e43C20AC", // usdt
                "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa", // dai
                "0xC8b1a5ef2e19937dd6c0f804DF2e3efE9F093B1e", // weth
                "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b", // usdc
                "0x722E6238335d89393A42e2cA316A5fb1b8B2EB55", // pax
                "0x577d296678535e4903d59a4c929b718e1d575e0a", // wbtc
            ],
        };

        // product
        this.markets_api = "https://api.alkemi.network/markets";

        this.get_markets_data();

        this.timer = setInterval(() => {
            this.get_markets_data();
        }, 1000 * 15);
    }

    get_markets_data = () => {
        fetch(this.markets_api)
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                if (data) {
                    let obj_data = JSON.parse(data);

                    let arr_markets = [];
                    let key_markets = Object.keys(obj_data);

                    for (var i = 0; i < key_markets.length; i++) {
                        arr_markets.push(obj_data[key_markets[i]]);
                    }

                    let arr_items = [];

                    let asset;
                    let totalSupplyBalanceUSD = 0;
                    let totalBorrowBalanceUSD = 0;

                    for (var x = 0; x < arr_markets.length; x++) {
                        let key_items = Object.values(arr_markets[x]);

                        asset = key_items[1];

                        totalSupplyBalanceUSD += parseFloat(
                            asset.totalSupplyUSD
                        );
                        totalBorrowBalanceUSD += parseFloat(
                            asset.totalBorrowUSD
                        );

                        arr_items.push(asset);
                    }

                    let totalCollateralRatio =
                        (totalSupplyBalanceUSD / totalBorrowBalanceUSD) * 100;

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

                    this.setState(
                        {
                            data: obj_data,
                            data_is_ok: true,
                            data_markets: arr_markets,
                            totals: totals,
                        },
                        () => {
                            var supply_array = _.cloneDeep(
                                this.state.data_markets
                            );
                            var borrow_array = _.cloneDeep(
                                this.state.data_markets
                            );

                            supply_array.sort(compare_supply);
                            borrow_array.sort(compare_borrow);

                            for (var i = 0; i < supply_array.length; i++) {
                                supply_array[i].percentage_supply = Number(
                                    (supply_array[i].totalSupplyUSD /
                                        this.state.totals
                                            .totalSupplyBalanceUSD) *
                                        100
                                ).toFixed(1);
                            }
                            for (var j = 0; j < borrow_array.length; j++) {
                                borrow_array[j].percentage_borrow = Number(
                                    (borrow_array[j].totalBorrowUSD /
                                        this.state.totals
                                            .totalBorrowBalanceUSD) *
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

    render() {
        return (
            <IntlProvider
                locale={"en"}
                messages={this.state.cur_language === "中文" ? zh_CN : en_US}
            >
                <div className="header">
                    <div className="header-item supply-balance">
                        <div className="item-title">
                            <FormattedMessage id="Total_Supply_Balance" />
                        </div>
                        <div className="item-num">
                            ${" "}
                            {this.state.data_is_ok &&
                                format_str_to_kmb(
                                    this.state.totals.totalSupplyBalanceUSD.toString()
                                )}
                        </div>
                    </div>

                    <div className="header-item borrow-balance">
                        <div className="item-title">
                            <FormattedMessage id="Total_Borrow_Balance" />
                        </div>
                        <div className="item-num item-num-borrow">
                            $
                            {this.state.data_is_ok &&
                                format_str_to_kmb(
                                    this.state.totals.totalBorrowBalanceUSD.toString()
                                )}
                        </div>
                    </div>

                    <div className="header-item collate-rate no-right-margin">
                        <div className="item-title">
                            <FormattedMessage id="Total_Collateralization_ratio" />
                        </div>
                        <div className="item-num item-num-ratio">
                            {this.state.data_is_ok &&
                                this.state.totals.totalCollateralRatio}
                            %
                        </div>
                    </div>
                </div>

                <div className="total-wrap">
                    <div className="total-wrap-supply">
                        <h4>
                            <FormattedMessage id="Total_Supply" />
                        </h4>
                        <div
                            className="pro_wrap"
                            style={{ width: "100%", margin: "0 auto" }}
                        >
                            {this.state.array_is_ok &&
                                this.state.supply_array.map((supply_item) => {
                                    return (
                                        <MyProgress
                                            {...supply_item}
                                            key={supply_item.symbol}
                                            type={"supply"}
                                        />
                                    );
                                })}
                        </div>
                    </div>

                    <div className="total-wrap-borrow">
                        <h4>
                            <FormattedMessage id="Total_Borrow" />
                        </h4>
                        <div
                            className="pro_wrap"
                            style={{ width: "100%", margin: "0 auto" }}
                        >
                            {this.state.array_is_ok &&
                                this.state.borrow_array.map((borrow_item) => {
                                    return (
                                        <MyProgress
                                            {...borrow_item}
                                            key={borrow_item.symbol}
                                            type={"borrow"}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>

                <div className="all-markets">
                    <h5>
                        <FormattedMessage id="All_Markets" />
                    </h5>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <span
                                        className={
                                            this.state.cur_language ===
                                            "English"
                                                ? "linheight45"
                                                : "linheight30"
                                        }
                                    >
                                        <FormattedMessage id="Market" />
                                    </span>
                                </th>
                                <th>
                                    <span
                                        className={
                                            this.state.cur_language ===
                                            "English"
                                                ? "linheight45"
                                                : "linheight30"
                                        }
                                    >
                                        <FormattedMessage id="Gross_Supply" />
                                    </span>
                                </th>
                                <th>
                                    <span
                                        className={
                                            this.state.cur_language ===
                                            "English"
                                                ? "linheight45"
                                                : "linheight30"
                                        }
                                    >
                                        <FormattedMessage id="Supply_APR" />
                                    </span>
                                </th>
                                <th>
                                    <span
                                        className={
                                            this.state.cur_language ===
                                            "English"
                                                ? "linheight45"
                                                : "linheight30"
                                        }
                                    >
                                        <FormattedMessage id="Gross_Borrow" />
                                    </span>
                                </th>
                                <th>
                                    <span
                                        className={
                                            this.state.cur_language ===
                                            "English"
                                                ? "linheight45"
                                                : "linheight30"
                                        }
                                    >
                                        <FormattedMessage id="Borrow_APR" />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <div className="body-wrap">
                        <table>
                            <tbody>
                                {this.state.data_is_ok &&
                                    this.state.data_markets.map((item) => (
                                        <tr key={item.address}>
                                            <td>
                                                <img
                                                    alt={item.name}
                                                    src={
                                                        this.state.token[
                                                            item.symbol
                                                        ]
                                                    }
                                                />
                                                <span className="token-name">
                                                    {item.name}
                                                </span>
                                                <span className="token-name-short">
                                                    {item.symbol}
                                                </span>
                                            </td>
                                            <td>
                                                $
                                                {format_str_to_kmb(
                                                    item.totalSupplyUSD
                                                )}
                                            </td>
                                            <td>
                                                {format_str_to_percent(
                                                    item.supplyAPR
                                                )}
                                            </td>
                                            <td>
                                                $
                                                {format_str_to_kmb(
                                                    item.totalBorrowUSD
                                                )}
                                            </td>
                                            <td>
                                                {format_str_to_percent(
                                                    item.borrowAPR
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </IntlProvider>
        );
    }
}
