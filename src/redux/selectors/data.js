// Libs
import { createSelector } from "reselect";
import _ from "lodash";
import address from "constants/address_map.json";
import { networkSelector } from "./drizzle";

import web3 from "web3";

// Stats Selectors
export const getStats = (state) => state.data.stats.tx;
export const getStatsPending = (state) => state.data.stats.pending;
export const getStatsError = (state) => state.data.stats.error;

// total Selectors
//
const getAccountLiquidity = (state) => {
    const accountLiquidity = Object.values(
        _.get(state, "contracts.MoneyMarket.getAccountLiquidity", {})
    );
    if (accountLiquidity[0]) {
        console.log(" Account Liquidity", accountLiquidity[0].value);
        return _.get(accountLiquidity, "[0].value");
    }
    return null;
};

const getSupplyAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        // console.log("Supply Account Value", calculateAccountValues[0].value[1]);
        return _.get(calculateAccountValues, "[0].value[1]");
    }
    return null;
};

export const getCollateralRatio = (state) => {
    const collateralRatio = _.get(
        state,
        "contracts.MoneyMarket.collateralRatio"
    );
    if (collateralRatio["0x0"]) {
        //console.log("collateralRatio", collateralRatio["0x0"].value);
        return _.get(collateralRatio, "['0x0'].value");
    }
    return null;
};

const getBorrowAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[2]");
    }
    return null;
};

// Lend Selectors
const lendAssetSelector = (state) => state.data.lend.assets;
const lendBalanceSelector = (state) => {
    const supplyBalance = {};
    Object.values(
        _.get(state, "contracts.MoneyMarket.getSupplyBalance", {})
    ).forEach((balance) => (supplyBalance[balance.args[1]] = balance.value));
    return supplyBalance;
};
const lendAPRSelector = (state) => {
    const supplyAPR = {};
    Object.values(_.get(state, "contracts.MoneyMarket.markets", {})).forEach(
        (apr) =>
            (supplyAPR[apr.args[0]] = calculateInterest(
                apr.value.supplyRateMantissa
            ))
    );
    return supplyAPR;
};

const lendPrincipalSelector = (state) => {
    const supplyPrincipal = {};

    Object.values(
        _.get(state, "contracts.MoneyMarket.supplyBalances", {})
    ).forEach(
        (deposit) =>
            (supplyPrincipal[deposit.args[1]] = deposit.value.principal)
    );
    return supplyPrincipal;
};

const getAllowances = (state) => {
    const allowances = {};
    Object.keys(state.contracts).forEach((asset) => {
        if (asset !== "MoneyMarket") {
            const allowance = Object.values(state.contracts[asset].allowance);
            allowances[asset] = _.get(allowance, "[0].value", "0") !== "0";
        }
    });
    return allowances;
};

function calculateUtilization(totalBorrow, totalSupply) {
    const utilization = totalBorrow / totalSupply;

    return utilization;
}

const getUtilizationValues = (state) => {
    const utilizationRates = {};
    Object.values(_.get(state, "contracts.MoneyMarket.markets", {})).forEach(
        (market) =>
            (utilizationRates[market.args[0]] = calculateUtilization(
                market.value[6],
                market.value[3]
            ))
    );
    return utilizationRates;
};

const getAssetPrices = (state) => {
    const assetPrices = {};
    Object.values(
        _.get(state, "contracts.MoneyMarket.assetPrices", {})
    ).forEach((asset) => (assetPrices[asset.args[0]] = asset.value));
    return assetPrices;
};

const getLendAsset = createSelector(
    lendAssetSelector,
    networkSelector,
    lendBalanceSelector,
    lendAPRSelector,
    lendPrincipalSelector,
    getUtilizationValues,
    getAssetPrices,
    (
        assets,
        network,
        lendBalances,
        allAPR,
        allPrincipal,
        allUtilization,
        assetPrices
    ) =>
        Object.values(assets).map((asset) => {
            // supply wallet
            let balance = "0";
            let apr = "0";
            let principal = "0";
            let utilization = "0";
            let price = "0";

            let USDprice = "0";
            if (network) {
                const token_address = address[network][`address_${asset.unit}`];
                balance = lendBalances[token_address] || "0";
                apr = allAPR[token_address] || "0";
                principal = allPrincipal[token_address] || "0";
                utilization = allUtilization[token_address] || "0";
                price = assetPrices[token_address] || "0";
                USDprice =
                    assetPrices["0x722E6238335d89393A42e2cA316A5fb1b8B2EB55"] ||
                    "0";
            }
            return {
                ...asset,
                balance,
                apr,
                principal,
                utilization,
                price,
                USDprice,
            };
        })
);

