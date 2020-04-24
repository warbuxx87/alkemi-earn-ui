import React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";

import TotalValue from "./lendingInfo/TotalValue";
import TotalInterest from "./lendingInfo/TotalInterest";
import TotalApr from "./lendingInfo/TotalApr";

import dai from "assets/images/DAI.svg";
import usdc from "assets/images/USDC.svg";
import imbtc from "assets/images/imBTC.svg";
import usdt from "assets/images/USDT.svg";
// import pax from "assets/images/pax.png";
import eth from "assets/images/WETH.svg";

import {
  handle_approve,
  get_allowance
  // get_tokens_decimals
} from "utils/util";
import withDrizzle from 'utils/HOC/withDrizzle'

import ActiveLending from "./activeLending";
import LendingTable from "./lendingTable";
// tokens ABIs
let mMarket_abi = require("ABIs/moneyMarket.json");
let WETH_abi = require("ABIs/WETH_ABI.json");
let DAI_abi = require("ABIs/DAI_ABI.json");
let USDT_abi = require("ABIs/USDT_ABI.json");
let USDC_abi = require("ABIs/USDC_ABI.json");
let imBTC_abi = require("ABIs/imBTC_ABI.json");

const address = require("constants/address_map.json");

const styles = theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: "100%",
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    container: {
      [theme.breakpoints.up("lg")]: {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  });

function createData(name, unit, image, wallet, balance, apr, collateral) {
  return { name, unit, image, wallet, balance, apr, collateral };
}

const assets = [
  createData("Ether", "WETH", eth, 0, 0, 0, 0),
  createData("Maker DAI", "DAI", dai, 0, 0, 0, 0),
  createData("Tether", "USDT", usdt, 0, 0, 0, 0),
  createData("USD Coin", "USDC", usdc, 0, 0, 0, 0),
  createData("Tokenized BTC", "imBTC", imbtc, 0, 0, 0, 0)
  //createData('Paxos','PAX', pax, 0, 0, 0, 0),
];

class Lend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approved: {},
      loading: {}
    };
  }

  async componentDidMount() {
    this.web3 = this.props.drizzle.web3
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
      // HBTC: new this.web3.eth.Contract(imBTC_abi, address[net_type]['address_HBTC']),
      mMarket: new this.web3.eth.Contract(
        mMarket_abi,
        address[net_type]["address_mMarket"]
      )
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
    //this.getState({ my_account });
    this.setState({ my_account });
    console.log("connected: ", my_account);
    assets.forEach(async asset => {
      let is_approved = await get_allowance(
        contract[asset.unit],
        my_account,
        address[net_type]["address_mMarket"],
        this.web3.utils.toBN
      );
      this.setState({
        approved: { ...this.state.approved, [asset.unit]: is_approved }
      });
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
    });
  }

  onActivate = unit => {
    if (!this.state.contract?.[unit]) return;
    if (this.state.loading.unit) return;
    console.log("a");
    this.setState({ loading: { ...this.state.loading, [unit]: true } });
    handle_approve({
      tokenContract: this.state.contract[unit],
      marketAddress: address[this.state.net_type]["address_mMarket"],
      myAccount: this.state.my_account,
      net_type: this.state.net_type,
      token_name: unit
    })
      .then(() => {
        this.setState({ approved: { ...this.state.approved, [unit]: true } });
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ loading: { ...this.state.loading, [unit]: false } });
      });
  };

  getData = () => {
    const inactiveLend = [];
    const activeLend = [];
    assets.forEach(asset =>
      this.state.approved[asset.unit]
        ? activeLend.push(asset)
        : inactiveLend.push(asset)
    );
    return { inactiveLend, activeLend };
  };

  render() {
    const { activeLend, inactiveLend } = this.getData();
    const { classes } = this.props;
    console.log(this.props);
    return (
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={6} xs={12}>
            <TotalValue />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TotalInterest />
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <TotalApr />
          </Grid>
          {!!activeLend.length && (
            <Grid item lg={12} xs={12}>
              <ActiveLending data={activeLend} />
            </Grid>
          )}
          {!!inactiveLend.length && (
            <Grid item lg={12} xs={12}>
              <LendingTable
                data={inactiveLend}
                loading={this.state.loading}
                onActivate={this.onActivate}
              />
            </Grid>
          )}{" "}
        </Grid>
      </Container>
    );
  }
}

export default withDrizzle(withStyles(styles)(Lend));
