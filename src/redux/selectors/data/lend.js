// Libs
import { createSelector } from "reselect";
import _ from "lodash";
import address from "constants/address_map.json";
import { walletNetworkName } from "redux/selectors/data/onboard";
import web3 from "web3";

import { getMarketLiquidity } from "redux/selectors/data/totalBalance";

// Helpers
function calculateInterest(rateMantissa) {
    const total_blocks_per_year = (3600 * 24 * 365) / 15;
    let rateAPY = (rateMantissa * total_blocks_per_year) / 1e18;
    return rateAPY;
}

function calculateUtilization(totalBorrow, totalSupply) {
    const utilization = totalBorrow / totalSupply;

    return utilization;
}

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

// Lend Selectors
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

const lendAssetSelector = (state) => state.data.lend.assets;

const lendBalanceSelector = (state) => {
    const supplyBalance = {};
    Object.values(
        _.get(state, "contracts.MoneyMarket.getSupplyBalance", {})
    ).forEach((balance) => (supplyBalance[balance.args[1]] = balance.value));
    return supplyBalance;
};

const lendAPYSelector = (state) => {
    const supplyAPY = {};

    try {
        Object.values(
            _.get(state, "contracts.MoneyMarket.markets", {})
        ).forEach(
            (apy) =>
                (supplyAPY[apy.args[0]] = calculateInterest(
                    apy.value.supplyRateMantissa
                ))
        );
    } catch (e) {}
    return supplyAPY;
};

const lendRateMantissaSelector = (state) => {
    const supplyMantissa = {};

    try {
        Object.values(
            _.get(state, "contracts.MoneyMarket.markets", {})
        ).forEach(
            (rate) =>
                (supplyMantissa[rate.args[0]] = rate.value.supplyRateMantissa)
        );
    } catch (e) {}
    return supplyMantissa;
};

const lendPrincipalSelector = (state) => {
    const supplyPrincipal = {};

    try {
        Object.values(
            _.get(state, "contracts.MoneyMarket.supplyBalances", {})
        ).forEach(
            (deposit) =>
                (supplyPrincipal[deposit.args[1]] = deposit.value.principal)
        );
    } catch (e) {}
    return supplyPrincipal;
};

const getUtilizationValues = (state) => {
    const utilizationRates = {};
    try {
        Object.values(
            _.get(state, "contracts.MoneyMarket.markets", {})
        ).forEach((market) => {
            if (
                market.args[0] !== undefined &&
                market.value[6] !== undefined &&
                market.value[3] !== undefined
            )
                return (utilizationRates[market.args[0]] = calculateUtilization(
                    market.value[6],
                    market.value[3]
                ));
        });
    } catch (e) {}
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
    (state) => lendAssetSelector(state),
    (state) => walletNetworkName(state),
    (state) => lendBalanceSelector(state),
    (state) => lendAPYSelector(state),
    (state) => lendRateMantissaSelector(state),
    (state) => lendPrincipalSelector(state),
    (state) => getUtilizationValues(state),
    (state) => getAssetPrices(state),
    (state) => getSupplyAccountValue(state), // TODO: refactor this to getLendAccountValue for consistency
    (state) => getMarketLiquidity(state),
    (
        assets,
        network,
        lendBalances,
        lendAPY,
        lendMantissa,
        lendPrincipal,
        marketUtilization,
        assetPrices,
        accountTotalSupply,
        marketLiquidity
    ) =>
        Object.values(assets).map((asset) => {
            // supply wallet
            let balance = "0";
            let apy = "0";
            let mantissa = "0";
            let principal = "0";
            let utilization = "0";
            let price = "0";
            let totalSupplied = "0";
            let ethBalance = "0";
            let weight = "0";
            let USDprice = "0";
            let liquidity = "0";

            if (network) {
                const token_address = address[network][`address_${asset.unit}`];
                balance = lendBalances[token_address] || "0";
                apy = lendAPY[token_address] || "0";
                mantissa = lendMantissa[token_address] || "0";
                principal = lendPrincipal[token_address] || "0";
                utilization = marketUtilization[token_address] || "0";
                price = assetPrices[token_address] || "0";
                totalSupplied = accountTotalSupply || "0";
                liquidity = marketLiquidity[token_address] || "0";
                ethBalance = web3.utils
                    .toBN(balance)
                    .mul(web3.utils.toBN(price))
                    .toString();
                weight = (
                    ethBalance / web3.utils.fromWei(totalSupplied)
                ).toString();

                // Replaced now with address_USDC
                USDprice = assetPrices[address[network][`address_USDC`]] || "0";
            }
            return {
                ...asset,
                balance,
                ethBalance,
                weight,
                apy,
                principal,
                mantissa,
                utilization,
                price,
                USDprice,
                liquidity,
            };
        })
);

// LEND Create Selectors
export const getLendActive = createSelector(getLendAsset, (assets) => {
    return assets.filter((asset) => asset.balance !== "0");
});

export const getAggregatedDepositAPY = createSelector(
    getLendActive,
    walletNetworkName,
    (activeAssets, network) => {
        let totalAPY = 0;
        if (network) {
            // checks that web3 wallet is connected
            activeAssets.forEach(function (asset) {
                totalAPY += asset.weight * asset.apy;
                totalAPY = parseInt(totalAPY);
            });
        }

        if (isFinite(totalAPY)) {
            totalAPY = web3.utils.fromWei(totalAPY.toString()); // formats for WEI to decimal
        }

        return totalAPY.toString();
    }
);

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
