import WETH_ABI from "constants/ABI/WETH_ABI.json";
import DAI_ABI from "constants/ABI/DAI_ABI.json";
import USDC_ABI from "constants/ABI/USDC_ABI.json";
import WBTC_ABI from "constants/ABI/WBTC_ABI.json";

import MoneyMarket_ABI from "constants/ABI/MoneyMarket_ABI.json";

import address from "constants/address_map.json";
import constants from "constants/constant.json";

const assets = ["DAI", "USDC", "WBTC", "WETH"];

const ABIs = {
    WETH: WETH_ABI,
    DAI: DAI_ABI,
    USDC: USDC_ABI,
    WBTC: WBTC_ABI,
};

export const initContracts = (
    drizzle,
    userWalletAddress,
    userWalletNetwork,
    forceUpdate
) => {
    const resolved = initMarketContract({
        drizzle,
        userWalletAddress,
        userWalletNetwork,
        forceUpdate,
    });

    if (resolved !== false)
        assets.forEach((asset) =>
            initAssetContract({
                drizzle,
                userWalletAddress,
                userWalletNetwork,
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
    userWalletNetwork,
    forceUpdate,
}) => {
    if (drizzle.contracts.MoneyMarket && !forceUpdate)
        return drizzle.contracts.MoneyMarket;
    const myAddress = userWalletAddress;

    const network = constants.network_type[userWalletNetwork];
    const assets = ["DAI", "USDC", "WBTC", "WETH"];
    if (!network) return; // drizzle not fetched
    if (!drizzle.web3.eth) return;

    // check if this network has configured contract addresses
    if (!address[network]) return false;

    const contractAddress = address[network][`address_MoneyMarket`];

    // avoids undefined contract address/or 0x values set for now, could be improved with a check for valid eth address
    if (!contractAddress || contractAddress.length < 3) return false;

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

    // get account balance
    MoneyMarketContract.methods.verifyKYC.cacheCall(myAddress);

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
    userWalletNetwork,
    asset,
    forceUpdate,
}) => {
    if (drizzle.contracts[asset] && !forceUpdate)
        return drizzle.contracts[asset];

    const myAddress = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];

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

    // get token balance for connected user wallet
    tokenContract.methods.balanceOf.cacheCall(myAddress);

    // get token balance for main MoneyMarket Contract --> used for Available Liquidity Selectors
    tokenContract.methods.balanceOf.cacheCall(
        address[network].address_MoneyMarket
    );
    return drizzle.contracts[asset];
};
