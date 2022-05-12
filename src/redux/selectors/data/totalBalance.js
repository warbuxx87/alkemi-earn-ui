import { createSelector } from "reselect";
import _ from "lodash";
import web3 from "web3";
import Big from "big.js";

import address from "constants/address_map.json";
import {
    getAggregatedAlkApy as getAggregatedAlkApyDeposit,
    getAggregatedDepositAPY,
} from "./lend";
import {
    getAggregatedAlkApy as getAggregatedAlkApyBorrow,
    getAggregatedBorrowAPY,
} from "./borrow";

import { walletNetworkName } from "./onboard";
import { getPool } from "../status/pool";

import constants from "constants/constant.json";
import { getAddressMoneyMarketByPool } from "utils/poolSelectionHelper";

const getDepositAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    console.log("calculateAccountValues: ", calculateAccountValues);
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[0]"); // breaks behaviour of v1
    }
    return null;
};

export const getCollateralRatio = (state) => {
    const collateralRatio = _.get(
        state,
        "contracts.MoneyMarket.collateralRatio"
    );
    if (collateralRatio && collateralRatio["0x0"]) {
        //console.log("collateralRatio", collateralRatio["0x0"].value);
        return _.get(collateralRatio, "['0x0'].value");
    }
    return null;
};

const getBorrowAccountValue = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    if (calculateAccountValues[0]) {
        return _.get(calculateAccountValues, "[0].value[1]"); // breaks behaviour of v1
    }
    return null;
};

export const getMaxBorrowAmount = createSelector(
    getDepositAccountValue,
    getCollateralRatio,
    getBorrowAccountValue,
    (suppliedValue, collateralValue, borrowedValue) =>
        suppliedValue && collateralValue && borrowedValue
            ? web3.util
                  .toBN(suppliedValue)
                  .div(web3.utils.toBN(collateralValue))
                  .sub(web3.utils.toBN(borrowedValue))
                  .toString()
            : null
);

export const getSafeBorrowAmount = createSelector(
    getMaxBorrowAmount,
    (maxBorrowValue) => (maxBorrowValue ? maxBorrowValue * "0.8" : "0")
);

export const getUserCollateralRatio = (state) => {
    const calculateAccountValues = Object.values(
        _.get(state, "contracts.MoneyMarket.calculateAccountValues", {})
    );
    let collateralRatio = 0;
    if (calculateAccountValues[0]) {
        let totalSupplied = _.get(calculateAccountValues, "[0].value[1]");
        let totalBorrowed = _.get(calculateAccountValues, "[0].value[2]");
        let collateralRatio = totalSupplied / totalBorrowed || "0";
        return collateralRatio;
    }
    return collateralRatio;
};

export const getCombinedAPY = createSelector(
    getBorrowAccountValue,
    getDepositAccountValue,
    (state) => getAggregatedDepositAPY(state),
    (state) => getAggregatedBorrowAPY(state),
    (totalBorrowValue, totalDepositValue, totalDepositAPY, totalBorrowAPY) => {
        if (
            !(
                totalBorrowValue &&
                totalDepositValue &&
                totalDepositAPY &&
                totalBorrowAPY
            )
        )
            return null;

        // might need to consider using BN, but there will be an issue with decimal values in totalCombinedAPY values
        const totalCombinedValue =
            parseInt(totalBorrowValue, 10) + parseInt(totalDepositValue, 10);

        // calculate Weight
        const totalBorrowWeight = totalBorrowValue / totalCombinedValue;
        const totalDepositWeight = totalDepositValue / totalCombinedValue;

        // calculate combined or net APY% position for user
        const totalCombinedAPY =
            totalDepositAPY * totalDepositWeight + // Positive value of combined APY
            totalBorrowAPY * totalBorrowWeight;

        return totalCombinedAPY;
    }
);

