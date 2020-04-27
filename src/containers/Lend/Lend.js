// Main Container

// Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Section 2: internal imports
import onLendActivate from "containers/History/Fetch";
import Lend from "components/Lend/Lend";

import {
  handle_approve,
  get_allowance
  //get_tokens_decimals
} from "containers/Drizzle/util";

const address = require("constants/address_map.json");

class withLend extends Component {
  async componentDidMount() {
    // Could perform some API calls here
    // this.web3 = this.props.drizzle.web3;
    // if (!this.web3.eth) return;
    // const net_type = await this.web3.eth.net.getNetworkType();
    // const contract = this.props.drizzle.contracts;
    // console.log(" *** init contract finished *** ");
    // this.setState({ net_type: net_type, contract: contract });
    // const [
    //   WETH_decimals,
    //   DAI_decimals,
    //   USDT_decimals,
    // ] = await get_tokens_decimals(contract.WETH, contract.DAI, contract.USDT)
    // this.setState({ WETH_decimals, USDT_decimals, DAI_decimals })
    // const my_account = (await this.web3.givenProvider.enable())[0];
    // //this.getState({ my_account });
    // this.setState({ my_account });
    // console.log("connected: ", my_account);
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

  onActivate = unit => {
    if (!this.state.contract?.[unit]) return;
    if (this.state.loading.unit) return;
    console.log("a");
    this.setState({ loading: { ...this.state.loading, [unit]: true } });
    handle_approve({
      web3: this.props.drizzle.web3,
      tokenContract: this.state.contract[unit],
      marketAddress: address[this.state.net_type]["address_mMarket"],
      myAccount: this.state.my_account,
      net_type: this.state.net_type,
      token_name: unit
    })
      .then(() => {
        this.setState({
          approved: { ...this.state.data.lend.activeLend, [unit]: true }
        });
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({
          pending: { ...this.state.data.lend.pending, [unit]: false }
        });
      });
  };

  // getData = () => {
  //   const inactiveLend = [];
  //   const activeLend = [];
  //   assets.forEach(asset =>
  //     this.state?.approved?.[asset.unit]
  //       ? activeLend.push(asset)
  //       : inactiveLend.push(asset)
  //   );
  //   return { inactiveLend, activeLend };
  // };

  render() {
    // return a presentational component
    const { inactiveLend, activeLend } = this.props;
    return <Lend inactiveLend={inactiveLend} activeLend={activeLend} />;
  }
}

const mapStateToProps = state => ({
  pending: state.data.lend.pending,
  inactiveLend: state.data.lend.inactive,
  activeLend: state.data.lend.active
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onActivate: onLendActivate
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withLend);
