// 1. React/Redux low level imports
import React from "react";

// 2. Libraries imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Notify from "components/UI/Notify";

// 3. constants imports
import errorMessage from "constants/error_code";
import constants from "constants/constant.json";

const contractTXNotifier = (store) => (next) => (action) => {
    if (!action) next(action); // could be replaced with a simple return since we don't really have an action

    const actionTypeConfirmation = "TX_CONFIRMATION";
    const actionTypeSend = "TX_BROADCASTED";
    const actionTypeSuccess = "TX_SUCCESSFUL";
    const actionTypeError = "TX_ERROR";

    if (
        action.type === actionTypeSend ||
        action.type === actionTypeSuccess ||
        action.type === actionTypeError ||
        action.type === actionTypeConfirmation
    ) {
        let displayMessage;
        let displaySecondaryMessage;
        let toastMessageVariant;
        let errorCode;
        // the transaction is still processing
        if (action.type === actionTypeSend) {
            toastMessageVariant = "processing";
            displayMessage = "Transaction pending...";
            displaySecondaryMessage = "This might take a few minutes";
            //console.log("Tx Send event fired", displayMessage);
        }
        // This means it's been mined on the network
        if (action.type === actionTypeSuccess) {
            // console.log("Tx Success event fired", displayMessage);

            //console.log("Tx Receipt Object", action.receipt);
            toastMessageVariant = "success";
            displaySecondaryMessage = "Transaction Successful";

            if (action.receipt.events.Approval) {
                displayMessage = "Asset Authorized";
            }

            if (action.receipt.events.SupplyReceived) {
                displayMessage = "Supply Received";
            }

            if (action.receipt.events.BorrowTaken) {
                displayMessage = "Borrow Taken";
            }

            if (action.receipt.events.BorrowRepaid) {
                displayMessage = "Borrow Repaid";
            }

            if (action.receipt.events.BorrowLiquidated) {
                displayMessage = "Borrow Liquidated";
            }

            if (action.receipt.events.SupplyWithdrawn) {
                displayMessage = "Supply Withdrawn";
            }

            if (action.receipt.events.Transfer) {
                displayMessage = "Tokens Minted";
            }
            // Contract can still fail even if transaction was Successful
            // If Failure event detected in receipt object then return transaction failed rather than Successful to user
            // Error code is in txReceipt.Failure.returnValues.error
            // We then use this code to identify error message returned to user from constants/error_codes
            if (action.receipt.events.Failure) {
                errorCode = action.receipt.events.Failure.returnValues.error;
                toastMessageVariant = "failure";
                displayMessage = errorMessage[errorCode];
                displaySecondaryMessage = "Transaction Failed";
            }
        }

        if (action.type === actionTypeError) {
            toastMessageVariant = "failure";
            displayMessage = "Transaction failed";
            displaySecondaryMessage = "Transaction was cancelled";
            //console.log("Tx Error event fired", displayMessage);
        }

        const currentNetworkName =
            constants.network_type[
                store.getState().status.onboard.walletNetwork
            ];

        // Ghost notification triggered, TODO: check the source of it
        if (toastMessageVariant !== undefined)
            triggerToastDisplay({
                toastMessageVariant,
                displayMessage,
                displaySecondaryMessage,
                txHash: action.txHash,
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
        closeButton: true,
        position: "top-right",
        // Automatically Close Notification after 15 seconds
        autoClose: 97500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
