// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import LayoutSkeleton from "components/Layout/Skeleton";
import { walletNetwork } from "redux/selectors/onboard";

const APP_ETH_NETWORK = parseInt(process.env.REACT_APP_ETH_NETWORK, 10);

export default () => {
    const networkID = useSelector(walletNetwork);

    return (
        <LayoutSkeleton
            APP_ETH_NETWORK={APP_ETH_NETWORK}
            networkID={networkID}
        />
    );
};
