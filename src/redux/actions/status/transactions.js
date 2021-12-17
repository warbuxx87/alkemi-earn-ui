// Section 1: Utilities imports and low level imports

import {
    handle_allocate_click,
    handle_moneymarket_tx,
    handle_withdraw_click,
    handle_repay_click,
    handle_borrow_click,
    handle_approve_click,
    handle_claim_ALK_click,
} from "utils/transactionsSender";

import constants from "constants/constant.json";
import { triggerToastDisplay } from "utils/notify";

// Section 2: Action types declarations and action creators
import { getProviderName } from "utils/web3Helpers";
import { setShowWalletConnectModal } from "redux/actions/status/walletConnect";

//                                            //
// --------- TRANSACTIONS ACTIONS ----------- //
//                                            //

export const TRANSACTION_TRIGGERED = "TRANSACTION_TRIGGERED";
export const transactionTriggered = (assetUnit, txData, type) => ({
    type: TRANSACTION_TRIGGERED,
    payload: {
        txData,
        assetUnit,
        type,
    },
});

// remove when drizzle is completly out
export const TRANSACTION_SENT = "TRANSACTION_SENT";
export const transactionSent = (stackId, txHash) => {
    return {
        type: TRANSACTION_SENT,
        payload: {
            stackId,
            txHash,
        },
    };
};

export const TRANSACTION_RESOLVED = "TRANSACTION_RESOLVED";
export const transactionResolved = (txHash) => ({
    type: TRANSACTION_RESOLVED,
    payload: {
        txHash,
    },
});

// No way of figuring out for sure if the tx has been canceled
export const TRANSACTION_CANCELED = "TRANSACTION_CANCELED";
export const transactionCanceled = (txHash) => ({
    type: TRANSACTION_CANCELED,
    payload: {
        txHash,
    },
});

// Section 3: Action dispatch methods and async funcs

const actionToCall = {
    deposit: handle_moneymarket_tx,
    allocate: handle_allocate_click,
    withdraw: handle_withdraw_click,
    repay: handle_repay_click,
    borrow: handle_borrow_click,
    approve: handle_approve_click,
    claim: handle_claim_ALK_click,
};

const realMethodNames = {
    deposit: "supply",
    allocate: "allocate",
    withdraw: "withdraw",
    repay: "repayBorrow",
    borrow: "borrow",
    approve: "approve",
    claim: "claim",
};

export const onTx =
    ({
        drizzle,
        userWalletNetwork,
        userWalletAddress,
        amount,
        asset,
        shouldSendMax,
        type,
        currentPool,
        library,
    }) =>
    async (dispatch) => {
        const amountToSend =
            shouldSendMax === true ? constants["max_uint"] : amount;

        const methodName = realMethodNames[type];
        // TODO: add wallet connect check to show modal

        const walletName = getProviderName(library.provider);

        if (walletName === "WalletConnect") {
            dispatch(setShowWalletConnectModal(true));
        }

        actionToCall[type]({
            drizzle,
            userWalletNetwork,
            userWalletAddress,
            amount: amountToSend,
            asset,
            shouldSendMax,
            currentPool,
            library,

            selectedMethod: methodName,
            handleETHCallsSeparately: ["supply", "repayBorrow"].includes(
                methodName
            ),
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
                    // For some reason this makes the function return or exit, keep last
                    transactionTriggered({
                        assetUnit: asset.unit,
                        txData,
                        type,
                    })
                );
            })
            .catch((error) => {
                // triggerToastDisplay({
                //     toastMessageVariant: "failure",
                //     displayMessage: "Something went wrong",
                //     displaySecondaryMessage: error.message,
                // });
            });
    };
