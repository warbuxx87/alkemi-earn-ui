import { useEffect, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import onboard from "utils/onboard";

import { initContracts, deleteAllContracts } from "utils/contracts";
import { resetLendData } from "redux/actions/data/lend";
import { resetBorrowData } from "redux/actions/data/borrow";
import { resetTxDataAndCancelFetch } from "redux/actions/data/tx";

import {
    setWalletConnected,
    setWalletAddress,
    setWalletNetwork,
} from "redux/actions/status/onboard";

import Web3 from "web3";

import {
    isWalletConnected,
    walletAddress,
    walletNetwork,
} from "redux/selectors/onboard";

import DrizzleContext from "containers/Drizzle/DrizzleContext";

export default () => {
    const dispatch = useDispatch();

    const drizzle = useContext(DrizzleContext);

    const walletConnected = useSelector(isWalletConnected);

    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    // get previous selected wallet
    useEffect(() => {
        const checkIfPreviouslySelectedWallet = async () => {
            const previouslySelectedWallet = window.localStorage.getItem(
                "selectedWallet"
            );

            if (
                previouslySelectedWallet !== undefined &&
                typeof previouslySelectedWallet === "string" && // comment these two conditions to show wallet selection on load/disconnect
                onboard
            ) {
                const isSelectWallet = await onboard.walletSelect(
                    previouslySelectedWallet
                );

                if (isSelectWallet) {
                    const readyToTransact = await onboard.walletCheck();

                    if (window.currentlyUsedProvider) {
                        // set current address from chosen provider in onboard
                        // For Metamask: selectedAddress
                        // For Fortmatic: account
                        dispatch(
                            setWalletAddress(
                                window.currentlyUsedProvider.selectedAddress ||
                                    window.currentlyUsedProvider.account
                            )
                        );

                        dispatch(
                            setWalletNetwork(
                                window.currentlyUsedProvider.networkVersion ||
                                    "4"
                            )
                        );
                    }

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
        dispatch(resetTxDataAndCancelFetch());
        // ADD more stores to reset if needs be
    }, [dispatch]);

    // When disconnected
    const onReset = useCallback(async () => {
        onboard.walletReset();

        window.localStorage.removeItem("selectedWallet");

        deleteAllContracts(drizzle);

        dispatch(setWalletConnected(false));

        dispatch(setWalletAddress(null));
        dispatch(
            setWalletNetwork("4") // TODO: Set default one for app env
        );

        resetStoreData();
    }, [dispatch, resetStoreData, drizzle]);

    useEffect(() => {
        const initDrizzleData = (forceUpdate = false) => {
            if (walletConnected === true) {
                if (drizzle && !forceUpdate) {
                    const web3 = new Web3(window.currentlyUsedProvider);

                    drizzle.web3 = web3; // best method found to update drizzle's web3, have to manually update contracts and clean up store and usage of network and account address

                    console.log("drizzle.web3 after web3: ", drizzle.web3);
                    console.log("------------------------------");
                }

                // account connected
                initContracts(
                    drizzle,
                    userWalletAddress,
                    userWalletNetwork,
                    forceUpdate
                );

                if (drizzle && drizzle.web3 && drizzle.web3.currentProvider) {
                    try {
                        drizzle.web3.currentProvider.removeAllListeners(
                            "accountsChanged"
                        );
                        drizzle.web3.currentProvider.removeAllListeners(
                            "chainChanged"
                        );

                        drizzle.web3.currentProvider.on(
                            "accountsChanged",
                            (accounts) => {
                                resetStoreData();

                                // Could be commented out in the current state as try/catch in contracts.js will catch it anyway
                                // (or the current clean up in contracts can be kept as it is)
                                deleteAllContracts(drizzle);

                                dispatch(setWalletAddress(accounts[0]));

                                initDrizzleData(true);
                            }
                        );

                        drizzle.web3.currentProvider.on(
                            "networkChanged",
                            (newNetworkId) => {
                                resetStoreData();

                                deleteAllContracts(drizzle);

                                dispatch(setWalletNetwork(newNetworkId || "4"));

                                initDrizzleData(true);
                            }
                        );
                    } catch (e) {
                        // Formatic doesn't subscribe to anything
                    }
                }
            }
        };

        initDrizzleData();
    }, [
        drizzle,
        walletConnected,
        userWalletAddress,
        walletNetwork,
        resetStoreData,
        dispatch,
    ]);

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

    return {
        onConnect,
        onReset,
    };
};