export const getCombinedAlkApy = createSelector(
    getBorrowAccountValue,
    getDepositAccountValue,
    (state) => getAggregatedAlkApyDeposit(state),
    (state) => getAggregatedAlkApyBorrow(state),
    (totalBorrowValue, totalDepositValue, totalDepositAPY, totalBorrowAPY) => {
        if (
            !(
                totalBorrowValue &&
                totalDepositValue &&
                totalDepositAPY &&
                totalBorrowAPY
            )
        )
            return null;

        // might need to consider using BN, but there will be an issue with decimal values in totalCombinedAPY values
        let totalCombinedValue = Big(totalBorrowValue).add(
            Big(totalDepositValue)
        );

        if (totalCombinedValue.eq(0)) totalCombinedValue = Big(1);

        // calculate Weight
        const totalBorrowWeight = Big(totalBorrowValue).div(
            Big(totalCombinedValue)
        );
        const totalDepositWeight = Big(totalDepositValue).div(
            Big(totalCombinedValue)
        );

        // calculate combined or net APY% position for user
        const totalCombinedAPY = Big(totalDepositAPY)
            .times(Big(totalDepositWeight))
            .add(Big(totalBorrowAPY).times(Big(totalBorrowWeight))); // for ALK APY, the compined APY is going to be always positive

        return parseFloat(totalCombinedAPY.toFixed(2));
    }
);

export const getUSDPrice = (state) => {
    const currentNetworkName = walletNetworkName(state);
    const pool = getPool(state);

    if (currentNetworkName) {
        const contractAddress =
            address[currentNetworkName][pool][`address_USDC`];

        const assetPrices = Object.values(
            _.get(state, "contracts.MoneyMarket.assetPrices", {})
        );

        if (
            assetPrices &&
            Array.isArray(assetPrices) &&
            assetPrices.length > 0
        ) {
            const USDCData = assetPrices.find(
                (asset) => asset.args[0] === contractAddress
            );

            try {
                if (USDCData && USDCData.value)
                    return USDCData.value.slice(0, -12); // USDC has 12 trailling zeros
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    }

    return null;
};

export const getTotalDeposit = createSelector(
    getDepositAccountValue,
    getUSDPrice,
    (depositValue, USDxPrice) => {
        return depositValue && USDxPrice
            ? web3.utils
                  .toBN(depositValue)
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0";
    }
);

export const getTotalBorrow = createSelector(
    getBorrowAccountValue,
    getUSDPrice,
    (borrowValue, USDxPrice) => {
        return borrowValue && USDxPrice
            ? web3.utils
                  .toBN(borrowValue)
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0";
    }
);

export const getAggregatedBalance = createSelector(
    getDepositAccountValue,
    getBorrowAccountValue,
    getUSDPrice,
    (depositValue, borrowValue, USDxPrice) =>
        depositValue && borrowValue && USDxPrice
            ? web3.utils
                  .toBN(depositValue)
                  .sub(web3.utils.toBN(borrowValue))
                  .div(web3.utils.toBN(USDxPrice))
                  .toString()
            : "0"
);

export const getMarketLiquidity = (state) => {
    const currentNetworkName = walletNetworkName(state);
    const pool = getPool(state);

    if (currentNetworkName) {
        const assetLiquidity = {};

        // Retrieve current pool (permissioned or open)
        const currentPool = getPool(state);

        const address_MoneyMarket = getAddressMoneyMarketByPool(
            currentPool,
            currentNetworkName
        );

        Object.keys(state.contracts).forEach((asset) => {
            if (constants.assets.includes(asset)) {
                let assetName = "address_" + asset;
                const assetAddress =
                    address[currentNetworkName][pool][assetName];
                //  console.log(assetAddress);

                try {
                    const liquidity = Object.values(
                        state.contracts[asset].balanceOf
                    );

                    liquidity.forEach((balance) => {
                        // only want to grab balanceOf each tokenContract for MoneyMarket Contract
                        if (balance.args[0] === address_MoneyMarket) {
                            //  console.log(balance);
                            let value = _.get(balance, "value");
                            // console.log(value);
                            assetLiquidity[assetAddress] = value;
                        }
                    });
                } catch (e) {
                    console.log("Error: ", e);
                }
            }
        });
        // console.log("liquidity payload", assetLiquidity);
        return assetLiquidity;
    }
};
