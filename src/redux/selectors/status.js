// Libs
// import { createSelector } from "reselect";
import _ from "lodash";

export const isWalletKYCd = (state) => {
    const verifyKYC = Object.values(
        _.get(state, "contracts.MoneyMarket.verifyKYC", {})
    );

    if (verifyKYC[0]) {
        const isKYCd = verifyKYC[0].value ? verifyKYC[0].value : false;
        return isKYCd;
    }
    return false;
};

export const getTransactions = (state) => {
    return state.status.transactions.txs;
};
