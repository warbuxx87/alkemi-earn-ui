import WETH_ABI from "contracts/WETH_ABI.json";
import DAI_ABI from "contracts/DAI_ABI.json";
import USDT_ABI from "contracts/USDT_ABI.json";
import USDC_ABI from "contracts/USDC_ABI.json";
import imBTC_ABI from "contracts/imBTC_ABI.json";
import market_ABI from "contracts/moneyMarket.json";

import address from "contracts/address_map.json";
import constants from "contracts/constant.json";

const assets = ["WETH", "DAI", "USDT", "USDC", "imBTC"];

const ABIs = {
    WETH: WETH_ABI,
    DAI: DAI_ABI,
    USDT: USDT_ABI,
    USDC: USDC_ABI,
    imBTC: imBTC_ABI
};

export const initContracts = drizzle => {
    initMarketContract({ drizzle });
    assets.forEach(asset => initAssetContract({ drizzle, asset }));
};

export const initAssetContract = ({ drizzle, asset }) => {
    if (drizzle.contracts[asset]) return drizzle.contracts[asset];
    const drizzleStore = drizzle.store.getState();
    const myAddress = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    if (!drizzle.web3.eth) return;
    const tokenContract = new drizzle.web3.eth.Contract(
        ABIs[asset],
        address[network][`address_${asset}`]
    );
    drizzle.addContract({
        contractName: asset,
        web3Contract: tokenContract
    });
    // get allowance
    tokenContract.methods.allowance.cacheCall(
        myAddress,
        address[network].address_mMarket
    );
    // get balance
    tokenContract.methods.balanceOf.cacheCall(myAddress);
    return drizzle.contracts[asset];
};

export const initMarketContract = ({ drizzle }) => {
    if (drizzle.contracts.mMarket) return drizzle.contracts.mMarket;
    const drizzleStore = drizzle.store.getState();
    const myAddress = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const address_mMarket = address[network].address_mMarket;
    if (!network) return; // drizzle not fetched
    if (!drizzle.web3.eth) return;
    const mMarketContract = new drizzle.web3.eth.Contract(
        market_ABI,
        address_mMarket
    );
    drizzle.addContract({
        contractName: "mMarket",
        web3Contract: mMarketContract
    });
    // get each asset Supply Balance
    assets.forEach(asset => {
        mMarketContract.methods.getSupplyBalance.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );
    });
    // get account balance
    mMarketContract.methods.calculateAccountValues.cacheCall(myAddress);
    // get USDx prices
    mMarketContract.methods.assetPrices.cacheCall(
        address[network]["address_USDx"]
    );
    return drizzle.contracts.mMarket;
};
