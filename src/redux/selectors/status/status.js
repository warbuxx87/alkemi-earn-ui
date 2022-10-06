// Libs
// import { createSelector } from "reselect";
import _ from "lodash";

export const isWalletKYCd = (state) => {
    // console.log('state.status.blockTxForMMI.block: ', state.status.blockTxForMMI.block);
    if (state.status.blockTxForMMI.block === true) {
        // Addded for MMI
        return false;
    }

    const verifyKYC = Object.values(
        _.get(state, "contracts.MoneyMarket.customersWithKYC", {})
    );

    if (verifyKYC[0]) {
        const isKYCd = verifyKYC[0].value ? verifyKYC[0].value : false;
        return isKYCd;
    }

    return false;
};

export const isLiquidator = (state) => {
    const verifyLiquidator = Object.values(
        _.get(state, "contracts.MoneyMarket.liquidators", {})
    );

    if (verifyLiquidator[0]) {
        const isALiquidator = verifyLiquidator[0].value
            ? verifyLiquidator[0].value
            : false;
        return isALiquidator;
    }
    return false;
};

export const getTransactions = (state) => {
    return state.status.transactions.txs;
};
