import { readyToTransact } from "utils/onboard";
import { toWei } from "utils/ui";
import address from "constants/address_map.json";
import constants from "constants/constant.json";
import { initAssetContract } from "utils/contracts";

// Approve Unlimited amount of ERC20 tokens to interact with protocol
export const handle_approve_click = async ({ drizzle, asset, myAccount }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transaction");
    const drizzleStore = drizzle.store.getState();
    const network = constants.network_type[drizzleStore.web3.networkId];
    const address_MoneyMarket = address[network].address_MoneyMarket;
    const tokenContract = initAssetContract({ drizzle, asset });
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
export const handle_allocate_click = async ({ drizzle, asset, amount }) => {
    console.log(asset.unit);
    if (!(await readyToTransact())) throw new Error("not ready to transaction");
    const drizzleStore = drizzle.store.getState();
    const myAccount = drizzleStore.accounts[0];
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

// Supply Tokens to Lending Pool
export const handle_supply_click = async ({ drizzle, amount, asset }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const drizzleStore = drizzle.store.getState();
    const myAccount = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;
    const weiAmount = toWei(amount, unit);
    const sendSupply = MoneyMarketContract.methods.supply.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendSupply;
};

// Borrow Tokens from Lending Pool
export const handle_borrow_click = async ({ drizzle, amount, asset }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const drizzleStore = drizzle.store.getState();
    const myAccount = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
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
export const handle_repay_click = async ({ drizzle, amount, asset }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const drizzleStore = drizzle.store.getState();
    const myAccount = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;
    const weiAmount = toWei(amount, unit);
    const sendRepay = MoneyMarketContract.methods.repayBorrow.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendRepay;
};

// Withdrawl tokens from lending pool
export const handle_redeem_click = async ({ drizzle, amount, asset }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const drizzleStore = drizzle.store.getState();
    const myAccount = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;
    const weiAmount = toWei(amount, unit);
    const sendWithdraw = MoneyMarketContract.methods.withdraw.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendWithdraw;
};
