// Section 1: Utilities imports and low level imports

import _ from "lodash";

import { transactionTriggered } from "redux/actions/status/transactions";

import { handle_liquidate_click } from "utils/transactionsSender";
import { triggerToastDisplay } from "utils/notify";

import { getProviderName } from "utils/web3Helpers";
import { setShowWalletConnectModal } from "redux/actions/status/walletConnect";

const url_map = require("constants/url_map.json");

// Section 2: Action types declarations and action creators

//                                      //
// ------- LIQUIDATIONS ACTIONS ------- //
//                                      //

// Liquidation data (ones that populate the table + drawer)

// Declare action type as a constant
export const FETCH_LIQUIDATIONS_PENDING = "FETCH_LIQUIDATIONS_PENDING";

// Declare action creator
const fetchLiquidationsPending = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LIQUIDATIONS_PENDING,
});

// Declare action type as a constant
export const FETCH_LIQUIDATIONS_SUCCESS = "FETCH_LIQUIDATIONS_SUCCESS";

// Declare action creator
const fetchLiquidationsSuccess = (liquidations) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LIQUIDATIONS_SUCCESS,
    payload: {
        liquidations,
    },
});

// Declare action type as a constant
export const FETCH_LIQUIDATIONS_ERROR = "FETCH_LIQUIDATIONS_ERROR";

// Declare action creator
const fetchLiquidationsError = (error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LIQUIDATIONS_ERROR,
    payload: new Error(),
    error: true,
});

//                                               //
// ------- LIQUIDATIONS METHOD ACTIONS --------  //
//                                               //

const fetchLiquidationsCall = ({
    currentNetworkName,
    currentPool,
    dispatch,
}) => {
    if (
        !url_map[currentNetworkName][currentPool] ||
        !url_map[currentNetworkName][currentPool].liquidations_url
    )
        return;

    dispatch(fetchLiquidationsPending());

    const url = `${url_map[currentNetworkName][currentPool].liquidations_url}`;
    fetch(url)
        .then((res) => {
            return res.text();
        })
        .then((data) => {
            if (data) {
                const obj_data = JSON.parse(data);

                const validEntries = obj_data.filter((liquidation) => {
                    return (
                        liquidation.borrow !== undefined &&
                        Array.isArray(liquidation.borrow) &&
                        liquidation.borrow.length > 0 &&
                        liquidation.supply !== undefined &&
                        Array.isArray(liquidation.supply) &&
                        liquidation.supply.length > 0
                    );
                });

                dispatch(fetchLiquidationsSuccess(validEntries));
            }
        })
        .catch((error) => {
            dispatch(fetchLiquidationsError(error.message));
        });
};

// This call may be fetched from multiple containers but only executes once every 15 seconds
const throttledFetchLiquidations = _.throttle(
    fetchLiquidationsCall,
    15 * 1000,
    {
        trailing: false,
    }
);

// Section 3: Action dispatch methods and async funcs

export const fetchLiquidations =
    ({ currentNetworkName, currentPool, forceRefresh }) =>
    async (dispatch) => {
        if (forceRefresh) {
            fetchLiquidationsCall({
                currentNetworkName,
                currentPool,
                dispatch,
            });
        } else {
            throttledFetchLiquidations({
                currentNetworkName,
                currentPool,
                dispatch,
            });
        }
    };

// TODO: to be merged in transactions (when the other drawers are refactored in UI-359)
export const onLiquidateAction =
    ({
        library,
        userWalletNetwork,
        userWalletAddress,
        symbol,
        amount,
        assetCollateral,
        assetBorrow,
        targetAccount,
        type,
        liquidationId,
        maxAmount,
        currentPool,
    }) =>
    async (dispatch) => {
        const walletName = getProviderName(library.provider);

        if (walletName === "WalletConnect") {
            dispatch(setShowWalletConnectModal(true));
        }

        handle_liquidate_click({
            library,
            userWalletNetwork,
            userWalletAddress,
            symbol,
            amount,
            assetCollateral,
            assetBorrow,
            targetAccount,
            maxAmount,
            userWalletName: walletName,
            currentPool,
        })
            .then((txData) => {
                if (walletName === "WalletConnect") {
                    dispatch(setShowWalletConnectModal(false));
                }

                triggerToastDisplay({
                    toastMessageVariant: "processing",
                    displayMessage: "Transaction pending...",
                    displaySecondaryMessage: "This might take a few minutes",
                });

                dispatch(
                    transactionTriggered({
                        alternativeId: liquidationId,
                        txData,
                        type,
                    })
                );
            })
            .catch((error) => {
                triggerToastDisplay({
                    toastMessageVariant: "failure",
                    displayMessage: "Something went wrong",
                    displaySecondaryMessage: error.message,
                });
            });
    };
