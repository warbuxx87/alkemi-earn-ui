// Section 1: React imports
import { useEffect, useState, useCallback, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useWeb3React } from "@web3-react/core";
import { ConnectorEvent } from "@web3-react/types";

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

import { getPool } from "redux/selectors/status/pool";
import { getSelectedWallet } from "redux/selectors/status/walletSelect";

import DrizzleContext from "utils/DrizzleContext";

import address from "constants/address_map.json";
import constants from "constants/constant.json";

const DEFAULT_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;

const connectorsByName = {
    MetaMask: injected,
    WalletConnect: walletconnect,
};

const useWalletSelect = () => {
    // web3-react
    const {
        connector,
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
    } = useWeb3React();

    // redux
    const dispatch = useDispatch();

    // selectors
    const currentPool = useSelector(getPool);
    const selectedWallet = useSelector(getSelectedWallet);

    // state
    const [providerInitialized, setProviderInitialized] = useState(false);

    // track active state
    const prevActiveRef = useRef();

    useEffect(() => {
        prevActiveRef.current = active;
    });
    const prevActive = prevActiveRef.current;

    // drizzle
    const drizzle = useContext(DrizzleContext);

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

            // drizzle = new Drizzle(drizzleOptions, store); // dirty

            // drizzle.web3 = new Web3(); // Buggy
        } catch (e) {
            // Formatic doesn't subscribe to anything
        }
    }, [dispatch, drizzle, resetStoreData]);

    const onReset = useCallback(async () => {
        deactivate();

        window.localStorage.removeItem("selectedWallet");

        deleteCurrentData();

        window.location.reload();
    }, [deactivate, deleteCurrentData]);

    const handleUpdate = useCallback(
        async (update) => {
            if (!connector) {
                return;
            }

            if (update.chainId || update.account) onReset();
            // TODO react to type of update, example: {account: '0xnewWalletAddress'}
        },
        [connector, onReset]
    );

    const handleError = useCallback(async (error) => {
        if (!error) {
            return;
        }

        console.error("web3-react error: ", error);
    }, []);

    const handleDeactivate = useCallback(() => {
        onReset(); // might create recursiveness if there is no window.reload
    }, [onReset]);

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
    }, [connector, handleDeactivate, handleError, handleUpdate]);

    useEffect(() => {
        const initDrizzleData = (
            active,
            library,
            providerInitialized,
            forceUpdate = false
        ) => {
            if (
                active === true &&
                providerInitialized === false &&
                library.provider
            ) {
                // Could consider turning this into some sort of mutex

                // console.log('library.provider: ', library.provider);

                setProviderInitialized(true);

                // address network
                let currentWalletAddress = account;
                let currentWalletNetwork = chainId.toString();
                if (!currentWalletAddress && !currentWalletNetwork) return;
                // console.log('currentWalletNetwork: ', currentWalletNetwork);
                // console.log('currentWalletAddress: ', currentWalletAddress);

                window.currentlyUsedProvider = library.provider;

                const web3 = new Web3(library.provider);

                drizzle.web3 = web3; // best method found to update drizzle's web3, have to manually update contracts and clean up store and usage of network and account address

                // The order matters here
                dispatch(setWalletNetwork(currentWalletNetwork));
                dispatch(setWalletAddress(currentWalletAddress));

                // Init drizzle contracts set up
                const network = constants.network_type[currentWalletNetwork];
                const address_MoneyMarket =
                    currentPool === "open"
                        ? address[network].address_open_MoneyMarket
                        : address[network].address_MoneyMarket;

                // account connected
                initContracts({
                    drizzle,
                    userWalletAddress: currentWalletAddress,
                    userWalletNetwork: currentWalletNetwork,

                    forceUpdate,
                    address_MoneyMarket,
                    currentPool,
                });
            }
        };

        if (active && prevActive === false) {
            // only initDrizzleData when provider/web3-react wasn't active before because providerInitialized is not tracked fast enough
            dispatch(setActivatedWallet());
            dispatch(setWalletConnected(true));

            if (providerInitialized === false) {
                // could be optional
                initDrizzleData(active, library, providerInitialized, false);
            }
        }
    }, [
        providerInitialized,
        active,
        library,
        account,
        chainId,
        currentPool,
        dispatch,
        drizzle,
        prevActive,
    ]);

    // useEffect(() => {
    //     // console.log( "useEffect chainId: ", chainId);
    // }, [chainId]);

    // useEffect(() => {
    //     // console.log("useEffect account: ", account);
    //     // TODO: Might want to dispatch(setWalletAddress(currentWalletAddress)); here
    // }, [account]);

    // useEffect(() => {
    //     // console.log("useEffect library: ", library);
    // }, [library]);

    useEffect(() => {
        if (selectedWallet && connectorsByName[selectedWallet] && !active) {
            activate(connectorsByName[selectedWallet]);
        }
    }, [selectedWallet, active, activate]); // TODO: see why this is called many times, and if it should be changed

    const onConnect = async () => {
        dispatch(setShowWalletModal(true));
    };

    return {
        onConnect,
        onReset,
        library,
    };
};

export default useWalletSelect;
