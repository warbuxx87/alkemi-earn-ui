import Web3 from "web3";

import { toWei } from "utils/ui";
import address from "constants/address_map.json";
import constants from "constants/constant.json";

import Big from "big.js";

import MoneyMarket_ABI from "constants/ABI/MoneyMarket_ABI.json";
import RewardControl_ABI from "constants/ABI/RewardControl_ABI.json";

import WETH_ABI from "constants/ABI/WETH_ABI.json";
import DAI_ABI from "constants/ABI/DAI_ABI.json";
import USDC_ABI from "constants/ABI/USDC_ABI.json";
import WBTC_ABI from "constants/ABI/WBTC_ABI.json";

const ABIs = {
    WETH: WETH_ABI,
    DAI: DAI_ABI,
    USDC: USDC_ABI,
    WBTC: WBTC_ABI,
};

export const handle_asset_contract_method_click = async ({
    userWalletNetwork,
    userWalletAddress,
    userWalletName,
    amount,
    asset,
    selectedMethod,
    currentPool,
    library,
}) => {
    return new Promise(async (resolve, reject) => {
        const myAccount = userWalletAddress;
        const network = constants.network_type[userWalletNetwork];

        const unit = asset.unit;
        const token_address = address[network][currentPool][`address_${unit}`];

        const web3 = new Web3(library.provider);

        const address_MoneyMarket =
            currentPool === "open"
                ? address[network].address_open_MoneyMarket
                : address[network].address_MoneyMarket;

        const tokenContract = new web3.eth.Contract(ABIs[unit], token_address);

        let weiAmount = amount;
        if (selectedMethod === "allocateTo") weiAmount = toWei(amount, unit);

        const targetAddress =
            selectedMethod === "approve" ? address_MoneyMarket : myAccount;

        const getData = tokenContract.methods[selectedMethod](
            targetAddress,
            weiAmount
        ).encodeABI();

        const dataToSend = {
            to: token_address,
            from: myAccount,
            data: getData,
        };

        web3.eth
            .sendTransaction(dataToSend)
            .once("transactionHash", (txHash) => {
                const txData = { txHash, userWalletName };

                resolve(txData);
            })
            .catch((err) => reject(err)); // The transaction was rejected
    });
};

// generic MoneyMarketContract tx handler
export const handle_moneymarket_tx = async ({
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
    handleETHCallsSeparately,
    selectedMethod,
    currentPool,
    library,
    userWalletName,
}) => {
    return new Promise(async (resolve, reject) => {
        const myAccount = userWalletAddress;
        const network = constants.network_type[userWalletNetwork];

        const unit = asset.unit;
        const token_address =
            address[network][currentPool][`address_${asset.unit}`];

        let weiAmount = amount;
        if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

        const sendValue =
            handleETHCallsSeparately === true &&
            (unit === "WETH" || unit === "ETH"); // For ETHs supply/repay are handled differently

        const web3 = new Web3(library.provider);

        const address_MoneyMarket =
            currentPool === "open"
                ? address[network].address_open_MoneyMarket
                : address[network].address_MoneyMarket;

        const MoneyMarketContract = new web3.eth.Contract(
            MoneyMarket_ABI,
            address_MoneyMarket
        );

        const getData = MoneyMarketContract.methods[selectedMethod](
            token_address,
            weiAmount
        ).encodeABI();

        const dataToSend = {
            to: address_MoneyMarket,
            from: myAccount,
            data: getData,
        };

        if (sendValue) dataToSend.value = weiAmount;

        web3.eth
            .sendTransaction(dataToSend)
            .once("transactionHash", (txHash) => {
                const txData = { txHash, userWalletName };

                resolve(txData);
            })
            .catch((err) => reject(err)); // The transaction was rejected
    });
};

