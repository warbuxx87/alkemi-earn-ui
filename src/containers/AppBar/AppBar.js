// Main Container

// Section 1: React low level imports
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Section 2: internal imports
import useOnboard from "hooks/useOnboard";
import useWatchEtherBalance from "hooks/useWatchEtherBalance";

// Section 3: Selectors
import { isWalletConnected, walletAddress } from "redux/selectors/data/onboard";

import { isWalletKYCd } from "redux/selectors/status";

// Section 4: components
import AppBar from "components/AppBar/AppBar";

const locationToTitles = {
    "/dashboard": "Dashboard",
    "/lend": "Lending",
    "/borrow": "Borrowing",
    "/markets": "Markets",
    "/history": "History",
    "/liquidate": "Liquidate",
    "/connect": "Connect",
    "/swap": "Swap Tokens",
};

// Section 5: Code Container
const AppBarContainer = () => {
    const { onConnect, onReset } = useOnboard();
    useWatchEtherBalance();

    const walletConnected = useSelector(isWalletConnected);
    const currentAddress = useSelector(walletAddress);
    const walletIsKYCd = useSelector(isWalletKYCd);

    let location = useLocation();
    // update Appbar title whenever location change
    const [title, setTitle] = useState("Not Set");

    useEffect(() => {
        var currentTitle =
            locationToTitles[location.pathname] || "404 Page Not Found";
        setTitle(currentTitle);
    }, [location]);

    return (
        <AppBar
            title={title}
            onConnect={onConnect}
            onReset={onReset}
            accountAddress={walletConnected ? currentAddress : null}
            walletIsKYCd={walletIsKYCd}
            walletConnected={walletConnected}
        />
    );
};

// Export
export default AppBarContainer;
