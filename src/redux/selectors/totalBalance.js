import { createSelector } from "reselect";
import _ from "lodash";
import web3 from "web3";

const getSupplyAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[1]");
    }
    return null;
};

export const getCollateralRatio = (state) => {
    const collateralRatio = _.get(
        state,
        "contracts.MoneyMarket.collateralRatio[0].value"
    );
    return collateralRatio;
};

export const getMaxBorrowAmount = createSelector(
    getSupplyAccountValue,
    getCollateralRatio,
    (suppliedValue, collateralValue) =>
        suppliedValue && collateralValue
            ? web3.utils
                  .toBN(suppliedValue)
                  .div(web3.utils.toBN(collateralValue))
                  .toString()
            : "1"
);

// const getAccountLiquidity = state => {
//     const getAccountLiquidity = Object.values(
//         _.get(state, "contracts.MoneyMarket.getAccountLiquidity", {})
//     );
//     if (getAccountLiquidity[0]) {
//         return _.get(getAccountLiquidity, "[0].value");
//     }
//     return null;
// };

export const getUserCollateralRatio = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    let collateralRatio = 0;
    if (calculateAccountValues[0]) {
        let totalSupplied = _.get(calculateAccountValues, "[0].value[1]");
        let totalBorrowed = _.get(calculateAccountValues, "[0].value[2]");
        let collateralRatio = totalSupplied / totalBorrowed || 0;
        return collateralRatio;
    }
    return collateralRatio;
};

export const getUSDPrice = (state) => {
    if (state.data.price.usdPrice && state.data.price.usdPrice !== "0")
        return state.data.price.usdPrice;
    else return null;
};

//export const getUSDPrice = createSelector(getUSDPrice, (price) => price);

export const getTotalSupply = createSelector(
    getSupplyAccountValue,
    getUSDPrice,
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
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[2]");
    }
    return null;
};

export const getTotalBorrow = createSelector(
    getBorrowAccountValue,
    getUSDPrice,
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
    getUSDPrice,
    (supplyValue, borrowValue, USDxPrice) =>
        supplyValue && borrowValue && USDxPrice
            ? web3.utils
                  .toBN(supplyValue)
                  .sub(web3.utils.toBN(borrowValue))
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);
