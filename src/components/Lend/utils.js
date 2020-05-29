import web3 from "web3";
import _ from "lodash";

const decimalsToUnit = {
    6: "mwei",
    9: "gwei",
    12: "micro",
    15: "milli",
    18: "ether"
};

// decimals is constant, default will be 12
const assetToDecimals = {
    USDx: 18,
    WETH: 18,
    DAI: 18,
    USDT: 18,
    USDC: 6,
    WBTC: 8
};

const USDxPrice = state => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.mMarket.assetPrices", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value");
    }
    return null;
};

export const fromWei = (value, unit) => {
    if (unit === "WBTC") {
        let amount = web3.utils.fromWei(value, "lovelace");
        amount = amount / 100;
        return amount.toString();
    } else {
        return web3.utils.fromWei(
            value,
            decimalsToUnit[assetToDecimals[unit] || 18]
        );
    }
};

export const toWei = (value, unit) =>
    web3.utils.toWei(value, decimalsToUnit[assetToDecimals[unit] || 18]);

export const formatNumber = (value, unit) => {
    if (!value) return 0;
    const wei = fromWei(value, unit);
    return new Intl.NumberFormat("en-es", { maximumFractionDigits: 2 }).format(
        wei
    );
};

// value in USDx
export const formatMoney = (value, currency) => {
    const wei = fromWei(value);
    return new Intl.NumberFormat("en-es", {
        style: "currency",
        currency
    }).format(wei);
};

// value in Percent
export const formatPercent = num => {
    return (num * 100).toFixed(2) + "%";
};

export function calculateEarnings(deposit, balance, unit) {
    let earnings = balance - deposit;

    earnings = fromWei(earnings.toString(), unit);

    return earnings;
}
