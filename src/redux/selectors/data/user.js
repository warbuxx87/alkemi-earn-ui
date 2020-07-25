// Libs
import { createSelector } from "reselect";
import _ from "lodash";
import { networkSelector } from "redux/selectors/drizzle";

const myAddressSelector = (state) => {
    const myAddress = state.accounts["0"];
    return myAddress;
};

export const getUserAddress = createSelector(
    myAddressSelector,
    networkSelector,
    (address, network) => {
        let userAddress = "";
        if (network) {
            userAddress = address;
        }
        return userAddress;
    }
);