// LEND Create Selectors

export const getLendActive = createSelector(getLendAsset, (assets) => {
    return assets.filter((asset) => asset.balance !== "0");
});

export const getLendInactive = createSelector(
    getLendAsset,
    getAllowances,
    (assets, allowances) =>
        assets
            .filter((asset) => asset.balance === "0")
            .map((asset) => {
                asset.activated = allowances[asset.unit] || false;
                return asset;
            })
);

export const getLendPending = (state) =>
    Object.values(state.data.lend.assets).filter((asset) => asset.pending);
export const getLendError = (state) => state.data.lend.error;

// Helpers
function calculateInterest(rateMantissa) {
    const total_blocks_per_year = (3600 * 24 * 365) / 15;
    let rateAPR = (rateMantissa * total_blocks_per_year) / 1e18;
    return rateAPR;
}

// Borrow Selectors

const borrowAssetSelector = (state) => state.data.borrow.assets;

const borrowBalanceSelector = (state) => {
    const borrowBalance = {};
    Object.values(
        _.get(state, "contracts.MoneyMarket.getBorrowBalance", {})
    ).forEach((balance) => (borrowBalance[balance.args[1]] = balance.value));
    return borrowBalance;
};

const borrowAPRSelector = (state) => {
    const borrowAPR = {};
    Object.values(_.get(state, "contracts.MoneyMarket.markets", {})).forEach(
        (apr) =>
            (borrowAPR[apr.args[0]] = calculateInterest(
                apr.value.borrowRateMantissa
            ))
    );
    return borrowAPR;
};

const borrowPrincipalSelector = (state) => {
    const borrowPrincipal = {};

    Object.values(
        _.get(state, "contracts.MoneyMarket.borrowBalances", {})
    ).forEach((loan) => (borrowPrincipal[loan.args[1]] = loan.value.principal));
    return borrowPrincipal;
};

// Create Borrow Selectors

const getBorrowAsset = createSelector(
    borrowAssetSelector,
    networkSelector,
    borrowBalanceSelector,
    borrowAPRSelector,
    borrowPrincipalSelector,
    getUtilizationValues,
    getAssetPrices,
    getAccountLiquidity,
    (
        assets,
        network,
        borrowBalances,
        borrowAPR,
        borrowPrincipal,
        marketUtilization,
        assetPrices,
        accountLiquidity
    ) =>
        Object.values(assets).map((asset) => {
            // TODO: get supply wallet
            let balance = "0";
            let apr = "0";
            let principal = "0";
            let utilization = "0";
            let price = "0";
            let USDprice = "0";
            let maxBorrowETH = "0";
            let maxBorrowToken = "0";
            let liquidity = "0";
            if (network) {
                const token_address = address[network][`address_${asset.unit}`];
                balance = borrowBalances[token_address] || "0";
                apr = borrowAPR[token_address] || "0";
                principal = borrowPrincipal[token_address] || "0";
                utilization = marketUtilization[token_address] || "0";
                price = assetPrices[token_address] || "0";
                USDprice =
                    assetPrices["0x722E6238335d89393A42e2cA316A5fb1b8B2EB55"] ||
                    "0";
            }
            if ((network, accountLiquidity, price)) {
                liquidity = accountLiquidity; // Amount of ETH scaled by 10e18
                maxBorrowToken = liquidity.toString() * price.toString(); // Liquidity ETH Amount divided Amount of tokens for 1 Eth
            }
            return {
                ...asset,
                balance,
                apr,
                principal,
                utilization,
                price,
                USDprice,
                liquidity,
                maxBorrowToken,
            };
        })
);

export const getBorrowActive = createSelector(getBorrowAsset, (assets) =>
    assets.filter((asset) => asset.balance !== "0")
);

export const getBorrowInactive = createSelector(
    getBorrowAsset,
    getAllowances,
    (assets, allowances) =>
        assets
            .filter((asset) => asset.balance === "0")
            .map((asset) => {
                asset.activated = allowances[asset.unit] || false;
                return asset;
            })
);

export const getBorrowError = (state) => state.data.borrow.error;
