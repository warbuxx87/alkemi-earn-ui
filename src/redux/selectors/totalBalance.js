import { createSelector } from "reselect";
import _ from "lodash";
import web3 from "web3";

const getSupplyAccountValue = state => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.mMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[1]");
    }
    return null;
};

const getAccountLiquidity = state => {
    const getAccountLiquidity = Object.values(
        _.get(state, "contracts.mMarket.getAccountLiquidity", {})
    );
    if (getAccountLiquidity[0]) {
        return _.get(getAccountLiquidity, "[0].value");
    }
    return null;
};

export const getUSDxPrice = state => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.mMarket.assetPrices", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value");
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

const getBorrowAccountValue = state => {
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
