import React from "react";
import PropTypes from "prop-types";

import { Progress } from "antd";
import "antd/dist/antd.css";
import "./progress.scss";

//import BTC from '../../../assets/images/BTC.svg';
import imBTC from "../../../assets/images/imBTC.svg";
import HBTC from "../../../assets/images/HBTC.svg";
import USDx from "../../../assets/images/USDx.svg";
import USDT from "../../../assets/images/USDT.svg";
import WETH from "../../../assets/images/WETH.svg";
import WBTC from "../../../assets/images/WBTC.svg";
import DAI from "../../../assets/images/DAI.svg";
// png
import usdc from "../../../assets/images/usdc.png";
import tusd from "../../../assets/images/tusd.png";
import pax from "../../../assets/images/pax.png";

export default class MyProgress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: {
        WETH: WETH,
        imBTC: imBTC,
        USDT: USDT,
        USDx: USDx,
        HBTC: HBTC,
        USDC: usdc,
        TUSD: tusd,
        PAX: pax,
        WBTC: WBTC,
        DAI: DAI
      }
    };
  }

  render() {
    console.log("Percentage_Supply " + this.props.percentage_supply);
    console.log("Percentage_Borrow " + this.props.percentage_borrow);
    return (
      <div className="percent-wrap">
        <div className="percent-top">
          <img src={this.state.token[this.props.symbol]} alt="" />
          <span className="token">{this.props.symbol}</span>
          <span className="percent-num">
            {this.props.type === "supply"
              ? this.props.percentage_supply
              : this.props.percentage_borrow}
            %
          </span>
        </div>
        <div className="percent-bottom">
          {this.props.type === "supply" ? (
            <Progress
              percent={Number(this.props.percentage_supply)}
              status="active"
              showInfo={false}
            />
          ) : (
            <Progress
              percent={Number(this.props.percentage_borrow)}
              status="active"
              showInfo={false}
            />
          )}
        </div>
      </div>
    );
  }
}
