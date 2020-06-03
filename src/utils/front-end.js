import web3 from "web3";
import { getUSDxPrice } from "redux/selectors/totalBalance";
// import _ from "lodash";

const decimalsToUnit = {
    6: "mwei",
    9: "gwei",
    12: "micro",
    15: "milli",
    18: "ether",
};

// decimals is constant, default will be 12
const assetToDecimals = {
    USDx: 18,
    WETH: 18,
    DAI: 18,
    PAX: 18,
    USDT: 6,
    USDC: 6,
    WBTC: 8,
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

export const toWei = (value, unit) => {
    if (unit === "WBTC") {
        let amount = web3.utils.toWei(value, "lovelace");
        amount = amount * 100;
        return amount.toString();
    } else {
        return web3.utils.toWei(
            value,
            decimalsToUnit[assetToDecimals[unit] || 18]
        );
    }
};

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
        currency,
    }).format(wei);
};

// value in USD
export const formatETHMoney = (value, currency, unit) => {
    let usdPrice = getUSDxPrice();
    console.log("value: ", value);

    console.log("pre USDPrice: ", usdPrice);

    if (usdPrice === null) {
        usdPrice = "4131207138725935";
    }
    console.log("USDPrice: ", usdPrice);

    let calculation = web3.utils
        .toBN(value)
        .div(web3.utils.toBN(usdPrice))
        .toString();

    console.log("calculation:", calculation);

    if (unit === "WBTC") {
        calculation = calculation / 1e10;
    }

    if (unit === "USDC") {
        calculation = calculation / 1e12;
    }

    if (unit === "USDT") {
        calculation = calculation / 1e12;
    }

    return new Intl.NumberFormat("en-es", {
        style: "currency",
        currency,
    }).format(calculation);
};

// value in Percent
export const formatPercent = (num) => {
    return (num * 100).toFixed(2) + "%";
};

export function calculateEarnings(deposit, balance, unit) {
    let earnings = balance - deposit;

    earnings = fromWei(earnings.toString(), unit);

    return earnings;
}
