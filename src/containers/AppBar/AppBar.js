import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import AppBar from "components/AppBar/AppBar";
import { networkSelector, getAccountAddress } from "redux/selectors/drizzle";
import { useLocation } from "react-router-dom";

import onboard from "./onboard";
import { initContracts } from "utils/contracts";
import withDrizzle from "containers/Drizzle/withDrizzle";

const locationToTitles = {
    "/dashboard": "Dashboard",
    "/lend": "Lending",
    "/borrow": "Borrowing",
    "/markets": "Markets",
    "/history": "History",
    "/liquidate": "Liquidate",
    "/connect": "Connect"
};

const AppBarContainer = ({ drizzle, networkId, accountAddress }) => {
    let location = useLocation();
    // update Appbar title whenever location change
    const [title, setTitle] = useState("Not Set");
    useEffect(() => {
        var currentTitle =
            locationToTitles[location.pathname] || "404 Page Not Found";
        setTitle(currentTitle);
    }, [location]);

    // get previous selected wallet
    useEffect(() => {
        const previouslySelectedWallet = window.localStorage.getItem(
            "selectedWallet"
        );
        if (previouslySelectedWallet && onboard) {
            onboard.walletSelect(previouslySelectedWallet);
        }
    }, []);

    useEffect(() => {
        if (networkId && accountAddress) {
            // account connected
            initContracts(drizzle);
        }
    }, [networkId, accountAddress, drizzle]);
    
    const onConnect = async () => {
        const isSelectWallet = await onboard.walletSelect();
        if (isSelectWallet) {
            const readyToTransact = onboard.walletCheck();
            if (!readyToTransact) {
                // TODO: if it is not ready -> show some warning
            }
        }
    };
    const onReset = async () => {
        onboard.walletReset();
    }

    return (
        <AppBar
            title={title}
            onConnect={onConnect}
            onReset={onReset}
            accountAddress={accountAddress}
        />
    );
};

const mapStateToProps = state => ({ 
    networkId: networkSelector(state),
    accountAddress: getAccountAddress(state)
});

export default compose(
    connect(mapStateToProps),
    withDrizzle()
)(AppBarContainer);
