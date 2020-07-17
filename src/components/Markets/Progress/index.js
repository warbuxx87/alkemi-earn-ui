import React from "react";

import { Progress } from "antd";
import "antd/dist/antd.css";
import "./progress.scss";

import USDT from "assets/images/USDT.svg";
import WETH from "assets/images/WETH.svg";
import WBTC from "assets/images/WBTC.svg";
import DAI from "assets/images/DAI.svg";
import USDC from "assets/images/USDC.svg";
// png
import PAX from "assets/images/pax.png";

export default class MyProgress extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: {
                WETH: WETH,
                USDT: USDT,
                USDC: USDC,
                PAX: PAX,
                WBTC: WBTC,
                DAI: DAI,
            },
        };
    }

    render() {
        return (
            <div className="percent-wrap">
                <div className="percent-top">
                    <img
                        src={this.state.token[this.props.symbol]}
                        alt={this.props.name}
                    />
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
