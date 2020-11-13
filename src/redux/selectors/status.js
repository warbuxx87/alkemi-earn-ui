// Libs
// import { createSelector } from "reselect";
import _ from "lodash";

export const isWalletKYCd = (state) => {
    const verifyKYC = Object.values(
        _.get(state, "contracts.MoneyMarket.verifyKYC", {})
    );
    if (verifyKYC[0]) {
        return verifyKYC[0].value;
    }
    return false;
};
