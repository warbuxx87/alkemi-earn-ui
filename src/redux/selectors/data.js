// Libs
import { createSelector } from "reselect";
import _ from "lodash";
import address from "contracts/address_map.json";
import constants from "contracts/constant.json";
import web3 from "web3";
// Stats Selectors
export const getStats = state => state.data.stats.tx;
export const getStatsPending = state => state.data.stats.pending;
export const getStatsError = state => state.data.stats.error;

// Drizzle state selector
export const isDrizzleInitialized = state => state.drizzleStatus.initialized;
export const networkSelector = state =>
    constants.network_type[state.web3.networkId];

// Lend Selectors
const lendAssetSelector = state => state.data.lend.assets;
const allBalanceSelector = state => {
    const supplyBalance = {};
    Object.values(
        _.get(state, "contracts.mMarket.getSupplyBalance", {})
    ).forEach(balance => (supplyBalance[balance.args[1]] = balance.value));
    return supplyBalance;
};
const getLendAsset = createSelector(
    lendAssetSelector,
    networkSelector,
    allBalanceSelector,
    (assets, network, allBalances) =>
        Object.values(assets).map(asset => {
            // TODO: get suppy wallet
            let wallet = "0";
            if (network) {
                const token_address = address[network][`address_${asset.unit}`];
                wallet = allBalances[token_address] || "0";
            }
            return {
                ...asset,
                wallet
            };
        })
);

export const getLendActive = createSelector(getLendAsset, assets =>
    assets.filter(asset => asset.wallet !== "0")
);

export const getLendInactive = createSelector(getLendAsset, assets =>
    assets.filter(asset => asset.wallet === "0")
);

const getSupplyAccountValue = state => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.mMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[1]");
    }
    return null;
};

const getUSDxPrice = state => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.mMarket.assetPrices", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value");
    }
    return null;
};

export const getTotalSupply = createSelector(
    getSupplyAccountValue,
    getUSDxPrice,
    (supplyValue, USDxPrice) =>
        supplyValue && USDxPrice
            ? web3.utils
                  .toBN(supplyValue)
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);

const getBorrowAccountValue = state => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.mMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[2]");
    }
    return null;
};

export const getTotalBorrow = createSelector(
    getBorrowAccountValue,
    getUSDxPrice,
    (borrowValue, USDxPrice) =>
        borrowValue && USDxPrice
            ? web3.utils
                  .toBN(borrowValue)
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);

export const getAggregatedBalance = createSelector(
    getSupplyAccountValue,
    getBorrowAccountValue,
    getUSDxPrice,
    (supplyValue, borrowValue, USDxPrice) =>
        supplyValue && borrowValue && USDxPrice
            ? web3.utils
                  .toBN(supplyValue)
                  .sub(web3.utils.toBN(borrowValue))
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);

export const getLendPending = state =>
    Object.values(state.data.lend.assets).filter(asset => asset.pending);
export const getLendError = state => state.data.lend.error;

// Borrow selectors
export const getBorrowActive = state =>
    Object.values(state.data.borrow.assets).filter(asset => asset.activated);
export const getBorrowInactive = state =>
    Object.values(state.data.borrow.assets).filter(asset => !asset.activated);
export const getBorrowError = state => state.data.borrow.error;
