// Main Container

// Section 1: React low level imports
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { useLocation } from "react-router-dom";

import onboard from "utils/onboard";
import { initContracts } from "utils/contracts";
import withDrizzle from "containers/Drizzle/withDrizzle";

import { setWalletConnected } from "redux/actions/status/onboard";

import { isWalletConnected } from "redux/selectors/onboard";

// Section 3: Selectors
import { networkSelector, getAccountAddress } from "redux/selectors/drizzle";

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
};

// Section 5: Code Component
const AppBarContainer = ({ drizzle, networkId, accountAddress }) => {
    // Should be moved to an onboard manager probably
    const dispatch = useDispatch();
    const shouldInitContracts = useSelector(isWalletConnected);

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
        const checkIfPreviouslySelectedWallet = async () => {
            const previouslySelectedWallet = window.localStorage.getItem(
                "selectedWallet"
            );
            if (previouslySelectedWallet && onboard) {
                const isSelectWallet = await onboard.walletSelect(
                    previouslySelectedWallet
                );

                if (isSelectWallet) {
                    const readyToTransact = await onboard.walletCheck();
                    console.log("readyToTransact 1: ", readyToTransact);
                    dispatch(setWalletConnected(readyToTransact));
                    if (!readyToTransact) {
                        // TODO: if it is not ready -> show some warning
                    }
                }
            }
        };

        checkIfPreviouslySelectedWallet();
    }, []);

    useEffect(() => {
        if (networkId && accountAddress && shouldInitContracts) {
            console.log("Will initcontracts in useEffect");
            // account connected
            initContracts(drizzle);
        }
    }, [networkId, accountAddress, drizzle, shouldInitContracts]);

    const onConnect = async () => {
        const isSelectWallet = await onboard.walletSelect();
        if (isSelectWallet) {
            const readyToTransact = await onboard.walletCheck();
            console.log("readyToTransact 2: ", readyToTransact);
            dispatch(setWalletConnected(readyToTransact));
            if (!readyToTransact) {
                // TODO: if it is not ready -> show some warning
            }
        }
    };
    const onReset = async () => {
        onboard.walletReset();

        // TODO
        dispatch(setWalletConnected(false));
        // &
        // resetStores
    };

    return (
        <AppBar
            title={title}
            onConnect={onConnect}
            onReset={onReset}
            accountAddress={accountAddress}
        />
    );
};

// Connect State to Props
const mapStateToProps = (state) => ({
    networkId: networkSelector(state),
    accountAddress: getAccountAddress(state),
});

// Export
export default compose(
    connect(mapStateToProps),
    withDrizzle()
)(AppBarContainer);
