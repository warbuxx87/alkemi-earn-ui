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
    myAccount,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transaction");

    const network = constants.network_type[userWalletNetwork];

    const address_MoneyMarket = address[network].address_MoneyMarket;

    const tokenContract = initAssetContract({
        drizzle,
        userWalletAddress: myAccount,
        asset,
    });
    const sendApprove = tokenContract.methods.approve.cacheSend(
        address_MoneyMarket,
        -1,
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
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const unit = asset.unit;
    const tokenContract = drizzle.contracts[unit];
    const weiAmount = toWei(amount, unit);
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
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;
    const weiAmount = toWei(amount, unit);
    const sendDeposit = MoneyMarketContract.methods.supply.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendDeposit;
};

// Borrow Tokens from Lending Pool
export const handle_borrow_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;
    const weiAmount = toWei(amount, unit);
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
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;
    let weiAmount = toWei(amount, unit);
    // ensures that accrued interest is also repaid by passing -1 to protocol.
    if (weiAmount === asset.balance) {
        weiAmount = -1;
    }
    const sendRepay = MoneyMarketContract.methods.repayBorrow.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendRepay;
};

// Withdraw tokens from lending pool
export const handle_withdraw_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;
    let weiAmount = toWei(amount, unit);
    // ensures that accrued interest is also redeemed by passing -1 to protocol.
    if (weiAmount === asset.balance) {
        weiAmount = -1;
    }
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
    console.log("called here");
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    //const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    //const token_address = address[network][`address_${symbol}`];
    const weiAmount = toWei(amount, symbol);

    const sendLiquidate = MoneyMarketContract.methods.liquidateBorrow.cacheSend(
        targetAccount,
        assetBorrow,
        assetCollateral,
        //token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );

    return sendLiquidate;
};
