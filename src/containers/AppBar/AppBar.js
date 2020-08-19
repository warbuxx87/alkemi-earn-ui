// Main Container

// Section 1: React low level imports
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Section 2: internal imports

// Section 3: Selectors
import { isWalletConnected, walletAddress } from "redux/selectors/onboard";

// Section 4: components
import AppBar from "components/AppBar/AppBar";
import useOnboard from "hooks/useOnboard";

const locationToTitles = {
    "/dashboard": "Dashboard",
    "/lend": "Lending",
    "/borrow": "Borrowing",
    "/markets": "Markets",
    "/history": "History",
    "/liquidate": "Liquidate",
    "/connect": "Connect",
};

// Section 5: Code Component
const AppBarContainer = () => {
    const { onConnect, onReset } = useOnboard();

    const walletConnected = useSelector(isWalletConnected);
    const currentAddress = useSelector(walletAddress);

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
        />
    );
};

// Export
export default AppBarContainer;
