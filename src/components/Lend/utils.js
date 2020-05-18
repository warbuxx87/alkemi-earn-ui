import web3 from "web3";

const decimalsToUnit = {
    6: "mwei",
    9: "gwei",
    12: "micro",
    15: "milli",
    18: "ether"
};

export const fromWei = (value, decimals) =>
    web3.utils.fromWei(value, decimalsToUnit[decimals]);

export const toWei = (value, decimals) =>
    web3.utils.toWei(value, decimalsToUnit[decimals]);

export const formatNumber = (value, unit) => {
    if (!value) return 0;
    const decimals = unit === "USDC" ? 6 : 12; // USDC 's decimals is 6, others is 12
    const wei = fromWei(value, decimals);
    return new Intl.NumberFormat("en-es").format(wei);
};
