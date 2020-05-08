import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import AppBar from "components/AppBar/AppBar";
import { getAddress } from "redux/selectors/account";
import { useLocation } from "react-router-dom";

import onboard from "./onboard";

const locationToTitles = {
    "/dashboard": "Dashboard",
    "/lend": "Lending",
    "/borrow": "Borrowing",
    "/markets": "Markets",
    "/history": "History",
    "/liquidate": "Liquidate",
    "/connect": "Connect"
};

const AppBarContainer = props => {
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

    const onConnect = async () => {
        const isSelectWallet = await onboard.walletSelect();
        if (isSelectWallet) {
            const readyToTransact = onboard.walletCheck();
            if (!readyToTransact) {
                // TODO: if it is not ready -> show some warning
            }
        }
    };

    return <AppBar title={title} onConnect={onConnect} {...props} />;
};

const mapStateToProps = state => ({
    shifted: state.ui.sidebar.open,
    accountAddress: getAddress(state)
});

export default compose(connect(mapStateToProps))(AppBarContainer);
