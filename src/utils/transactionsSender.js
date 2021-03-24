import { readyToTransact } from "utils/onboard"; // TODO: Should probably be replaced by checking if address is selected and such
import { toWei } from "utils/ui";
import address from "constants/address_map.json";
import constants from "constants/constant.json";

import MoneyMarket_ABI from "constants/ABI/MoneyMarket_ABI.json";
import Web3 from "web3";

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

// Handles asset contract calls (allocate/approve)
export const handle_asset_contract_method_click = async ({
    userWalletNetwork,
    userWalletAddress,
    userWalletName,
    amount,
    asset,
    selectedMethod,
}) => {
    return new Promise(async (resolve, reject) => {
        if (!(await readyToTransact()))
            throw new Error("not ready to transaction");

        const myAccount = userWalletAddress;
        const network = constants.network_type[userWalletNetwork];

        const unit = asset.unit;
        const token_address = address[network][`address_${unit}`];

        const web3 = new Web3(window.currentlyUsedProvider); // could be replaced by window.currentlyUsedProvider

        const address_MoneyMarket = address[network].address_MoneyMarket;

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

        web3.eth.sendTransaction(dataToSend, (error, receipt) => {
            if (error) reject("The transaction was rejected");
            else {
                let sendTx = {};

                sendTx.txHash = receipt; // this is NOT necessarily the tx hash on the blockchain (For metamask yes, for walletconnect it's the safetx)
                sendTx.userWalletName = userWalletName;

                resolve(sendTx);
            }
        });
    });
};

// generic MoneyMarketContract tx handler
export const handle_moneymarket_tx = async ({
    userWalletNetwork,
    userWalletAddress,
    userWalletName,
    amount,
    asset,
    shouldSendMax,
    handleETHCallsSeparately,
    selectedMethod,
}) => {
    return new Promise(async (resolve, reject) => {
        if (!(await readyToTransact()))
            throw new Error("not ready to transact");

        const myAccount = userWalletAddress;
        const network = constants.network_type[userWalletNetwork];

        const unit = asset.unit;
        const token_address = address[network][`address_${unit}`];

        let weiAmount = amount;
        if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

        const sendValue =
            handleETHCallsSeparately === true &&
            (unit === "WETH" || unit === "ETH"); // For ETHs supply/repay are handled differently

        const web3 = new Web3(window.currentlyUsedProvider); // could be replaced by window.currentlyUsedProvider

        const address_MoneyMarket = address[network].address_MoneyMarket;

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

        web3.eth.sendTransaction(dataToSend, (error, receipt) => {
            if (error) reject("The transaction was rejected");
            else {
                let sendTx = {};

                sendTx.txHash = receipt; // this is NOT necessarily the tx hash on the blockchain (For metamask yes, for walletconnect it's the safetx)
                sendTx.userWalletName = userWalletName;

                resolve(sendTx);
            }
        });
    });
};

// Borrow Tokens from Lending Pool
// TODO: to be merged in transactions (when the other drawers are refactored in UI-359)
export const handle_liquidate_click = async ({
    userWalletNetwork,
    userWalletAddress,
    userWalletName,
    symbol,
    amount,
    assetCollateral,
    assetBorrow,
    targetAccount,
}) => {
    return new Promise(async (resolve, reject) => {
        if (!(await readyToTransact()))
            throw new Error("not ready to transact");
        const myAccount = userWalletAddress;
        const network = constants.network_type[userWalletNetwork];

        let weiAmount = amount.toString();

        if (weiAmount === "-1") {
            weiAmount = constants.max_uint;
        } else {
            weiAmount = toWei(amount, symbol);
        }

        const web3 = new Web3(window.currentlyUsedProvider); // could be replaced by window.currentlyUsedProvider

        const address_MoneyMarket = address[network].address_MoneyMarket;

        const MoneyMarketContract = new web3.eth.Contract(
            MoneyMarket_ABI,
            address_MoneyMarket
        );

        const getData = MoneyMarketContract.methods["liquidateBorrow"](
            targetAccount,
            assetBorrow,
            assetCollateral,
            weiAmount
        ).encodeABI();

        const dataToSend = {
            to: address_MoneyMarket,
            from: myAccount,
            data: getData,
        };

        web3.eth.sendTransaction(dataToSend, (error, receipt) => {
            if (error) reject("The transaction was rejected");
            else {
                let sendTx = {};

                sendTx.txHash = receipt; // this is NOT necessarily the tx hash on the blockchain (For metamask yes, for walletconnect it's the safetx)
                sendTx.userWalletName = userWalletName;

                resolve(sendTx);
            }
        });
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
    if (!(await readyToTransact())) throw new Error("not ready to transact");
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
