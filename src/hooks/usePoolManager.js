// Contracts address manager, manage selection between open and permissioned pools

// Section 1: React/Redux low level imports
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports
import { getPool } from "redux/selectors/status/pool";

import { walletNetworkName } from "redux/selectors/data/onboard";

import { SET_POOL } from "redux/actions/status/pool";

const useProtocolManager = () => {
    const dispatch = useDispatch();

    const currentPool = useSelector(getPool);
    const currentNetworkName = useSelector(walletNetworkName);

    // On start
    useEffect(() => {
        const previouslySelectedPool = window.localStorage.getItem(
            "selectedPool"
        );

        if (
            previouslySelectedPool !== undefined &&
            typeof previouslySelectedPool === "string"
        ) {
            dispatch(SET_POOL(previouslySelectedPool));
        } else {
        }
    }, []);

    return {
        getPoolAddresses,
    };
};

export default useProtocolManager;
