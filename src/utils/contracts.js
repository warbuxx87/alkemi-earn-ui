import WETH_ABI from "constants/ABI/WETH_ABI.json";
import DAI_ABI from "constants/ABI/DAI_ABI.json";
import USDC_ABI from "constants/ABI/USDC_ABI.json";
import WBTC_ABI from "constants/ABI/WBTC_ABI.json";

import MoneyMarket_ABI from "constants/ABI/MoneyMarket_ABI.json";
import RewardControl_ABI from "constants/ABI/RewardControl_ABI.json";
import ALK_TOKEN_ABI from "constants/ABI/ALK_TOKEN_ABI.json";

import address from "constants/address_map.json";
import constants from "constants/constant.json";

const ABIs = {
    WETH: WETH_ABI,
    DAI: DAI_ABI,
    USDC: USDC_ABI,
    WBTC: WBTC_ABI,
};

export const initContracts = ({
    drizzle,
    userWalletAddress,
    userWalletNetwork,
    forceUpdate,
    address_MoneyMarket,
    currentPool,
}) => {
    const resolved = initMarketContract({
        drizzle,
        userWalletAddress,
        userWalletNetwork,
        forceUpdate,
        address_MoneyMarket,
        currentPool,
    });

    if (resolved !== false)
        constants.assets.forEach((asset) =>
            initAssetContract({
                drizzle,
                userWalletAddress,
                userWalletNetwork,
                asset,
                forceUpdate,
                address_MoneyMarket,
            })
        );

    if (resolved !== false) {
        initRewardControlContract({
            drizzle,
            userWalletAddress,
            userWalletNetwork,
            forceUpdate,
        });

        initALKTokenContract({
            drizzle,
            userWalletAddress,
            userWalletNetwork,
            forceUpdate,
        });
    }
};

export const deleteAllContracts = (drizzle) => {
    try {
        drizzle.deleteContract("MoneyMarket");

        constants.assets.forEach((asset) => drizzle.deleteContract(asset));
    } catch (e) {
        // normally if allowed to be clicked it will throw an error, but since we hide the disconnect button it won't
    }
};

export const initMarketContract = ({
    drizzle,
    userWalletAddress,
    userWalletNetwork,
    forceUpdate,
    address_MoneyMarket,
    currentPool,
}) => {
    if (drizzle.contracts.MoneyMarket && !forceUpdate)
        return drizzle.contracts.MoneyMarket;

    const myAddress = userWalletAddress;

    const network = constants.network_type[userWalletNetwork];

    if (!network) return; // drizzle not fetched
    if (!drizzle.web3.eth) return;

    // check if this network has configured contract addresses
    if (!address[network]) return false;

    // avoids undefined contract address/or 0x values set for now, could be improved with a check for valid eth address
    if (!address_MoneyMarket || address_MoneyMarket.length < 3) return false;

    const MoneyMarketContract = new drizzle.web3.eth.Contract(
        MoneyMarket_ABI,
        address_MoneyMarket
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

    constants.assets.forEach((asset) => {
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

    if (currentPool !== "open") {
        // verify KYC
        MoneyMarketContract.methods.verifyKYC.cacheCall(myAddress);

        // verify Liquidator
        MoneyMarketContract.methods.verifyLiquidator.cacheCall(myAddress);
    }

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
    address_MoneyMarket,
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
    tokenContract.methods.allowance.cacheCall(myAddress, address_MoneyMarket);

    // get token balance for connected user wallet
    tokenContract.methods.balanceOf.cacheCall(myAddress);

    // get token balance for main MoneyMarket Contract --> used for Available Liquidity Selectors
    tokenContract.methods.balanceOf.cacheCall(address_MoneyMarket);
    return drizzle.contracts[asset];
};

export const initRewardControlContract = ({
    drizzle,
    userWalletAddress,
    userWalletNetwork,
    forceUpdate,
}) => {
    if (drizzle.contracts.RewardControl && !forceUpdate)
        return drizzle.contracts.RewardControl;

    const myAddress = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];

    if (!drizzle.web3.eth) return;
    if (!address[network]) return;

    const rewardControlContract = new drizzle.web3.eth.Contract(
        RewardControl_ABI,
        address[network][`address_RewardControl`]
    );

    try {
        if (forceUpdate) drizzle.deleteContract("RewardControl");
    } catch (e) {
        // catches error
    }

    drizzle.addContract({
        contractName: "RewardControl",
        web3Contract: rewardControlContract,
    });

    // get the ALK rewards for a user
    // rewardControlContract.methods.getAlkAccrued.cacheCall(myAddress);

    // getting the rewards for any user, it will give us the tokens scaled to 18 decimals, this function is what gives the claimable amount
    rewardControlContract.methods.getAlkRewards.cacheCall(myAddress);

    return drizzle.contracts.RewardControl;
};

export const initALKTokenContract = ({
    drizzle,
    userWalletAddress,
    userWalletNetwork,
    forceUpdate,
}) => {
    if (drizzle.contracts.ALKToken && !forceUpdate)
        return drizzle.contracts.ALKToken;

    const myAddress = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];

    if (!drizzle.web3.eth) return;
    if (!address[network]) return;

    const ALKTokenContract = new drizzle.web3.eth.Contract(
        ALK_TOKEN_ABI,
        address[network][`address_ALK_TOKEN`]
    );

    try {
        if (forceUpdate) drizzle.deleteContract("ALKToken");
    } catch (e) {
        // catches error
    }

    drizzle.addContract({
        contractName: "ALKToken",
        web3Contract: ALKTokenContract,
    });

    // getting the rewards for any user, it will give us the tokens scaled to 18 decimals, this function is what gives the claimable amount
    ALKTokenContract.methods.balanceOf.cacheCall(myAddress);

    return drizzle.contracts.ALKToken;
};
