import WETH_ABI from "constants/ABI/WETH_ABI.json";
import DAI_ABI from "constants/ABI/DAI_ABI.json";
import USDT_ABI from "constants/ABI/USDT_ABI.json";
import USDC_ABI from "constants/ABI/USDC_ABI.json";
import WBTC_ABI from "constants/ABI/WBTC_ABI.json";
import PAX_ABI from "constants/ABI/PAX_ABI.json";
import MoneyMarket_ABI from "constants/ABI/MoneyMarket_ABI.json";

import address from "constants/address_map.json";
import constants from "constants/constant.json";

const assets = ["PAX", "DAI", "USDT", "USDC", "WBTC", "WETH"];

const ABIs = {
    PAX: PAX_ABI,
    WETH: WETH_ABI,
    DAI: DAI_ABI,
    USDT: USDT_ABI,
    USDC: USDC_ABI,
    WBTC: WBTC_ABI,
};

export const initContracts = (drizzle, userWalletAddress, forceUpdate) => {
    console.log("5-1 drizzle: ", drizzle);
    console.log("5-1 - drizzle.web3: ", drizzle.web3);
    const resolved = initMarketContract({
        drizzle,
        userWalletAddress,
        forceUpdate,
    });

    if (resolved !== false)
        assets.forEach((asset) =>
            initAssetContract({
                drizzle,
                userWalletAddress,
                asset,
                forceUpdate,
            })
        );
};

export const deleteAllContracts = (drizzle) => {
    try {
        drizzle.deleteContract("MoneyMarket");

        assets.forEach((asset) => drizzle.deleteContract(asset));
    } catch (e) {
        // normally if allowed to be clicked it will throw an error, but since we hide the disconnect button it won't
    }
};

export const initMarketContract = ({
    drizzle,
    userWalletAddress,
    forceUpdate,
}) => {
    console.log("5-2 drizzle: ", drizzle);
    console.log("5-2 - drizzle.web3: ", drizzle.web3);

    if (drizzle.contracts.MoneyMarket && !forceUpdate)
        return drizzle.contracts.MoneyMarket;

    console.log(
        "5-2 drizzle.web3.currentProvider",
        drizzle.web3.currentProvider
    );
    //const drizzleStore = drizzle.store.getState();
    const myAddress = userWalletAddress; //drizzleStore.accounts[0]; // might need to use the drizzle store value after updating the value if there a feature to update automatically it is found
    console.log(
        "5-2 drizzle.web3.currentProvider.selectedAddress",
        drizzle.web3.currentProvider.selectedAddress,
        myAddress
    );

    const network =
        constants.network_type[
            drizzle.web3.currentProvider
                .networkVersion /*drizzleStore.web3.networkId*/
        ]; // Using provider network ID instead of drizzle store value
    const assets = ["PAX", "DAI", "USDT", "USDC", "WBTC", "WETH"];
    if (!network) return; // drizzle not fetched
    if (!drizzle.web3.eth) return;

    // check if this network has configured contract addresses
    if (!address[network]) return false;

    const contractAddress = address[network][`address_MoneyMarket`];

    if (!contractAddress) return false;

    const MoneyMarketContract = new drizzle.web3.eth.Contract(
        MoneyMarket_ABI,
        contractAddress
    );

    try {
        if (forceUpdate) drizzle.deleteContract("MoneyMarket");
    } catch (e) {
        // catches error
    }

    drizzle.addContract({
        contractName: "MoneyMarket",
        web3Contract: MoneyMarketContract,
    });

    assets.forEach((asset) => {
        // get each asset Supply Balance (current )

        // could put a check to see if the contract address is set for all of them
        MoneyMarketContract.methods.getSupplyBalance.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each asset Borrow Balance (current )
        MoneyMarketContract.methods.getBorrowBalance.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each supplyBalances ( principle )
        MoneyMarketContract.methods.supplyBalances.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each borrowBalances ( principle )
        MoneyMarketContract.methods.borrowBalances.cacheCall(
            myAddress,
            address[network][`address_${asset}`]
        );

        // get each asset Price
        MoneyMarketContract.methods.assetPrices.cacheCall(
            address[network][`address_${asset}`]
        );
        // get each market data
        MoneyMarketContract.methods.markets.cacheCall(
            address[network][`address_${asset}`]
        );
    });

    // get account liquidity
    MoneyMarketContract.methods.getAccountLiquidity.cacheCall(myAddress);

    // get account balance
    MoneyMarketContract.methods.calculateAccountValues.cacheCall(myAddress);

    // get collateralRatio
    MoneyMarketContract.methods.collateralRatio.cacheCall();

    // get getCollateralMarketsLength
    MoneyMarketContract.methods.getCollateralMarketsLength.cacheCall();

    // get Origination Fee
    MoneyMarketContract.methods.originationFee.cacheCall();

    // get liquidationDiscount
    MoneyMarketContract.methods.liquidationDiscount.cacheCall();

    // get admin
    MoneyMarketContract.methods.admin.cacheCall();

    return drizzle.contracts.MoneyMarket;
};

export const initAssetContract = ({
    drizzle,
    userWalletAddress,
    asset,
    forceUpdate,
}) => {
    if (drizzle.contracts[asset] && !forceUpdate)
        return drizzle.contracts[asset];
    //const drizzleStore = drizzle.store.getState();

    const myAddress = userWalletAddress; //drizzleStore.accounts[0]; // might need to use the drizzle store value after updating the value if there a feature to update automatically it is found
    const network =
        constants.network_type[
            "4" /*drizzleStore.web3.networkId*/
            /*drizzle.web3.currentProvider
                .networkVersion*/
        ]; // Using provider network ID instead of drizzle store value

    if (!drizzle.web3.eth) return;
    if (!address[network]) return;

    const tokenContract = new drizzle.web3.eth.Contract(
        ABIs[asset],
        address[network][`address_${asset}`]
    );
    // const events = ["Approval", "Transfer"];
    const events = [];

    try {
        if (forceUpdate) drizzle.deleteContract(asset);
    } catch (e) {
        // catches error
    }

    drizzle.addContract(
        {
            contractName: asset,
            web3Contract: tokenContract,
        },
        events
    );
    // get allowance
    tokenContract.methods.allowance.cacheCall(
        myAddress,
        address[network].address_MoneyMarket
    );

    // get balance
    tokenContract.methods.balanceOf.cacheCall(myAddress);
    return drizzle.contracts[asset];
};
