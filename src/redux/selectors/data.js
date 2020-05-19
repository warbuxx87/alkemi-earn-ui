// Libs
import { createSelector } from "reselect";
import _ from "lodash";
import address from "contracts/address_map.json";
import constants from "contracts/constant.json";

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
            let wallet = 0;
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

export const getLendPending = state =>
    Object.values(state.data.lend.assets).filter(asset => asset.pending);
export const getLendError = state => state.data.lend.error;

// Borrow selectors
export const getBorrowActive = state =>
    Object.values(state.data.borrow.assets).filter(asset => asset.activated);
export const getBorrowInactive = state =>
    Object.values(state.data.borrow.assets).filter(asset => !asset.activated);
export const getBorrowError = state => state.data.borrow.error;
