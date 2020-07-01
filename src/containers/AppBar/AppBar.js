// Main Container

// Section 1: React low level imports
import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { useLocation } from "react-router-dom";

import onboard from "utils/onboard";
import { initContracts } from "utils/contracts";
import withDrizzle from "containers/Drizzle/withDrizzle";

import { setWalletConnected } from "redux/actions/status/onboard";

import { isWalletConnected } from "redux/selectors/onboard";

import { resetLendData } from "redux/actions/data/lend";

// Section 3: Selectors
import { networkSelector, getAccountAddress } from "redux/selectors/drizzle";

// Section 4: components
import AppBar from "components/AppBar/AppBar";
import Web3 from "web3";

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

    const [currentAddress, setCurrentAddress] = useState(accountAddress);

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
        console.log("ran useEffect");
        const checkIfPreviouslySelectedWallet = async () => {
            const previouslySelectedWallet = window.localStorage.getItem(
                "selectedWallet"
            );

            if (
                previouslySelectedWallet !== undefined &&
                typeof previouslySelectedWallet === "string" && // comment these two conditions to show wallet selection on load
                onboard
            ) {
                const isSelectWallet = await onboard.walletSelect(
                    previouslySelectedWallet
                );

                if (isSelectWallet) {
                    const readyToTransact = await onboard.walletCheck();
                    dispatch(setWalletConnected(readyToTransact));

                    if (!readyToTransact) {
                        // TODO: if it is not ready -> show some warning
                    }
                }
            }
        };

        checkIfPreviouslySelectedWallet();
    }, [dispatch]);

    const resetStoreData = useCallback(() => {
        dispatch(resetLendData());
    }, [dispatch]);

    useEffect(() => {
        const initDrizzleData = (forceUpdate = false) => {
            if (networkId && accountAddress && shouldInitContracts === true) {
                if (drizzle && !forceUpdate) {
                    // perhaps make a check if drizzle was already connected
                    drizzle.web3 = new Web3(window.currentlyUsedProvider);
                }

                // account connected
                initContracts(drizzle, forceUpdate);

                if (drizzle && drizzle.web3 && drizzle.web3.currentProvider) {
                    drizzle.web3.currentProvider.on(
                        "accountsChanged",
                        (accounts) => {
                            // Time to reload your interface with accounts[0]!

                            resetStoreData();

                            setCurrentAddress(accounts[0]);

                            initDrizzleData(true);
                        }
                    );
                }
            }
        };

        initDrizzleData();
    }, [
        networkId,
        accountAddress,
        drizzle,
        shouldInitContracts,
        resetStoreData,
    ]);

    useEffect(() => {
        if (!currentAddress) setCurrentAddress(accountAddress); // TODO: After setting up the address in drizzle store this should be cleaned up
    }, [accountAddress, currentAddress]);

    const onConnect = async () => {
        const isSelectWallet = await onboard.walletSelect();
        if (isSelectWallet) {
            const readyToTransact = await onboard.walletCheck();
            dispatch(setWalletConnected(readyToTransact));

            if (!readyToTransact) {
                // TODO: if it is not ready -> show some warning
            }
        }
    };
    const onReset = async () => {
        onboard.walletReset();

        window.localStorage.removeItem("selectedWallet");

        dispatch(setWalletConnected(false));

        resetStoreData();
    };

    return (
        <AppBar
            title={title}
            onConnect={onConnect}
            onReset={onReset}
            accountAddress={currentAddress}
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
