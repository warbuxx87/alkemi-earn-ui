// Section 1: Utilities imports and low level imports

import {
    handle_allocate_click,
    handle_deposit_click,
    handle_withdraw_click,
    handle_repay_click,
    handle_borrow_click,
    handle_approve_click,
    handle_moneymarket_tx,
} from "utils/drizzle";

import constants from "constants/constant.json";
import { triggerToastDisplay } from "utils/notify";

// Section 2: Action types declarations and action creators

//                                            //
// --------- TRANSACTIONS ACTIONS ----------- //
//                                            //

export const TRANSACTION_TRIGGERED = "TRANSACTION_TRIGGERED";
export const transactionTriggered = ({ assetUnit, txData, type }) => ({
    type: TRANSACTION_TRIGGERED,
    payload: {
        txData,
        assetUnit,
        type,
    },
});

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
export const transactionResolved = ({ txHash, assetUnit, type }) => ({
    type: TRANSACTION_RESOLVED,
    payload: {
        txHash,
        assetUnit,
        type,
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
    supply: handle_moneymarket_tx, // Deposit Tokens to Lending Pool
    borrow: handle_moneymarket_tx,

    allocate: handle_allocate_click,
    withdraw: handle_withdraw_click,
    repay: handle_repay_click,
    approve: handle_approve_click,
};

export const onTx = ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    userWalletName,
    amount,
    asset,
    shouldSendMax,
    type,
}) => async (dispatch) => {
    const amountToSend =
        shouldSendMax === true ? constants["max_uint"] : amount;

    actionToCall[type]({
        drizzle,
        userWalletNetwork,
        userWalletAddress,
        userWalletName,
        amount: amountToSend,
        asset,
        shouldSendMax,
        handleETHCallsSeparately: type.includes["supply"], // todo make generic
        selectedMethod: type,
    })
        .then((txData) => {
            dispatch(
                transactionTriggered({ assetUnit: asset.unit, txData, type })
            );

            triggerToastDisplay({
                toastMessageVariant: "processing",
                displayMessage: "Transaction pending...",
                displaySecondaryMessage: "This might take a few minutes",
            });
        })
        .catch((error) => {
            triggerToastDisplay({
                toastMessageVariant: "failure",
                displayMessage: "Something went wrong",
                displaySecondaryMessage: error.message,
            });
            //dispatch(depositError(asset.unit, error.message));
        });
};
