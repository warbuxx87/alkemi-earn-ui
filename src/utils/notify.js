// 1. React/Redux low level imports
import React from "react";

// 2. Libraries imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LedgerHQFrame } from "utils/web3ReactConnectors";

import Notify from "components/UI/Notify";

// 3. constants imports
import constants from "constants/constant.json";

import {
    // TRANSACTION_TRIGGERED,
    TRANSACTION_RESOLVED,
    TRANSACTION_CANCELED,
} from "redux/actions/status/transactions";

import { getTransactions } from "redux/selectors/status/transactions";

const eventToDisplayMessage = {
    supply: "Deposit Received",
    borrow: "Borrow Taken",
    withdraw: "Deposit Withdrawn",
    repayBorrow: "Borrow Repaid",

    allocateTo: "Tokens Minted",
    approve: "Asset Authorized",

    claimAlk: "Claimed ALK tokens",
    liquidate: "Borrow Liquidated",
};

// could add a tracker for already notified txs here

const contractTXNotifier = (store) => (next) => (action) => {
    if (!action) next(action); // could be replaced with a simple return since we don't really have an action

    if (
        action &&
        // action.type === TRANSACTION_TRIGGERED ||
        (action.type === TRANSACTION_RESOLVED ||
            action.type === TRANSACTION_CANCELED)
    ) {
        let displayMessage;
        let displaySecondaryMessage;
        let toastMessageVariant;

        // This means it's been mined on the network
        if (action && action.type === TRANSACTION_RESOLVED) {
            toastMessageVariant = "success";
            displayMessage = "Transaction Successful";

            const txs = getTransactions(store.getState());

            const tx = txs[action.payload.txHash];

            // hash for liquidations might be broken userWalletName|type
            if (tx) displaySecondaryMessage = eventToDisplayMessage[tx.type];
        } else if (action && action.type === TRANSACTION_CANCELED) {
            toastMessageVariant = "failure";
            displayMessage = "Transaction failed";
            displaySecondaryMessage = "Transaction was cancelled";
        }

        const currentNetworkName =
            constants.network_type[
                store.getState().status.onboard.walletNetwork
            ];

        if (toastMessageVariant !== undefined)
            triggerToastDisplay({
                toastMessageVariant,
                displayMessage,
                displaySecondaryMessage,
                txHash: action.payload.realTx
                    ? action.payload.realTx
                    : action.payload.txHash, // for wallet connect
                currentNetworkName,
            });
    }

    return next(action);
};

// display notification / show toast
export const triggerToastDisplay = ({
    toastMessageVariant,
    displayMessage,
    displaySecondaryMessage,
    txHash,
    currentNetworkName,
}) => {
    const options = {
        position: "top-right",
        // Automatically Close Notification after 15 seconds
        autoClose: 10000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        hideProgressBar: true,
        closeButton: false,
    };

    const display = (
        <Notify
            variant={toastMessageVariant}
            message={displayMessage}
            secondaryMessage={displaySecondaryMessage}
            txHash={txHash}
            currentNetworkName={currentNetworkName}
        />
    );

    // Uncomment if we want to dismiss older toasts
    // toast.dismiss();

    toast(display, options);
};

export default contractTXNotifier;
