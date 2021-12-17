import Web3 from "web3";

import { toWei } from "utils/ui";
import address from "constants/address_map.json";
import constants from "constants/constant.json";
import { initAssetContract } from "utils/contracts";
import Big from "big.js";

import MoneyMarket_ABI from "constants/ABI/MoneyMarket_ABI.json";
import { ethers } from "ethers";

// Approve Unlimited amount of ERC20 tokens to interact with protocol
export const handle_approve_click = async ({
    drizzle,
    userWalletNetwork,
    asset,
    userWalletAddress,
    currentPool,
}) => {
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];

    const address_MoneyMarket =
        currentPool === "open"
            ? address[network].address_open_MoneyMarket
            : address[network].address_MoneyMarket;

    const tokenContract = initAssetContract({
        drizzle,
        userWalletAddress: myAccount,
        asset: asset.unit,
        address_MoneyMarket,
        userWalletNetwork,
        currentPool,
    });

    const sendApprove = tokenContract.methods.approve.cacheSend(
        address_MoneyMarket,
        constants.max_uint,
        {
            from: myAccount,
        }
    );
    return sendApprove;
};

// Mint new Test Tokens
export const handle_allocate_click = async ({
    drizzle,
    userWalletAddress,
    asset,
    amount,
    shouldSendMax,
}) => {
    const myAccount = userWalletAddress;
    const unit = asset.unit;
    const tokenContract = drizzle.contracts[unit];

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    const sendAllocate = tokenContract.methods.allocateTo.cacheSend(
        myAccount,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendAllocate;
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
                const txData = { txHash };

                resolve(txData);
            })
            .catch((err) => reject(err));
    });
};

// Borrow Tokens from Lending Pool
export const handle_borrow_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
    currentPool,
}) => {
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address =
        address[network][currentPool][`address_${asset.unit}`];
    const unit = asset.unit;

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    const sendBorrow = MoneyMarketContract.methods.borrow.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendBorrow;
};

// Repay Borrowed Tokens from wallet back to Lending Pool
export const handle_repay_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
    currentPool,
    library,
}) => {
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address =
        address[network][currentPool][`address_${asset.unit}`];
    const unit = asset.unit;

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    const address_MoneyMarket =
        currentPool === "open"
            ? address[network].address_open_MoneyMarket
            : address[network].address_MoneyMarket;
    const MoneyMarketEthers = new ethers.Contract(
        address_MoneyMarket,
        MoneyMarket_ABI,
        library.getSigner(myAccount)
    );
    // console.log("MoneyMarketEthers Repay: ", MoneyMarketEthers);

    const sendSupply = await MoneyMarketEthers.repayBorrow(
        token_address,
        weiAmount
    );
    console.log("sendSupply: ", sendSupply);

    // let sendRepay;

    // if (unit === "WETH" || unit === "ETH") {
    //     sendRepay = MoneyMarketContract.methods.repayBorrow.cacheSend(
    //         token_address,
    //         weiAmount,
    //         {
    //             from: myAccount,
    //             value: weiAmount,
    //         }
    //     );
    // } else {
    //     sendRepay = MoneyMarketContract.methods.repayBorrow.cacheSend(
    //         token_address,
    //         weiAmount,
    //         {
    //             from: myAccount,
    //         }
    //     );
    // }
    // return sendRepay;
};

// Withdraw tokens from lending pool
export const handle_withdraw_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
    currentPool,
}) => {
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address =
        address[network][currentPool][`address_${asset.unit}`];
    const unit = asset.unit;

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    const sendWithdraw = MoneyMarketContract.methods.withdraw.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendWithdraw;
};

// Borrow Tokens from Lending Pool
export const handle_liquidate_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    symbol,
    amount,
    assetCollateral,
    assetBorrow,
    targetAccount,
    maxAmount,
}) => {
    const myAccount = userWalletAddress;
    //const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    //const token_address = address[network][`address_${symbol}`];
    let weiAmount = amount.toString();

    let sendLiquidate;
    if (symbol === "WETH" || symbol === "ETH") {
        const maxAmountBig = Big(maxAmount);
        const positiveMaxAmount = maxAmountBig.abs();
        const ethLiquidationAmount = positiveMaxAmount.times(Big(1.01));
        const maxWeiAmount = toWei(ethLiquidationAmount.toFixed(18)); // toFixed 18 removes potential overflow of digits before converting to wei

        const requestedAmountClose = maxWeiAmount;
        sendLiquidate = MoneyMarketContract.methods.liquidateBorrow.cacheSend(
            targetAccount,
            assetBorrow,
            assetCollateral,
            requestedAmountClose,
            {
                from: myAccount,
                value: requestedAmountClose,
            }
        );
    } else {
        if (weiAmount === "-1") {
            weiAmount = constants.max_uint;
        } else {
            weiAmount = toWei(amount, symbol);
        }

        const requestedAmountClose = weiAmount;

        sendLiquidate = MoneyMarketContract.methods.liquidateBorrow.cacheSend(
            targetAccount,
            assetBorrow,
            assetCollateral,
            requestedAmountClose,
            {
                from: myAccount,
            }
        );
    }

    return sendLiquidate;
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
    drizzle,
    userWalletAddress,
}) => {
    const myAccount = userWalletAddress;

    const RewardControlContract = drizzle.contracts.RewardControl;

    const sendClaimAlk = RewardControlContract.methods.claimAlk.cacheSend(
        myAccount,
        {
            from: myAccount,
        }
    );

    return sendClaimAlk;
};
