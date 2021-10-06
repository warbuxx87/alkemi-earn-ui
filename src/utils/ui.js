import web3 from "web3";

import Big from "big.js";
// import internal assets
import DAI from "assets/images/DAI.svg";
import USDC from "assets/images/USDC.svg";
import WBTC from "assets/images/WBTC.svg";
import USDT from "assets/images/USDT.svg";
import WETH from "assets/images/WETH.svg";
import PAX from "assets/images/pax.png";
import ETH from "assets/images/eth.png";

const decimalsToUnit = {
    6: "mwei",
    9: "gwei",
    12: "micro",
    15: "milli",
    18: "ether",
};

// decimals is constant, default will be 12
export const assetToDecimals = {
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
    ETH: ETH,
};

// This is used in formatNumber and formatStringNumber below, if the currentnetwork id is equal to this variable, it's going to force values display to have 2 decimal places
const TWO_DECIMAL_PLACES_NETWORK_ID = parseInt(
    process.env.REACT_APP_TWO_DECIMAL_PLACES_NETWORK_ID,
    10
);

const orgFee = 0.001;

const maxDecimalsHigherValueAsset = 5; // maximum number of decimals to display for WBTC & ETH
const minDecimalsHigherValueAsset = 5; // minimum number of decimals to display for WBTC & ETH

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
        //wbtc has 8 decimals
        let amount = Big(value);
        amount = amount.div(1e8);

        // Commented out the next part because the "value" would and should never have decimal places, so it doesn't make sense for the calculated amount to have more than 8 decimal places ever
        // let returnAmount = amount.toString()

        // const amountSplit = amount.toString().split(".");
        // if(amountSplit[1] && amountSplit[1].length > 8) { // making very sure the number doesn't have more than 8 decimal places
        //     returnAmount = amount.toFixed(8)
        // }

        return amount.toString(); // returnAmount
    } else {
        return web3.utils.fromWei(
            value,
            decimalsToUnit[assetToDecimals[unit] || 18]
        );
    }
};

export const toWei = (value, unit) => {
    if (unit === "WBTC") {
        //wbtc has 8 decimals
        let amount = Big(value);
        amount = amount.times(1e8); // This fix might be useful for other coins that are not set to have the defined decimal points like ether (6, 9...), a good idea would be to refactor everything to this

        return amount.toString();
    } else {
        return web3.utils.toWei(
            value,
            decimalsToUnit[assetToDecimals[unit] || 18]
        );
    }
};

function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// displays a big number in a correct locale format
// @param value is expected to not have any decimals
export const bigNumberToLocale = (value) => {
    if (typeof value === "number") return value.toLocaleString("en-US");
    if (typeof value === "string") return numberWithCommas(value);

    return value;
};

// Turns a number from wei value to one with a decimal point, also returns a certain number of fraction digits depending on the asset/token
export const formatNumber = (value, unit, userWalletNetwork) => {
    const maxDecimals = 2; // maximum number of decimals to display by default
    // const minDecimals = 2; // minimum number of decimals to display by default
    if (!value) {
        if (unit === "ALK") return "0.000";
        else return 0;
    }

    const wei = fromWei(value, unit);
    switch (unit) {
        case "USDC":
            return new Intl.NumberFormat("en-es", {
                maximumFractionDigits:
                    userWalletNetwork === TWO_DECIMAL_PLACES_NETWORK_ID
                        ? maxDecimals
                        : 6,
                minimumFractionDigits: 2,
            }).format(wei);
        case "WETH":
            return new Intl.NumberFormat("en-es", {
                maximumFractionDigits:
                    userWalletNetwork === TWO_DECIMAL_PLACES_NETWORK_ID
                        ? maxDecimalsHigherValueAsset
                        : 18,
                minimumFractionDigits:
                    userWalletNetwork === TWO_DECIMAL_PLACES_NETWORK_ID
                        ? minDecimalsHigherValueAsset
                        : 4,
            }).format(wei);
        case "WBTC":
            return new Intl.NumberFormat("en-es", {
                maximumFractionDigits:
                    userWalletNetwork === TWO_DECIMAL_PLACES_NETWORK_ID
                        ? maxDecimalsHigherValueAsset
                        : 8,
                minimumFractionDigits:
                    userWalletNetwork === TWO_DECIMAL_PLACES_NETWORK_ID
                        ? minDecimalsHigherValueAsset
                        : 4,
            }).format(wei);
        case "ALK":
            return new Intl.NumberFormat("en-es", {
                maximumFractionDigits: 3,
                minimumFractionDigits: 3,
            }).format(wei);
        default:
            return new Intl.NumberFormat("en-es", {
                maximumFractionDigits:
                    userWalletNetwork === TWO_DECIMAL_PLACES_NETWORK_ID
                        ? maxDecimals
                        : 18,
                minimumFractionDigits: 2,
            }).format(wei);
    }
};

