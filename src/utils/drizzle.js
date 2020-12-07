import { readyToTransact } from "utils/onboard"; // TODO: Should probably be replaced by checking if address is selected and such
import { toWei } from "utils/ui";
import address from "constants/address_map.json";
import constants from "constants/constant.json";
import { initAssetContract } from "utils/contracts";

// Approve Unlimited amount of ERC20 tokens to interact with protocol
export const handle_approve_click = async ({
    drizzle,
    userWalletNetwork,
    asset,
    userWalletAddress,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transaction");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];

    const address_MoneyMarket = address[network].address_MoneyMarket;

    const tokenContract = initAssetContract({
        drizzle,
        userWalletAddress: myAccount,
        asset: asset.unit,
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
    if (!(await readyToTransact())) throw new Error("not ready to transact");
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

// Deposit Tokens to Lending Pool
export const handle_deposit_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    let sendDeposit;
    if (unit === "WETH" || unit === "ETH") {
        sendDeposit = MoneyMarketContract.methods.supply.cacheSend(
            token_address,
            weiAmount,
            {
                from: myAccount,
                value: weiAmount,
            }
        );
    } else {
        sendDeposit = MoneyMarketContract.methods.supply.cacheSend(
            token_address,
            weiAmount,
            {
                from: myAccount,
            }
        );
    }

    return sendDeposit;
};

// Borrow Tokens from Lending Pool
export const handle_borrow_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
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
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    let sendRepay;

    if (unit === "WETH" || unit === "ETH") {
        sendRepay = MoneyMarketContract.methods.repayBorrow.cacheSend(
            token_address,
            weiAmount,
            {
                from: myAccount,
                value: weiAmount,
            }
        );
    } else {
        sendRepay = MoneyMarketContract.methods.repayBorrow.cacheSend(
            token_address,
            weiAmount,
            {
                from: myAccount,
            }
        );
    }
    return sendRepay;
};

// Withdraw tokens from lending pool
export const handle_withdraw_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
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
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    //const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    //const token_address = address[network][`address_${symbol}`];
    let weiAmount = amount.toString();

    if (weiAmount === "-1") {
        weiAmount = constants.max_uint;
    } else {
        weiAmount = toWei(amount, symbol);
    }

    const sendLiquidate = MoneyMarketContract.methods.liquidateBorrow.cacheSend(
        targetAccount,
        assetBorrow,
        assetCollateral,
        weiAmount,
        {
            from: myAccount,
        }
    );

    return sendLiquidate;
};

// Estimate deposit gas, NOT very reliable, since I noticed different values on metamask, but does the trick for the most part
export const estimateDeposit = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    estimationOfGasPrice,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_WETH`];

    const estimateDeposit = await MoneyMarketContract.methods
        .supply(token_address, "1")
        .estimateGas({
            from: myAccount,
            gasPrice: estimationOfGasPrice,
            value: "1", // making the estimation if the user wants to send 1 wei, not great, but a value is better than none, and as the call is async, we cannot set an amount dynamically, it won't resolve in time to be properly responsive
        });

    return estimateDeposit; // if
};
