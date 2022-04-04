// Section 1: React low level imports
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Section 2: internal imports
import LayoutSkeleton from "components/Layout/Skeleton";

import {
    walletAddress,
    walletNetwork,
    walletNetworkName,
} from "redux/selectors/data/onboard";

import { isLiquidator } from "redux/selectors/status/status";
import { getPool } from "redux/selectors/status/pool";

const DEFAULT_NETWORK = parseInt(process.env.REACT_APP_DEFAULT_NETWORK, 10);
const DISPLAY_FREEZE_OF_TXS = process.env.REACT_APP_DISPLAY_FREEZE_OF_TXS;

const Skeleton = () => {
    const [isWalletLiquidator, setIsWalletLiquidator] = useState(false);

    const userWalletNetwork = useSelector(walletNetwork);
    const currentNetworkName = useSelector(walletNetworkName);
    const userWalletAddress = useSelector(walletAddress);
    const walletIsLiquidator = useSelector(isLiquidator);

    const currentPool = useSelector(getPool);

    useEffect(() => {
        if (currentPool == "open") {
            setIsWalletLiquidator(true);
        } else {
            setIsWalletLiquidator(walletIsLiquidator);
        }
    }, [currentPool, walletIsLiquidator]);

    return (
        <LayoutSkeleton
            userWalletNetwork={userWalletNetwork}
            currentNetworkName={currentNetworkName}
            userWalletAddress={userWalletAddress}
            DEFAULT_NETWORK={DEFAULT_NETWORK}
            walletIsLiquidator={isWalletLiquidator}
            DISPLAY_FREEZE_OF_TXS={DISPLAY_FREEZE_OF_TXS}
            currentPool={currentPool}
        />
    );
};

export default Skeleton;
