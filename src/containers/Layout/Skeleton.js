// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import LayoutSkeleton from "components/Layout/Skeleton";
import {
    getWalletCurrentNetworkID /*, getWalletCurrentAddress*/,
} from "redux/selectors/onboard";

export default () => {
    const networkID = useSelector(getWalletCurrentNetworkID);
    //const address = useSelector(getWalletCurrentAddress);

    return (
        <LayoutSkeleton
            networkID={
                !isNaN(networkID) ? parseInt(networkID, 10) : networkID
            } /*address={address}*/
        />
    );
};
