// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import LayoutSkeleton from "components/Layout/Skeleton";
import {
    getWalletCurrentNetworkID /*, getWalletCurrentAddress*/,
} from "redux/selectors/onboard";

const APP_ETH_NETWORK = parseInt(process.env.REACT_APP_ETH_NETWORK, 10);

export default () => {
    const networkID = useSelector(getWalletCurrentNetworkID);
    //const address = useSelector(getWalletCurrentAddress);

    console.log("networkID: ", networkID);
    return (
        <LayoutSkeleton
            networkID={networkID}
            /*address={address}*/

            APP_ETH_NETWORK={APP_ETH_NETWORK}
        />
    );
};
