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
    getLendError,
    getLendActive,
    getLendInactive,
    getLendPending
} from "redux/selectors/data";

import {
    handle_approve
    //  get_allowance
    //get_tokens_decimals
} from "containers/Drizzle/util";

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
        };
        console.log(" *** init contract finished *** ");
        this.setState({ net_type: net_type, contract: contract });
        // const [
        //   WETH_decimals,
        //   DAI_decimals,
        //   USDT_decimals,
        // ] = await get_tokens_decimals(contract.WETH, contract.DAI, contract.USDT)
        // this.setState({ WETH_decimals, USDT_decimals, DAI_decimals })
        const my_account = (await this.web3.givenProvider.enable())[0];
        this.setState({ my_account });
        console.log("connected: ", my_account);
        // assets.forEach(async asset => {
        //   let is_approved = await get_allowance(
        //     contract[asset.unit],
        //     my_account,
        //     address[net_type]["address_mMarket"],
        //     this.web3.utils.toBN
        //   );
        //   this.setState({
        //     approved: { ...this.state.approved, [asset.unit]: is_approved }
        //   });
        // let timer_Next = setInterval(() => {
        //   if (!this.state.WETH_decimals) {
        //     console.log('111111111: not get yet...');
        //   } else {
        //     console.log('2222222222: i got it...');
        //     clearInterval(timer_Next);
        //     this.setState({ i_am_ready: true })
        //     to do something...
        //     get_my_ETH(this);
        //     get_my_WETH(this);
        //     get_WETH_supplied__available_to_withdraw(this, address[this.state.net_type]['address_WETH'], address[this.state.net_type]['address_mMarket']);
        //   }
        // }, 100)
        //};
    }

    // onActivate = unit => {
    //   if (!this.state.contract?.[unit]) return;
    //   if (this.state.loading.unit) return;
    //   console.log("a");
    //   this.setState({ loading: { ...this.state.loading, [unit]: true } });
    //   handle_approve({
    //     web3: this.web3,
    //     tokenContract: this.state.contract[unit],
    //     marketAddress: address[this.state.net_type]["address_mMarket"],
    //     myAccount: this.state.my_account,
    //     net_type: this.state.net_type,
    //     token_name: unit
    //   })
    //     .then(() => {
    //       this.setState({
    //         approved: { ...this.state.data.lend.activeLend, [unit]: true }
    //       });
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     })
    //     .finally(() => {
    //       this.setState({
    //         pending: { ...this.state.data.lend.pending, [unit]: false }
    //       });
    //     });
    // };

    render() {
        // return a presentational component
        const { inactiveLend, activeLend, onActivate } = this.props;
        return (
            <Lend
                inactiveLend={inactiveLend}
                activeLend={activeLend}
                onActivate={onActivate}
            />
        );
    }
}

const mapStateToProps = state => ({
    inactiveLend: getLendInactive(state),
    activeLend: getLendActive(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onActivate: onLendActivate
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withLend);
