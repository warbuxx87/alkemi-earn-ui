import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MediaQuery from "react-responsive";

import HomeNoWeb3 from './pages/home/homeNoWeb3';
import Markets from "./pages/markets/markets";
import LiquidateNoWeb3 from './pages/liquidate/liquidateNoWeb3';
import Footer from './component/footer/footer';

class AppNoWeb3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      USDX_item: {},
      USDT_item: {},
      WETH_item: {},
      imBTC_item: {},
      HBTC_item: {}
    };

    this.markets_api = "https://api.lendf.me/v1/info?data=markets";
  }

  // format str_num to_K
  format_num_to_K = str_num => {
    // console.log(str_num);
    var part_a = str_num.split(".")[0];
    var part_b = str_num.split(".")[1]; // .substr(0,2)

    if (part_b.length > 2) {
      part_b = part_b.substr(0, 2);
    }

    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    part_a = (part_a + "").replace(reg, "$&,");

    return part_a + "." + part_b;
  };
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
            if (item.symbol === "USDX") {
              this.setState({
                USDX_item: item
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
      <MediaQuery maxWidth={736}>
        {match => (
          <React.Fragment>
            <BrowserRouter>
              <Switch>
                <div className="AppNoWeb3">
                  <Route exact path="/" render={() => <HomeNoWeb3 data={this.state} />} />
                  <Route path="/markets" render={() => <Markets />} />
                  <Route path="/liquidate" render={() => <LiquidateNoWeb3 />} />
                </div>
              </Switch>
            </BrowserRouter>
            <Footer />}
          </React.Fragment>
        )}
      </MediaQuery>
    );
  }
}

export default AppNoWeb3;
