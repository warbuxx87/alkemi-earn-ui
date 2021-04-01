// Section 1: React low level imports
import React from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import LayoutSkeleton from "components/Layout/Skeleton";

import {
    walletAddress,
    walletNetwork,
    walletNetworkName,
} from "redux/selectors/data/onboard";

import { isLiquidator } from "redux/selectors/status";

const DEFAULT_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;

export default () => {
    const userWalletNetwork = useSelector(walletNetwork);
    const currentNetworkName = useSelector(walletNetworkName);
    const userWalletAddress = useSelector(walletAddress);
    const walletIsLiquidator = useSelector(isLiquidator);

    return (
        <LayoutSkeleton
            userWalletNetwork={userWalletNetwork}
            currentNetworkName={currentNetworkName}
            userWalletAddress={userWalletAddress}
            DEFAULT_NETWORK={DEFAULT_NETWORK}
            walletIsLiquidator={walletIsLiquidator}
        />
    );
};
