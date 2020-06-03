import { createSelector } from "reselect";
import _ from "lodash";
import web3 from "web3";
import address from "constants/address_map.json";

const getSupplyAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.mMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[1]");
    }
    return null;
};

// const getAccountLiquidity = state => {
//     const getAccountLiquidity = Object.values(
//         _.get(state, "contracts.mMarket.getAccountLiquidity", {})
//     );
//     if (getAccountLiquidity[0]) {
//         return _.get(getAccountLiquidity, "[0].value");
//     }
//     return null;
// };

export const getCollateralRatio = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.mMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        let totalSupplied = _.get(calculateAccountValues, "[0].value[1]");
        let totalBorrowed = _.get(calculateAccountValues, "[0].value[2]");
        let collateralRatio = totalSupplied / totalBorrowed;
        return collateralRatio;
    }
};

export const getUSDxPrice = (state) => {
    const assetPrices = Object.values(
        _.get(state, "contracts.mMarket.assetPrices", {})
    );

    // TODO, this address filter should be pulled from constants address_map with proper web3 connected Network
    let USDxPrice = assetPrices.filter(function (asset) {
        return asset.args[0] === "0xD96cC7f80C1cb595eBcdC072531e1799B3a2436E"; // rinkeby address for USDx
    });

    if (USDxPrice[0]) {
        return USDxPrice[0].value;
    }
    return null;
};

export const getTotalSupply = createSelector(
    getSupplyAccountValue,
    getUSDxPrice,
    (supplyValue, USDxPrice) =>
        supplyValue && USDxPrice
            ? web3.utils
                  .toBN(supplyValue)
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);

const getBorrowAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.mMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[2]");
    }
    return null;
};

export const getTotalBorrow = createSelector(
    getBorrowAccountValue,
    getUSDxPrice,
    (borrowValue, USDxPrice) =>
        borrowValue && USDxPrice
            ? web3.utils
                  .toBN(borrowValue)
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);

export const getAggregatedBalance = createSelector(
    getSupplyAccountValue,
    getBorrowAccountValue,
    getUSDxPrice,
    (supplyValue, borrowValue, USDxPrice) =>
        supplyValue && borrowValue && USDxPrice
            ? web3.utils
                  .toBN(supplyValue)
                  .sub(web3.utils.toBN(borrowValue))
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);
