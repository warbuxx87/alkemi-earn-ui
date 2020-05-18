import web3 from "web3";

const decimalsToUnit = {
    6: "mwei",
    9: "gwei",
    12: "micro",
    15: "milli",
    18: "ether"
};

// decimals is constant, default will be 12
const unitToDecimals = {
    WETH: 18,
    DAI: 18,
    USDT: 18,
    USDC: 6,
    imBTC: 8
};

export const fromWei = (value, decimals) =>
    web3.utils.fromWei(value, decimalsToUnit[decimals]);

export const toWei = (value, decimals) =>
    web3.utils.toWei(value, decimalsToUnit[decimals]);

export const formatNumber = (value, unit) => {
    if (!value) return 0;
    const decimals = unitToDecimals[unit] || 18;
    const wei = fromWei(value, decimals);
    return new Intl.NumberFormat("en-es").format(wei);
};
