import React, { Component } from 'react';
// import MediaQuery from 'react-responsive';
import { Button } from 'antd';
import './home.scss';

import { format_str_to_kmb } from '../../util.js';

// add i18n.
import { IntlProvider, FormattedMessage } from 'react-intl';
import en_US from '../../language/en_US.js';
import zh_CN from '../../language/zh_CN';


class HomeNoWeb3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      USDx_item: {},
      USDT_item: {},
      WETH_item: {},
      imBTC_item: {},
      HBTC_item: {}
    };

    this.markets_api = "https://api.lendf.me/v1/info?data=markets";
  }


  // format aprs
  format_APR = str_num => {
    // console.log(str_num);
    var index_num = str_num.indexOf(".") + 2;
    var cpmp_str = str_num.replace(/\./, "");
    var res_str =
      cpmp_str.slice(0, index_num) + "." + cpmp_str.substr(index_num, 2);
    // console.log(Number(res_str))
    return Number(res_str);
  };
  // get total status
  get_markets = () => {
    // "0.00000120110112".slice(0, "0.00000120110112".indexOf('.')+3)
    fetch(this.markets_api)
      .then(res => {
        return res.text();
      })
      .then(data => {
        if (data) {
          var obj_data = JSON.parse(data);
          console.log(obj_data);
          obj_data.markets.map(item => {
            if (item.symbol === "USDx") {
              this.setState({
                USDx_item: item
              });
              return null;
            } else if (item.symbol === "WETH") {
              this.setState({
                WETH_item: item
              });
              return null;
            } else if (item.symbol === "USDT") {
              this.setState({
                USDT_item: item
              });
              return null;
            } else if (item.symbol === "HBTC") {
              this.setState({
                HBTC_item: item
              });
              return null;
            } else {
              this.setState({
                imBTC_item: item
              });
              return null;
            }
          });
        }
      });
  };

  componentDidMount = () => {
    this.get_markets();

    this.timerID = setInterval(() => {
      this.get_markets();
    }, 15 * 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  };

  render() {
    return (
      <IntlProvider
        locale={"en"}
        messages={navigator.language === "zh-CN" ? zh_CN : en_US}
      >
        <div className="top">
          <div className="logo">
            <img className="logo-img" src="images/alkemi_logo.svg" alt="" />
          </div>

          <div className="netstatus">
            <React.Fragment>
              <div className="content-btn">
                <FormattedMessage id="connect" />
              </div>
            </React.Fragment>
          </div>

          <div className="Platform">
            <span className="Platform-title">Alkemi Network</span>
            <span className="Platform-img">
              <img src="images/down.svg" alt="" />
            </span>
            <div className="Platform-fixed"></div>
          </div>
          <div className="clear"></div>
        </div>



        <div className="card-wrap">
          {/* USDx */}
          <div className="card card-margin-right">
            <div className="card-top">
              <div className="card-top-left">
                <img src={"images/Home_USDx.svg"} alt="" />
                <span>USDx</span>
              </div>
              <div className="card-top-right">
                <span className="market">
                  <FormattedMessage id="market_size" />
                </span>
                <span className="market-num">
                  {this.state.USDx_item.grossSupplyUSD
                    ? "$" +
                      format_str_to_kmb(this.state.USDx_item.grossSupplyUSD)
                    : "···"}
                </span>
              </div>
            </div>
            <div className="clear"></div>

            <div className="card-center">
              <div className={"supply-apr"}>
                <span className="apr">
                  <FormattedMessage id="supply_APR" />
                </span>
                <span className="apr-num apr-num-left">
                  {this.state.USDx_item.supplyAPR
                    ? this.state.USDx_item.supplyAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.USDx_item.supplyAPR) + "%"
                    : "···"}
                </span>
              </div>

              <div className={"borrow-apr"}>
                <span className="apr">
                  <FormattedMessage id="borrow_APR" />
                </span>
                <span className="apr-num apr-num-center">
                  {this.state.USDx_item.borrowAPR
                    ? this.state.USDx_item.borrowAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.USDx_item.borrowAPR) + "%"
                    : "···"}
                </span>
              </div>

              <div className={"u-rate"}>
                <span className="apr">
                  <FormattedMessage id="utilization_Rate" />
                </span>
                <span className="apr-num apr-num-right">
                  {this.state.USDx_item.utilizationRate
                    ? this.state.USDx_item.utilizationRate + "%"
                    : "···"}
                </span>
              </div>
            </div>

            <div className="card-bottom">
              <div className={"button-wrap-home"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="SUPPLY" />
                </Button>
              </div>
              <div className={"button-wrap-home-borrow deposit-first-wrap"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="BORROW" />
                </Button>
              </div>
            </div>
          </div>

          {/* USDT */}
          <div className="card">
            <div className="card-top">
              <div className="card-top-left">
                <img src={"images/Home_USDT.svg"} alt="" />
                <span className="token-usdt">USDT</span>
              </div>
              <div className="card-top-right">
                <span className="market">
                  <FormattedMessage id="market_size" />
                </span>
                <span className="market-num">
                  {this.state.USDT_item.grossSupplyUSD
                    ? "$" +
                      format_str_to_kmb(this.state.USDT_item.grossSupplyUSD)
                    : "···"}
                </span>
              </div>
            </div>
            <div className="clear"></div>

            <div className="card-center">
              <div className={"supply-apr"}>
                <span className="apr">
                  <FormattedMessage id="supply_APR" />
                </span>
                <span className="apr-num apr-num-left">
                  {this.state.USDT_item.supplyAPR
                    ? this.state.USDT_item.supplyAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.USDT_item.supplyAPR) + "%"
                    : "···"}
                </span>
              </div>

              <div className={"borrow-apr"}>
                <span className="apr">
                  <FormattedMessage id="borrow_APR" />
                </span>
                <span className="apr-num apr-num-center">
                  {this.state.USDT_item.borrowAPR
                    ? this.state.USDT_item.borrowAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.USDT_item.borrowAPR) + "%"
                    : "···"}
                </span>
              </div>

              <div className={"u-rate"}>
                <span className="apr">
                  <FormattedMessage id="utilization_Rate" />
                </span>
                <span className="apr-num apr-num-right">
                  {this.state.USDT_item.utilizationRate
                    ? this.state.USDT_item.utilizationRate + "%"
                    : "···"}
                </span>
              </div>
            </div>

            <div className="card-bottom">
              <div className={"button-wrap-home"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="SUPPLY" />
                </Button>
              </div>
              <div className={"button-wrap-home-borrow deposit-first-wrap"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="BORROW" />
                </Button>
              </div>
            </div>
          </div>

          {/* WETH */}
          <div className="card card-margin-right">
            <div className="card-top">
              <div className="card-top-left">
                <img src={"images/Home_WETH.svg"} alt="" />
                <span className="token-weth">WETH</span>
              </div>
              <div className="card-top-right">
                <span className="market">
                  <FormattedMessage id="market_size" />
                </span>
                <span className="market-num">
                  {this.state.WETH_item.grossSupplyUSD
                    ? "$" +
                      format_str_to_kmb(this.state.WETH_item.grossSupplyUSD)
                    : "···"}
                </span>
              </div>
            </div>
            <div className="clear"></div>

            <div className="card-center">
              <div className={"supply-apr"}>
                <span className="apr">
                  <FormattedMessage id="supply_APR" />
                </span>
                <span className="apr-num apr-num-left">
                  {this.state.WETH_item.supplyAPR
                    ? this.state.WETH_item.supplyAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.WETH_item.supplyAPR) + "%"
                    : "···"}
                </span>
              </div>

              <div className={"borrow-apr"}>
                <span className="apr">
                  <FormattedMessage id="borrow_APR" />
                </span>
                <span className="apr-num apr-num-center">
                  {this.state.WETH_item.borrowAPR
                    ? this.state.WETH_item.borrowAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.WETH_item.borrowAPR) + "%"
                    : "···"}
                </span>
              </div>

              <div className={"u-rate"}>
                <span className="apr">
                  <FormattedMessage id="utilization_Rate" />
                </span>
                <span className="apr-num apr-num-right">
                  {this.state.WETH_item.utilizationRate
                    ? this.state.WETH_item.utilizationRate + "%"
                    : "···"}
                </span>
              </div>
            </div>

            <div className="card-bottom">
              <div className={"button-wrap-home"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="SUPPLY" />
                </Button>
              </div>
              <div className={"button-wrap-home-borrow deposit-first-wrap"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="BORROW" />
                </Button>
              </div>
            </div>
          </div>

          {/* imBTC */}
          <div className="card card-special">
            <div className="card-top">
              <div className="card-top-left">
                <img src={"images/Home_imBTC.svg"} alt="" />
                <span className="token-imbtc">imBTC</span>
              </div>
              <div className="card-top-right">
                <span className="market">
                  <FormattedMessage id="market_size" />
                </span>
                <span className="market-num">
                  {this.state.imBTC_item.grossSupplyUSD
                    ? "$" +
                      format_str_to_kmb(this.state.imBTC_item.grossSupplyUSD)
                    : "···"}
                </span>
              </div>
            </div>
            <div className="clear"></div>

            <div className="card-center">
              <div className={"supply-apr"}>
                <span className="apr">
                  <FormattedMessage id="supply_APR" />
                </span>
                <span className="apr-num apr-num-left">
                  {this.state.imBTC_item.supplyAPR
                    ? this.state.imBTC_item.supplyAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.imBTC_item.supplyAPR) + "%"
                    : "···"}
                </span>
              </div>
              <div className={"borrow-apr"}>
                <span className="apr">
                  <FormattedMessage id="borrow_APR" />
                </span>
                <span className="apr-num apr-num-center">
                  {this.state.imBTC_item.borrowAPR
                    ? this.state.imBTC_item.borrowAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.imBTC_item.borrowAPR) + "%"
                    : "···"}
                </span>
              </div>
              <div className={"u-rate"}>
                <span className="apr">
                  <FormattedMessage id="utilization_Rate" />
                </span>
                <span className="apr-num apr-num-right">
                  {this.state.imBTC_item.utilizationRate
                    ? this.state.imBTC_item.utilizationRate + "%"
                    : "···"}
                </span>
              </div>
            </div>

            <div className="card-bottom">
              <div className={"button-wrap-home"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="SUPPLY" />
                </Button>
              </div>
              <div className={"button-wrap-home-borrow deposit-first-wrap"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="BORROW" />
                </Button>
              </div>
            </div>
          </div>

          {/* HBTC */}
          <div className="card card-special">
            <div className="card-top">
              <div className="card-top-left">
                <img src={"images/Home_HBTC.png"} alt="" />
                <span className="token-hbtc">HBTC</span>
              </div>
              <div className="card-top-right">
                <span className="market">
                  <FormattedMessage id="market_size" />
                </span>
                <span className="market-num">
                  {this.state.HBTC_item.grossSupplyUSD
                    ? "$" +
                      format_str_to_kmb(this.state.HBTC_item.grossSupplyUSD)
                    : "···"}
                </span>
              </div>
            </div>
            <div className="clear"></div>

            <div className="card-center">
              <div className={"supply-apr"}>
                <span className="apr">
                  <FormattedMessage id="supply_APR" />
                </span>
                <span className="apr-num apr-num-left">
                  {this.state.HBTC_item.supplyAPR
                    ? this.state.HBTC_item.supplyAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.HBTC_item.supplyAPR) + "%"
                    : "···"}
                </span>
              </div>
              <div className={"borrow-apr"}>
                <span className="apr">
                  <FormattedMessage id="borrow_APR" />
                </span>
                <span className="apr-num apr-num-center">
                  {this.state.HBTC_item.borrowAPR
                    ? this.state.HBTC_item.borrowAPR === "0.00"
                      ? "<0.01%"
                      : this.format_APR(this.state.HBTC_item.borrowAPR) + "%"
                    : "···"}
                </span>
              </div>
              <div className={"u-rate"}>
                <span className="apr">
                  <FormattedMessage id="utilization_Rate" />
                </span>
                <span className="apr-num apr-num-right">
                  {this.state.HBTC_item.utilizationRate
                    ? this.state.HBTC_item.utilizationRate + "%"
                    : "···"}
                </span>
              </div>
            </div>

            <div className="card-bottom">
              <div className={"button-wrap-home"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="SUPPLY" />
                </Button>
              </div>
              <div className={"button-wrap-home-borrow deposit-first-wrap"}>
                <Button
                  size="large"
                  className={"disable-button"}
                  disabled={false}
                >
                  <FormattedMessage id="BORROW" />
                </Button>
              </div>
            </div>
          </div>

          <div className="clear"></div>

        </div>
      </IntlProvider>
    );
  }
}

export default HomeNoWeb3;