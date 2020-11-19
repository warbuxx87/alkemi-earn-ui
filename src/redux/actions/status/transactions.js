// Section 1: Utilities imports and low level imports

import {
    handle_allocate_click,
    handle_deposit_click,
    handle_withdraw_click,
    handle_repay_click,
    handle_borrow_click,
} from "utils/drizzle";

import constants from "constants/constant.json";
import { triggerToastDisplay } from "utils/notify";

// Section 2: Action types declarations and action creators

//                                            //
// --------- TRANSACTIONS ACTIONS ----------- //
//                                            //

export const TRANSACTION_TRIGGERED = "TRANSACTION_TRIGGERED";
export const transactionTriggered = (asset, stackId, type) => ({
    type: TRANSACTION_TRIGGERED,
    payload: {
        stackId,
        asset,
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
export const transactionResolved = (txHash) => ({
    type: TRANSACTION_RESOLVED,
    payload: {
        txHash,
    },
});

// No way of figuring out for sure if the tx has been rejected

// Section 3: Action dispatch methods and async funcs

const actionToCall = {
    deposit: handle_deposit_click,
    allocate: handle_allocate_click,
    withdraw: handle_withdraw_click,
    repay: handle_repay_click,
    borrow: handle_borrow_click,
};

export const onTx = ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
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
        amount: amountToSend,
        asset,
        shouldSendMax,
    })
        .then((stackId) => {
            dispatch(transactionTriggered(asset.unit, stackId, type));
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
