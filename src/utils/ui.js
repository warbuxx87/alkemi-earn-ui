import web3 from "web3";
// import internal assets
import DAI from "assets/images/DAI.svg";
import USDC from "assets/images/USDC.svg";
import WBTC from "assets/images/WBTC.svg";
import USDT from "assets/images/USDT.svg";
import WETH from "assets/images/WETH.svg";
import PAX from "assets/images/pax.png";

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

const token2icon = {
    WETH: WETH,
    USDT: USDT,
    USDC: USDC,
    PAX: PAX,
    WBTC: WBTC,
    DAI: DAI,
};

export const getTokenIcon = (symbol) => {
    const icon = token2icon[symbol];
    return icon;
};

export const fromWei = (value, unit) => {
    if (isNaN(value)) {
        value = 0;
    }
    value = value.toString();

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
export const formatETHMoney = (value, currency, unit, usdPrice) => {
    if (usdPrice === null || usdPrice === undefined) {
        usdPrice = "4131207138725935";
    }

    let calculation = web3.utils
        .toBN(value)
        .div(web3.utils.toBN(usdPrice))
        .toString();

    switch (unit) {
        case "WBTC":
            calculation = calculation / 1e10;
            break;
        case "USDC":
        case "USDT":
            calculation = calculation / 1e12;
            break;
        default:
        // code block
    }

    return new Intl.NumberFormat("en-es", {
        style: "currency",
        currency,
    }).format(calculation);
};

// Format a price number with proper symbol (ex: $1.01)
export const formatPriceWithCurrency = (price, currency) => {
    return new Intl.NumberFormat("en-es", {
        style: "currency",
        currency,
    }).format(price);
};

// value in Percent
export const formatPercent = (num) => {
    return (num * 100).toFixed(2) + "%";
};

export function calculateEarnings(balance, principal, unit, USDPrice) {
    if (!USDPrice) return 0;

    const fPrincipal = fromWei(principal, unit);
    const fBalance = fromWei(balance, unit);
    const fUSDprice = fromWei(USDPrice, "USDx");

    let earnings = fBalance - fPrincipal;
    earnings = earnings / fUSDprice;

    earnings = formatPriceWithCurrency(earnings, "USD");

    return earnings;
}

export const toDate = (timeStamp) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    let dateTime = new Date(timeStamp * 1000);
    dateTime = dateTime.toLocaleDateString("en-US", options); // Returns "2013-05-31T11:54:44.000Z"
    return dateTime;
};

export const checkAction = (address, toAddress, fromAddress, amount) => {
    const myAddress = address.toUpperCase();
    let action;
    if (amount === "0") {
        action = "Mint";
        return action;
    }

    // if from Address is Users Address
    if (fromAddress.toUpperCase() === myAddress) {
        action = "Deposit";
        return action;
    }

    if (toAddress.toUpperCase() === myAddress) {
        action = "Borrow";
        return action;
    }

    return action;
};

export const checkAddress = (address, toAddress, fromAddress) => {
    // get MoneyMarket Address from constants
    const mMarket = "0xe6a53f96ceca750ef8589c5b376872213aa4f230";

    // if from Address is Users Address
    if (fromAddress === address) {
        //  action = "Sent";
        return toAddress;
    }

    if (fromAddress === mMarket) {
        //  action = "Received";
        return fromAddress;
    }
};

export const openEtherScan = (hash) => {
    //TODO: grab network id from state https://[network].etherscan.io/tx/"
    const urlBase = "https://rinkeby.etherscan.io/tx/";
    const url = urlBase + hash;

    return url;
};

export const addressParser = (address) =>
    `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`;

export const format_str_to_kmb = (str_num) => {
    var t_num = Number(str_num);
    var out_a, out_b, t_index;

    if (t_num >= 1e9) {
        out_a = Math.floor(t_num / 1e9);
        if (((t_num % 1e9) / 1e9).toString().indexOf(".") > 0) {
            t_index = ((t_num % 1e9) / 1e9).toString().indexOf(".") + 1;
            out_b = ((t_num % 1e9) / 1e9).toString().substr(t_index, 2);
        } else {
            out_b = "00";
        }
        return out_a + "." + out_b + "G";
    }
    if (t_num >= 1e6) {
        out_a = Math.floor(t_num / 1e6);
        if (((t_num % 1e6) / 1e6).toString().indexOf(".") > 0) {
            t_index = ((t_num % 1e6) / 1e6).toString().indexOf(".") + 1;
            out_b = ((t_num % 1e6) / 1e6).toString().substr(t_index, 2);
        } else {
            out_b = "00";
        }
        return out_a + "." + out_b + "M";
    }
    if (t_num >= 1e3) {
        out_a = Math.floor(t_num / 1e3);
        if (((t_num % 1e3) / 1e3).toString().indexOf(".") > 0) {
            t_index = ((t_num % 1e3) / 1e3).toString().indexOf(".") + 1;
            out_b = ((t_num % 1e3) / 1e3).toString().substr(t_index, 2);
        } else {
            out_b = "00";
        }
        return out_a + "." + out_b + "K";
    }

    if (str_num.indexOf(".") > 0) {
        var aaa = str_num.split(".")[0];
        var bbb = str_num.split(".")[1];
        return (str_num = aaa + "." + bbb.substr(0, 2));
    }

    return str_num;
};

export const format_str_to_percent = (str_num) => {
    // console.log(str_num)
    str_num = str_num.toString();
    var index_num = str_num.indexOf(".") + 2;
    var cpmp_str = str_num.replace(/\./, "");
    var res_str =
        cpmp_str.slice(0, index_num) + "." + cpmp_str.substr(index_num, 2);
    // console.log(Number(res_str))

    if (Number(res_str) === 0) {
        return "<0.01%";
    } else {
        return Number(res_str) + "%";
    }
};

export const format_str_to_K = (str_num) => {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;

    if (str_num.indexOf(".") > 0) {
        str_num = str_num.slice(0, str_num.indexOf(".") + 3);
    }

    if (str_num.indexOf(".") > 0) {
        var part_a = str_num.split(".")[0];
        var part_b = str_num.split(".")[1];

        part_a = (part_a + "").replace(reg, "$&,");

        return part_a + "." + part_b;
    } else {
        str_num = (str_num + "").replace(reg, "$&,");
        return str_num;
    }
};
