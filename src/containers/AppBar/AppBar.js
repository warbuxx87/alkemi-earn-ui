// Main Container

// Section 1: React low level imports
import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { useLocation } from "react-router-dom";

import onboard from "utils/onboard";
import { initContracts, deleteAllContracts } from "utils/contracts";
import withDrizzle from "containers/Drizzle/withDrizzle";

import { setWalletConnected } from "redux/actions/status/onboard";

import { isWalletConnected } from "redux/selectors/onboard";

import { resetLendData } from "redux/actions/data/lend";
import { resetBorrowData } from "redux/actions/data/borrow";

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
    const walletConnected = useSelector(isWalletConnected);

    const [currentAddress, setCurrentAddress] = useState(accountAddress); // using an address because drizzle doesn't update account address on change
    const [currentNetwork, setCurrentNetwork] = useState(accountAddress); // using a network ID because drizzle doesn't update network on change

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
        dispatch(resetBorrowData());
        // ADD more stores to reset if needs be
    }, [dispatch]);

    const onReset = useCallback(async () => {
        onboard.walletReset();

        window.localStorage.removeItem("selectedWallet");

        deleteAllContracts(drizzle);

        dispatch(setWalletConnected(false));

        setCurrentAddress(null);
        setCurrentNetwork(null);

        resetStoreData();
    }, [dispatch, resetStoreData, drizzle]);

    useEffect(() => {
        const initDrizzleData = (forceUpdate = false) => {
            if (networkId && accountAddress && walletConnected === true) {
                if (drizzle && !forceUpdate) {
                    drizzle.web3 = new Web3(window.currentlyUsedProvider); // best method found to update drizzle's web3, have to manually update contracts and clean up store and usage of network and account address
                }

                // account connected
                initContracts(drizzle, forceUpdate);

                if (drizzle && drizzle.web3 && drizzle.web3.currentProvider) {
                    drizzle.web3.currentProvider.on(
                        "accountsChanged",
                        (accounts) => {
                            resetStoreData();

                            //deleteAllContracts(drizzle)

                            setCurrentAddress(accounts[0]);

                            initDrizzleData(true);
                        }
                    );

                    drizzle.web3.currentProvider.on(
                        "networkChanged",
                        (newNetworkId) => {
                            console.log("networkChanged: ", newNetworkId);

                            /*resetStoreData();

                        //deleteAllContracts(drizzle)

                        setCurrentNetwork(newNetworkId);                        

                        initDrizzleData(true);*/
                        }
                    );
                }
            }
        };

        initDrizzleData();
    }, [networkId, accountAddress, drizzle, walletConnected, resetStoreData]);

    useEffect(() => {
        if (!currentAddress) setCurrentAddress(accountAddress);
    }, [accountAddress, currentAddress]);

    useEffect(() => {
        if (!currentNetwork) setCurrentNetwork(networkId);
    }, [networkId, currentNetwork]);

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

    return (
        <AppBar
            title={title}
            onConnect={onConnect}
            onReset={onReset}
            accountAddress={walletConnected ? currentAddress : null}
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
