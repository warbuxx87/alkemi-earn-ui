import React from "react";
import "./markets.scss";
import _ from "lodash";

import MyProgress from "./Progress";
import imBTC from "assets/images/imBTC.svg";
import HUBTC from "assets/images/HBTC.svg";
import HBTC from "assets/images/HBTC.svg";
import USDx from "assets/images/USDx.svg";
import UUDD from "assets/images/UUDD.svg";
import WETH from "assets/images/WETH.svg";
import USDT from "assets/images/USDT.svg";
import WBTC from "assets/images/WBTC.svg";
import DAI from "assets/images/DAI.svg";
// png
import usdc from "assets/images/USDC.svg";
import tusd from "assets/images/tusd.png";
import pax from "assets/images/pax.png";

import {
  compare_supply,
  compare_borrow,
  format_str_to_kmb,
  format_str_to_percent,
  format_str_to_K
} from "./utils";

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
        UUDD: UUDD,
        imBTC: imBTC,
        USDT: USDT,
        USDx: USDx,
        HUBTC: HUBTC,
        HBTC: HBTC,
        USDC: usdc,
        TUSD: tusd,
        PAX: pax,
        WBTC: WBTC,
        DAI: DAI
      },
      cur_language: navigator.language === "zh-CN" ? "中文" : "English",
      arr_token: [
        "0xeb269732ab75A6fD61Ea60b06fE994cD32a83549", // usdx
        "0xdAC17F958D2ee523a2206206994597C13D831ec7", // usdt
        "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215", // dai
        // "0xb2F74419E49dc9536D8662b3671eB2E334442F3d", // weth
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // weth
        "0x3212b29E33587A00FB1C83346f5dBFA69A458923", // imbtc
        // "0x7b054eBe1D7e003afdA8e717DAEaB05D56D5836A",// imbtc
        "0x0316eb71485b0ab14103307bf65a021042c6d380", // hbtc
        // "0x84e96bb630a711d66789AcaBc237c087D8B371D3", // USDC
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // usdc
        "0x8E870D67F660D95d5be530380D0eC0bd388289E1", // pax
        "0x0000000000085d4780B73119b644AE5ecd22b376", // tusd
        "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" // wbtc
      ]
    };

    // test
    // this.markets_api = 'http://localhost:8080/info?data=markets';

    // product
    this.markets_api = "https://api.alkemi.network/info?data=markets";

    this.get_markets_data();

    this.timer = setInterval(() => {
      this.get_markets_data();
    }, 1000 * 15);
  }

  get_markets_data = () => {
    fetch(this.markets_api)
      .then(res => {
        return res.text();
      })
      .then(data => {
        if (data) {
          var obj_data = JSON.parse(data);
          //console.log(obj_data);

          var arr_markets = [];
          var key_arr = Object.keys(obj_data.markets);
          for (var i = 0; i < key_arr.length; i++) {
            arr_markets.push(obj_data.markets[key_arr[i]]);
          }
          //console.log(arr_markets);
          // return;

          this.setState(
            {
              data: obj_data,
              data_is_ok: true,
              data_markets: arr_markets
            },
            () => {
              var supply_array = _.cloneDeep(this.state.data_markets);
              var borrow_array = _.cloneDeep(this.state.data_markets);

              supply_array.sort(compare_supply);
              borrow_array.sort(compare_borrow);

              for (var i = 0; i < supply_array.length; i++) {
                supply_array[i].percentage_supply = Number(
                  (supply_array[i].grossSupplyUSD /
                    this.state.data.totalSupplyBalanceUSD) *
                    100
                ).toFixed(1);
              }
              for (var j = 0; j < borrow_array.length; j++) {
                borrow_array[j].percentage_borrow = Number(
                  (borrow_array[j].totalBorrowUSD /
                    this.state.data.totalBorrowBalanceUSD) *
                    100
                ).toFixed(1);
              }

              this.setState({
                supply_array: supply_array,
                borrow_array: borrow_array,
                array_is_ok: true
              });
              //console.log("Supply Array" + supply_array);
              //console.log("Borrow Array" + borrow_array);
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
              $
              {this.state.data_is_ok
                ? format_str_to_K(this.state.data.totalSupplyBalanceUSD)
                : "0.00"}
            </div>
          </div>

          <div className="header-item borrow-balance">
            <div className="item-title">
              <FormattedMessage id="Total_Borrow_Balance" />
            </div>
            <div className="item-num item-num-borrow">
              $
              {this.state.data_is_ok
                ? format_str_to_K(this.state.data.totalBorrowBalanceUSD)
                : "0.00"}
            </div>
          </div>

          <div className="header-item collate-rate no-right-margin">
            <div className="item-title">
              <FormattedMessage id="Total_Collateralization_ratio" />
            </div>
            <div className="item-num item-num-ratio">
              {this.state.data_is_ok
                ? format_str_to_percent(
                    this.state.data.totalCollateralizationRatio
                  )
                : "..."}
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
                this.state.supply_array.map(supply_item => {
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
                this.state.borrow_array.map(borrow_item => {
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
                      this.state.cur_language === "English"
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
                      this.state.cur_language === "English"
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
                      this.state.cur_language === "English"
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
                      this.state.cur_language === "English"
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
                      this.state.cur_language === "English"
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
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[0].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}

                {this.state.data_is_ok &&
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[1].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}

                {this.state.data_is_ok &&
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[2].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}

                {this.state.data_is_ok &&
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[3].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}

                {this.state.data_is_ok &&
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[4].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}

                {this.state.data_is_ok &&
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[5].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}

                {this.state.data_is_ok &&
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[6].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}

                {this.state.data_is_ok &&
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[7].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}

                {this.state.data_is_ok &&
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[8].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}

                {this.state.data_is_ok &&
                  this.state.data_markets.map(item => {
                    if (
                      item.asset.toLowerCase() ===
                      this.state.arr_token[9].toLowerCase()
                    ) {
                      return (
                        <tr key={item.asset}>
                          <td>
                            <img alt="" src={this.state.token[item.symbol]} />
                            <span className="token-name">{item.name}</span>
                            <span className="token-name-short">
                              {item.symbol}
                            </span>
                          </td>
                          <td>${format_str_to_kmb(item.grossSupplyUSD)}</td>
                          <td>{format_str_to_percent(item.supplyAPR)}</td>
                          <td>${format_str_to_kmb(item.totalBorrowUSD)}</td>
                          <td>{format_str_to_percent(item.borrowAPR)}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </IntlProvider>
    );
  }
}