// Borrow Tokens from Lending Pool
export const handle_liquidate_click = async ({
    library,
    userWalletNetwork,
    userWalletAddress,
    symbol,
    amount,
    assetCollateral,
    assetBorrow,
    targetAccount,
    maxAmount,
    userWalletName,
    currentPool,
    selectedMethod,
}) => {
    return new Promise(async (resolve, reject) => {
        const myAccount = userWalletAddress;
        const network = constants.network_type[userWalletNetwork];

        const web3 = new Web3(library.provider);

        const address_MoneyMarket =
            currentPool === "open"
                ? address[network].address_open_MoneyMarket
                : address[network].address_MoneyMarket;

        const MoneyMarketContract = new web3.eth.Contract(
            MoneyMarket_ABI,
            address_MoneyMarket
        );

        let weiAmount = amount.toString();

        if (symbol === "WETH" || symbol === "ETH") {
            const maxAmountBig = Big(maxAmount);
            const positiveMaxAmount = maxAmountBig.abs();
            const ethLiquidationAmount = positiveMaxAmount.times(Big(1.01));
            const maxWeiAmount = toWei(ethLiquidationAmount.toFixed(18)); // toFixed 18 removes potential overflow of digits before converting to wei

            const requestedAmountClose = maxWeiAmount;

            const getData = MoneyMarketContract.methods["liquidateBorrow"](
                targetAccount,
                assetBorrow,
                assetCollateral,
                requestedAmountClose
            ).encodeABI();

            const dataToSend = {
                to: address_MoneyMarket,
                from: myAccount,
                data: getData,
                value: requestedAmountClose,
            };

            web3.eth
                .sendTransaction(dataToSend)
                .once("transactionHash", (txHash) => {
                    const txData = { txHash, userWalletName };

                    resolve(txData);
                })
                .catch((err) => reject(err)); // The transaction was rejected
        } else {
            if (weiAmount === "-1") {
                weiAmount = constants.max_uint;
            } else {
                weiAmount = toWei(amount, symbol);
            }

            const requestedAmountClose = weiAmount;

            const getData = MoneyMarketContract.methods[selectedMethod](
                targetAccount,
                assetBorrow,
                assetCollateral,
                requestedAmountClose
            ).encodeABI();

            const dataToSend = {
                to: address_MoneyMarket,
                from: myAccount,
                data: getData,
            };

            web3.eth
                .sendTransaction(dataToSend)
                .once("transactionHash", (txHash) => {
                    const txData = { txHash, userWalletName };

                    resolve(txData);
                })
                .catch((err) => reject(err)); // The transaction was rejected
        }
    });
};

// Estimate method gas, NOT very reliable, since I noticed different values on metamask, but does the trick for the most part
export const estimateGasForMethod = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    estimationOfGasPrice,
    method,
}) => {
    if (!method) throw new Error("Must select a method");

    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_WETH`];

    const estimateMethodCall = await MoneyMarketContract.methods[method](
        token_address,
        "1"
    ).estimateGas({
        from: myAccount,
        gasPrice: estimationOfGasPrice,
        value: "1", // making the estimation if the user wants to send 1 wei, not great, but a value is better than none, and as the call is async, we cannot set an amount dynamically, it won't resolve in time to be properly responsive
    });

    return estimateMethodCall;
};

export const handle_claim_ALK_click = async ({
    userWalletNetwork,
    userWalletAddress,
    selectedMethod,
    library,
    userWalletName,
}) => {
    return new Promise(async (resolve, reject) => {
        const myAccount = userWalletAddress;
        const network = constants.network_type[userWalletNetwork];

        const address_RewardControl = address[network].address_RewardControl;

        const web3 = new Web3(library.provider);

        const RewardControlContract = new web3.eth.Contract(
            RewardControl_ABI,
            address_RewardControl
        );

        const getData =
            RewardControlContract.methods[selectedMethod](
                myAccount
            ).encodeABI();

        const dataToSend = {
            to: address_RewardControl,
            from: myAccount,
            data: getData,
        };

        web3.eth
            .sendTransaction(dataToSend)
            .once("transactionHash", (txHash) => {
                const txData = { txHash, userWalletName };

                resolve(txData);
            })
            .catch((err) => reject(err)); // The transaction was rejected
    });
};
