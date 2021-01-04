// Section 1: React imports
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
} from "redux/selectors/data/onboard";

import DrizzleContext from "utils/DrizzleContext";

const DEFAULT_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;

export default () => {
    const dispatch = useDispatch();

    const drizzle = useContext(DrizzleContext);
    const currentState = onboard.getState();
    console.log("onboard currentstate", currentState);

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
                        // For Wallet Connect: accounts[0]

                        // The order matters here
                        // As the network is always set(with the default one at least), must set address last so anything else that rely on it being null (example fetchTx) fire only when the correct data is set
                        dispatch(setWalletNetwork(currentState.network));

                        dispatch(setWalletAddress(currentState.address));
                    }

                    dispatch(setWalletConnected(readyToTransact));

                    if (!readyToTransact) {
                        // TODO: if it is not ready -> show some warning
                    }
                }
            }
        };

        checkIfPreviouslySelectedWallet();
    }, [currentState.address, currentState.network, dispatch]);

    const resetStoreData = useCallback(() => {
        dispatch(resetLendData());
        dispatch(resetBorrowData());
        dispatch(resetTxDataAndCancelFetch());
        // ADD more stores to reset if needs be
    }, [dispatch]);

    const deleteCurrentData = useCallback(() => {
        deleteAllContracts(drizzle);

        dispatch(setWalletConnected(false));
        dispatch(setWalletAddress(null));

        dispatch(setWalletNetwork(DEFAULT_NETWORK));

        resetStoreData();

        try {
            drizzle.web3.currentProvider.removeAllListeners("accountsChanged");
            drizzle.web3.currentProvider.removeAllListeners("chainChanged");
        } catch (e) {
            // Formatic doesn't subscribe to anything
        }
    }, [dispatch, drizzle, resetStoreData]);

    // When disconnected
    const onReset = useCallback(async () => {
        onboard.walletReset();

        window.localStorage.removeItem("selectedWallet");

        deleteCurrentData();
        window.location.reload();
    }, [deleteCurrentData]);

    useEffect(() => {
        const initDrizzleData = (forceUpdate = false) => {
            if (walletConnected === true) {
                let currentWalletAddress = userWalletAddress;
                let currentWalletNetwork = userWalletNetwork;

                if (drizzle && !forceUpdate) {
                    const web3 = new Web3(window.currentlyUsedProvider);

                    drizzle.web3 = web3; // best method found to update drizzle's web3, have to manually update contracts and clean up store and usage of network and account address

                    // set it in sync vars as redux stores data async here it seems
                    currentWalletAddress = currentState.address;

                    currentWalletNetwork = currentState.network;

                    // The order matters here
                    dispatch(setWalletNetwork(currentWalletNetwork));
                    dispatch(setWalletAddress(currentWalletAddress));
                }

                // account connected
                initContracts(
                    drizzle,
                    currentWalletAddress,
                    currentWalletNetwork,
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
                                window.location.reload();

                                resetStoreData();
                                dispatch(setWalletAddress(accounts[0]));

                                // TODO: check the use of the following code, maybe use with other wallets
                                /*

                                // Could be commented out in the current state as try/catch in contracts.js will catch it anyway
                                // (or the current clean up in contracts can be kept as it is)
                                deleteAllContracts(drizzle);

                                dispatch(setWalletAddress(accounts[0]));

                                initDrizzleData(true);*/
                            }
                        );

                        drizzle.web3.currentProvider.on(
                            "chainChanged",
                            (_chainId) => {
                                window.location.reload();

                                // TODO: check the use of the following code, maybe use with other wallets
                                /*resetStoreData();

                                deleteAllContracts(drizzle);

                                dispatch(
                                    setWalletNetwork(
                                        _chainId
                                            ? _chainId
                                            : DEFAULT_NETWORK
                                    )
                                );

                                onboard.config({
                                    networkId: parseInt(_chainId, 10),
                                });

                                initDrizzleData(true);*/
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
        userWalletNetwork,
        resetStoreData,
        dispatch,
        currentState.address,
        currentState.network,
    ]);

    const onConnect = async () => {
        const isSelectWallet = await onboard.walletSelect();
        deleteCurrentData();
        if (isSelectWallet) {
            deleteCurrentData();

            const readyToTransact = await onboard.walletCheck();
            dispatch(setWalletNetwork(currentState.network));
            dispatch(setWalletAddress(currentState.address));

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