// For the string representation of numbers
// Returns either the number or with a precise number of decimals (2) or with another preferred number of decimal places
export const formatStringNumber = (
    value,
    unit = null,
    userWalletNetwork,
    preferredDecimalsPlaces
) => {
    if (userWalletNetwork === TWO_DECIMAL_PLACES_NETWORK_ID) {
        if (unit === "WETH") {
            let bigValue = Big(value);
            return bigValue.toFixed(maxDecimalsHigherValueAsset);
        }
        let bigValue = Big(value);
        return bigValue.toFixed(2);
    } else if (preferredDecimalsPlaces !== undefined) {
        let bigValue = Big(value);
        return bigValue.toFixed(preferredDecimalsPlaces);
    } else {
        return value;
    }
};

export const multiplyBigNumbers = (num1, num2) => {
    let bigNum1 = Big(num1);
    return bigNum1.times(Big(num2)).toString();
};

// Breaks a number (in string format) to the main number & fraction
export const formattedNumberToSplitNumber = (formattedNumber) => {
    const splitNumber = formattedNumber.split(".");

    return {
        leftOfDecimalPoint: splitNumber[0] ? splitNumber[0] : "0",
        rightOfDecimalPoint: splitNumber[1] ? splitNumber[1] : "0",
    };
};

// Takes a split number (from the decimal point), and returns a certain amount of fraction digits depending on the length of the left side of the decimal point
export const breakNumberFromDecimalPoint = (
    theNumber,
    shouldFormatNumber = true
) => {
    const {
        leftOfDecimalPoint,
        rightOfDecimalPoint,
    } = formattedNumberToSplitNumber(
        shouldFormatNumber
            ? formatNumber(theNumber.toString(), "ETH")
            : theNumber
    );

    const numbersOnLeft = leftOfDecimalPoint.replace("-", ""); // remove negative
    let numberOnRightToDisplay = rightOfDecimalPoint;

    if (numbersOnLeft.length <= 4) {
        numberOnRightToDisplay = numberOnRightToDisplay.substring(0, 8);
    } else if (numbersOnLeft.length <= 6) {
        numberOnRightToDisplay = numberOnRightToDisplay.substring(0, 6);
    } else if (numbersOnLeft.length <= 9) {
        numberOnRightToDisplay = numberOnRightToDisplay.substring(0, 4);
    } else {
        numberOnRightToDisplay = numberOnRightToDisplay.substring(0, 2);
    }

    return { leftOfDecimalPoint, numberOnRightToDisplay };
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

// value in USD to calculate Origination Fees while borrowing
export const formatETHMoneyOrgFee = (
    value,
    amount,
    currency,
    unit,
    usdPrice
) => {
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
    }).format(calculation * orgFee * amount);
};

// eth balance value in USD
export const ETHBalanceToUSD = (ethBalance, USDPrice) => {
    return ethBalance && USDPrice
        ? web3.utils.toBN(ethBalance).div(web3.utils.toBN(USDPrice)).toString()
        : "0";
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
    if (!isNaN(num)) {
        return (num * 100).toFixed(2) + "%";
    } else {
        return "0.00%";
    }
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
    const myAddress = address.toLowerCase();
    let action;
    if (amount === "0") {
        action = "Mint";
        return action;
    }

    // if from Address is Users Address
    if (fromAddress.toLowerCase() === myAddress) {
        action = "Deposit";
        return action;
    }

    if (toAddress.toLowerCase() === myAddress) {
        action = "Borrow";
        return action;
    }

    return action;
};

export const openEtherScan = (hash, currentNetworkName) => {
    let urlBase = `https://${currentNetworkName}.etherscan.io/tx/`;
    // mainnet does not resolve main.etherscan.io change to root etherscan.io
    if (currentNetworkName === "main") {
        urlBase = `https://etherscan.io/tx/`;
    }
    const url = urlBase + hash;

    return url;
};

export const addressParser = (address) =>
    `${address.substr(0, 4)}..${address.substr(address.length - 4, 4)}`;

export const format_str_to_kmb = (str_num) => {
    str_num = str_num.toString();
    let t_num = Number(str_num);
    let out_a, out_b, t_index;

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

export const format_str_to_percent = (str_num, userWalletNetwork) => {
    let bigStrNum = Big(str_num);
    bigStrNum = bigStrNum.times(100);

    if (bigStrNum.lte(0.01)) {
        return "<0.01%";
    } else {
        return (
            formatStringNumber(bigStrNum.toString(), null, userWalletNetwork) +
            "%"
        );
    }
};

export const format_str_to_K = (str_num) => {
    str_num = str_num.toString();
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
