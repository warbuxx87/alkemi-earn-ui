// Libs
import { createSelector } from "reselect";
import _ from "lodash";
import address from "contracts/address_map.json";
import { networkSelector } from "./drizzle";
// Stats Selectors
export const getStats = state => state.data.stats.tx;
export const getStatsPending = state => state.data.stats.pending;
export const getStatsError = state => state.data.stats.error;

// Lend Selectors
const lendAssetSelector = state => state.data.lend.assets;
const lendBalanceSelector = state => {
    const supplyBalance = {};
    Object.values(
        _.get(state, "contracts.mMarket.getSupplyBalance", {})
    ).forEach(balance => (supplyBalance[balance.args[1]] = balance.value));
    return supplyBalance;
};
const lendAPRSelector = state => {
    const supplyAPR = {};
    Object.values(_.get(state, "contracts.mMarket.markets", {})).forEach(
        apr =>
            (supplyAPR[apr.args[0]] = calculateInterest(
                apr.value.supplyRateMantissa
            ))
    );
    return supplyAPR;
};

const lendPrincipalSelector = state => {
    const supplyPrincipal = {};

    Object.values(_.get(state, "contracts.mMarket.supplyBalances", {})).forEach(
        deposit => (supplyPrincipal[deposit.args[1]] = deposit.value.principal)
    );
    return supplyPrincipal;
};

const getAllowances = state => {
    const allowances = {};
    Object.keys(state.contracts).forEach(asset => {
        if (asset !== "mMarket") {
            const allowance = Object.values(state.contracts[asset].allowance);
            allowances[asset] = _.get(allowance, "[0].value", "0") !== "0";
        }
    });
    return allowances;
};

const getLendAsset = createSelector(
    lendAssetSelector,
    networkSelector,
    lendBalanceSelector,
    lendAPRSelector,
    lendPrincipalSelector,
    (assets, network, lendBalances, allAPR, allPrincipal) =>
        Object.values(assets).map(asset => {
            // supply wallet
            let wallet = "0";
            let apr = "0";
            let principal = "0";
            if (network) {
                const token_address = address[network][`address_${asset.unit}`];
                wallet = lendBalances[token_address] || "0";
                apr = allAPR[token_address] || "0";
                principal = allPrincipal[token_address] || "0";
            }
            return {
                ...asset,
                wallet,
                apr,
                principal
            };
        })
);

// LEND Create Selectors

export const getLendActive = createSelector(getLendAsset, assets =>
    assets.filter(asset => asset.wallet !== "0")
);

export const getLendInactive = createSelector(
    getLendAsset,
    getAllowances,
    (assets, allowances) =>
        assets
            .filter(asset => asset.wallet === "0")
            .map(asset => {
                asset.activated = allowances[asset.unit] || false;
                return asset;
            })
);

export const getLendPending = state =>
    Object.values(state.data.lend.assets).filter(asset => asset.pending);
export const getLendError = state => state.data.lend.error;

// Helpers
function calculateInterest(rateMantissa) {
    const total_blocks_per_year = (3600 * 24 * 365) / 15;
    let rateAPR = (rateMantissa * total_blocks_per_year) / 1e18;
    return rateAPR;
}

// Borrow Selectors

const borrowAssetSelector = state => state.data.borrow.assets;

const borrowBalanceSelector = state => {
    const borrowBalance = {};
    Object.values(
        _.get(state, "contracts.mMarket.getBorrowBalance", {})
    ).forEach(balance => (borrowBalance[balance.args[1]] = balance.value));
    return borrowBalance;
};
const borrowAPRSelector = state => {
    const borrowAPR = {};
    Object.values(_.get(state, "contracts.mMarket.markets", {})).forEach(
        apr =>
            (borrowAPR[apr.args[0]] = calculateInterest(
                apr.value.borrowRateMantissa
            ))
    );
    return borrowAPR;
};

const borrowPrincipalSelector = state => {
    const borrowPrincipal = {};

    Object.values(_.get(state, "contracts.mMarket.borrowBalances", {})).forEach(
        loan => (borrowPrincipal[loan.args[1]] = loan.value.principal)
    );
    return borrowPrincipal;
};

// Create Borrow Selectors

const getBorrowAsset = createSelector(
    borrowAssetSelector,
    networkSelector,
    borrowBalanceSelector,
    borrowAPRSelector,
    borrowPrincipalSelector,
    (assets, network, borrowBalances, borrowAPR, borrowPrincipal) =>
        Object.values(assets).map(asset => {
            // TODO: get suppy wallet
            let balance = "0";
            let apr = "0";
            let principal = "0";
            if (network) {
                const token_address = address[network][`address_${asset.unit}`];
                balance = borrowBalances[token_address] || "0";
                apr = borrowAPR[token_address] || "0";
                principal = borrowPrincipal[token_address] || "0";
            }
            return {
                ...asset,
                balance,
                apr,
                principal
            };
        })
);

export const getBorrowActive = createSelector(getBorrowAsset, assets =>
    assets.filter(asset => asset.balance !== "0")
);

export const getBorrowInactive = createSelector(getBorrowAsset, assets =>
    assets.filter(asset => asset.balance === "0")
);

export const getBorrowError = state => state.data.borrow.error;
