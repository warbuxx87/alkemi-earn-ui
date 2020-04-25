/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import withDrizzle from "utils/HOC/withDrizzle";
// tokens ABIs
let mMarket_abi = require("ABIs/moneyMarket.json");
let WETH_abi = require("ABIs/WETH_ABI.json");
let DAI_abi = require("ABIs/DAI_ABI.json");
let USDT_abi = require("ABIs/USDT_ABI.json");
let USDC_abi = require("ABIs/USDC_ABI.json");
let imBTC_abi = require("ABIs/imBTC_ABI.json");
const address = require("constants/address_map.json");

const ContractHandler = ({ web3Status, drizzle }) => {
  React.useEffect(() => {
    if (web3Status === "initialized") {
      drizzle.web3.eth.net.getNetworkType().then(net_type => {
        drizzle.addContract({
          contractName: "WETH",
          web3Contract: new drizzle.web3.eth.Contract(
            WETH_abi,
            address[net_type]["address_WETH"]
          )
        });
        drizzle.addContract({
          contractName: "DAI",
          web3Contract: new drizzle.web3.eth.Contract(
            DAI_abi,
            address[net_type]["address_DAI"]
          )
        });
        drizzle.addContract({
          contractName: "USDT",
          web3Contract: new drizzle.web3.eth.Contract(
            USDT_abi,
            address[net_type]["address_USDT"]
          )
        });
        drizzle.addContract({
          contractName: "USDC",
          web3Contract: new drizzle.web3.eth.Contract(
            USDC_abi,
            address[net_type]["address_USDC"]
          )
        });
        drizzle.addContract({
          contractName: "imBTC",
          web3Contract: new drizzle.web3.eth.Contract(
            imBTC_abi,
            address[net_type]["address_imBTC"]
          )
        });
        drizzle.addContract({
          contractName: "mMarket",
          web3Contract: new drizzle.web3.eth.Contract(
            mMarket_abi,
            address[net_type]["address_mMarket"]
          )
        });
      });
    }
  }, [web3Status]);
  return null;
};

const mapStateToProps = state => ({
  web3Status: state.web3.status
});

export default withDrizzle(connect(mapStateToProps)(ContractHandler));
