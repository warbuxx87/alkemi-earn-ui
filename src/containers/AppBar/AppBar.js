// Main Container

// Section 1: React low level imports
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Section 2: internal imports
import useWalletSelect from "hooks/useWalletSelect";
import useWatchEtherBalance from "hooks/useWatchEtherBalance";
import usePoolManager from "hooks/usePoolManager";
import useWatchTxs from "hooks/useWatchTxs";

// Section 3: Selectors
import {
    isWalletConnected,
    walletAddress,
    isIFrame,
} from "redux/selectors/data/onboard";

import { isWalletKYCd, isLiquidator } from "redux/selectors/status/status";

import { getPool } from "redux/selectors/status/pool";

// Section 4: components
import AppBar from "components/AppBar/AppBar";

const locationToTitles = {
    "/dashboard": "Account Overview",
    "/lend": "Lending",
    "/borrow": "Borrowing",
    "/markets": "Protocol Overview",
    "/history": " Transaction History",
    "/liquidate": "Liquidations",
    "/connect": "Connect",
    "/swap": "Swap Tokens",
};

// Section 5: Code Container
const AppBarContainer = () => {
    const { onConnect, onReset } = useWalletSelect();
    useWatchEtherBalance();
    usePoolManager();
    useWatchTxs();

    const [isWalletLiquidator, setIsWalletLiquidator] = useState(false);

    const walletConnected = useSelector(isWalletConnected);
    const currentAddress = useSelector(walletAddress);
    const walletIsKYCd = useSelector(isWalletKYCd);
    const walletIsLiquidator = useSelector(isLiquidator);
    const walletIsIFrame = useSelector(isIFrame);

    const currentPool = useSelector(getPool);

    let location = useLocation();
    // update Appbar title whenever location change
    const [title, setTitle] = useState("Not Set");

    useEffect(() => {
        var currentTitle =
            locationToTitles[location.pathname] || "404 Page Not Found";
        setTitle(currentTitle);
    }, [location]);

    useEffect(() => {
        if (currentPool == "open") {
            setIsWalletLiquidator(true);
        } else {
            setIsWalletLiquidator(walletIsLiquidator);
        }
    }, [currentPool, walletIsLiquidator]);

    return (
        <AppBar
            title={title}
            onConnect={onConnect}
            onReset={onReset}
            accountAddress={walletConnected ? currentAddress : null}
            walletIsKYCd={walletIsKYCd}
            walletConnected={walletConnected}
            walletIsLiquidator={isWalletLiquidator}
            displayKYCStatus={currentPool != "open"}
            walletIsIFrame={walletIsIFrame}
        />
    );
};

// Export
export default AppBarContainer;
