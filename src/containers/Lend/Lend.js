// Main Container

// Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import web3 from "web3";
// Section 2: internal imports
import onLendActivate from "./Activate";
import Lend from "components/Lend/Lend";

// Section 3: Selectors
import {
    // getLendError,
    getLendActive,
    getLendInactive,
    getLendPending,
} from "redux/selectors/data";

const address = require("constants/address_map.json");
const mMarket_abi = require("contracts/moneyMarket.json");
const WETH_abi = require("contracts/WETH_ABI.json");
const DAI_abi = require("contracts/DAI_ABI.json");
const USDT_abi = require("contracts/USDT_ABI.json");
const USDC_abi = require("contracts/USDC_ABI.json");
const imBTC_abi = require("contracts/imBTC_ABI.json");

class withLend extends Component {
    async componentDidMount() {
        if (!web3.givenProvider) return; // not connected to wallet
        // Could perform some API calls here
        this.web3 = new web3(web3.givenProvider);
        const net_type = await this.web3.eth.net.getNetworkType();
        const contract = {
            WETH: new this.web3.eth.Contract(
                WETH_abi,
                address[net_type]["address_WETH"]
            ),
            DAI: new this.web3.eth.Contract(
                DAI_abi,
                address[net_type]["address_DAI"]
            ),
            USDT: new this.web3.eth.Contract(
                USDT_abi,
                address[net_type]["address_USDT"]
            ),
            USDC: new this.web3.eth.Contract(
                USDC_abi,
                address[net_type]["address_USDC"]
            ),
            imBTC: new this.web3.eth.Contract(
                imBTC_abi,
                address[net_type]["address_imBTC"]
            ),
            mMarket: new this.web3.eth.Contract(
                mMarket_abi,
                address[net_type]["address_mMarket"]
            ),
        };
        console.log(" *** init contract finished *** ");
        this.setState({ net_type: net_type, contract: contract });

        const my_account = (await this.web3.givenProvider.enable())[0];
        this.setState({ my_account });
        console.log("connected: ", my_account);
    }

    render() {
        // return a presentational component
        const { inactiveLend, activeLend, onActivate, pending } = this.props;
        return (
            <Lend
                inactiveLend={inactiveLend}
                activeLend={activeLend}
                onActivate={onActivate}
                pending={pending}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    inactiveLend: getLendInactive(state),
    activeLend: getLendActive(state),
    pending: getLendPending(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            onActivate: onLendActivate,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withLend);
