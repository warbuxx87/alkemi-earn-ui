// Section 1: React imports
import { useEffect, useState, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useWeb3React } from "@web3-react/core";
import { ConnectorUpdate, ConnectorEvent } from "@web3-react/types";

import { Drizzle } from "@drizzle/store"; // dirty

// Section 2: Internal imports

import { injected, walletconnect } from "utils/web3ReactConnectors";

import { initContracts, deleteAllContracts } from "utils/contracts";
import { resetLendData, cancelFetchInterest } from "redux/actions/data/lend";
import { resetBorrowData } from "redux/actions/data/borrow";
import { resetTxDataAndCancelFetch } from "redux/actions/data/tx";

import {
    setWalletConnected,
    setWalletAddress,
    setWalletNetwork,
    setWalletBalance,
} from "redux/actions/status/onboard";

import { setEthLendBalance } from "redux/actions/data/lend";
import { setEthBorrowBalance } from "redux/actions/data/borrow";
import {
    setShowWalletModal,
    setActivatedWallet,
} from "redux/actions/status/walletSelect";

import Web3 from "web3";

import { isWalletConnected, walletBalance } from "redux/selectors/data/onboard";
import { getPool } from "redux/selectors/status/pool";
import { getSelectedWallet } from "redux/selectors/status/walletSelect";

import DrizzleContext from "utils/DrizzleContext";

import address from "constants/address_map.json";
import constants from "constants/constant.json";

import store, { drizzleOptions } from "containers/Drizzle/drizzleStore.js"; // dirty

const DEFAULT_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;

const connectorsByName = {
    MetaMask: injected,
    WalletConnect: walletconnect,
};

const useOnboard = () => {
    // web3-react
    const {
        connector,
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
        error,
    } = useWeb3React();

    // redux
    const dispatch = useDispatch();

    // selectors
    const walletConnected = useSelector(isWalletConnected);
    const currentPool = useSelector(getPool);
    const selectedWallet = useSelector(getSelectedWallet);

    // state
    const [wallet, setWallet] = useState({});
    const [onboard, setOnboard] = useState(null);

    const [providerInitialized, setProviderInitialized] = useState(false);

    // drizzle
    const drizzle = useContext(DrizzleContext);

    const handleUpdate = useCallback(
        async (update) => {
            if (!connector) {
                return;
            }

            console.log("update: ", update);
            // TODO update wallet
        },
        [connector, error]
    );

    const handleError = useCallback(
        async (error) => {
            if (!error) {
                return;
            }

            console.log("error: ", error);
            // TODO setState error
        },
        [connector]
    );

    const handleDeactivate = useCallback(() => {
        // TODO handle disconnect
        console.log("handle desactivate");
    }, []);

    useEffect(() => {
        if (connector) {
            connector
                .on(ConnectorEvent.Update, handleUpdate)
                .on(ConnectorEvent.Error, handleError)
                .on(ConnectorEvent.Deactivate, handleDeactivate);
        }

        return () => {
            if (connector) {
                connector
                    .off(ConnectorEvent.Update, handleUpdate)
                    .off(ConnectorEvent.Error, handleError)
                    .off(ConnectorEvent.Deactivate, handleDeactivate);
            }
        };
    }, [connector]);

    useEffect(() => {
        dispatch(setActivatedWallet());
        // TODO: connect drizzle
    }, [active]);

    useEffect(() => {
        console.log("useEffect chainId: ", chainId);
    }, [chainId]);

    useEffect(() => {
        console.log("useEffect account: ", account);
    }, [account]);

    useEffect(() => {
        console.log("useEffect library: ", library);
    }, [library]);

    // const initDrizzleData = (forceUpdate = false) => {
    //     if (
    //         walletConnected === true
    //         && providerInitialized === false
    //         && wallet.name !== undefined
    //         && wallet.provider) { // Could consider turning this into some sort of mutex

    //         const currentState = onboard.getState();
    //         console.log('****currentState: ', currentState);
    //         console.log('wallet: ', wallet);

    //         // address network
    //         let currentWalletAddress = currentState.address;
    //         let currentWalletNetwork = currentState.network;
    //         if (!currentWalletAddress && !currentWalletNetwork) return

    //         activate(connectorsByName[wallet.name]) // async call to connect web3-react to to the provider, TODO: Test with wallet connect

    //         switch (wallet.name) {
    //             // case "Fortmatic": {
    //             //     window.currentlyUsedProvider =
    //             //         wallet.instance.getProvider(); // TODO: Re-test again when bringing back formatic
    //             //     break;
    //             // }
    //             default:
    //                 window.currentlyUsedProvider = wallet.provider;
    //         }

    //         // Init drizzle
    //         if (drizzle && !forceUpdate) {
    //             const web3 = new Web3(wallet.provider);

    //             drizzle.web3 = web3; // best method found to update drizzle's web3, have to manually update contracts and clean up store and usage of network and account address

    //             // The order matters here
    //             dispatch(setWalletNetwork(currentWalletNetwork));
    //             dispatch(setWalletAddress(currentWalletAddress));
    //         }
    //         // Init drizzle contracts set up
    //         const network = constants.network_type[currentWalletNetwork];
    //         const address_MoneyMarket =
    //             currentPool === "open"
    //                 ? address[network].address_open_MoneyMarket
    //                 : address[network].address_MoneyMarket;

    //         // account connected
    //         initContracts({
    //             drizzle,
    //             userWalletAddress: currentWalletAddress,
    //             userWalletNetwork: currentWalletNetwork,

    //             forceUpdate,
    //             address_MoneyMarket,
    //             currentPool,
    //         });

    //         setProviderInitialized(true)
    //     }
    // };

    // useEffect(() => {
    //     initDrizzleData();
    // }, [ // TODO: Decide on what to include here for useEffect reloading
    //     walletConnected,
    //     onboard
    // ]);

    const resetStoreData = useCallback(() => {
        dispatch(resetLendData());
        dispatch(resetBorrowData());
        dispatch(resetTxDataAndCancelFetch(dispatch));
        dispatch(cancelFetchInterest());
        // ADD more stores to reset if needs be
    }, [dispatch]);

    const deleteCurrentData = useCallback(() => {
        deleteAllContracts(drizzle);

        dispatch(setWalletConnected(false));
        dispatch(setWalletAddress(null));
        dispatch(setWalletBalance(0));
        dispatch(setEthLendBalance(0));
        dispatch(setEthBorrowBalance(0));
        dispatch(setWalletNetwork(DEFAULT_NETWORK));

        resetStoreData();

        try {
            drizzle.web3.currentProvider.removeAllListeners("accountsChanged");
            drizzle.web3.currentProvider.removeAllListeners("chainChanged");
            drizzle.contractList = [];
            drizzle.contracts = {};

            drizzle = new Drizzle(drizzleOptions, store); // dirty

            drizzle.web3 = new Web3(); // Buggy
        } catch (e) {
            // Formatic doesn't subscribe to anything
        }
    }, [dispatch, drizzle, resetStoreData]);

    const onReset = useCallback(async () => {
        // TODO: disconnect
    }, [onboard]);

    useEffect(() => {
        console.log("---> From onboard selectedWallet: ", selectedWallet);

        activate(connectorsByName[selectedWallet]);
    }, [selectedWallet]);

    const onConnect = async () => {
        dispatch(setShowWalletModal(true));
    };

    return {
        onConnect,
        onReset,
        library,
    };
};

export default useOnboard;
