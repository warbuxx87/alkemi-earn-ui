// 1. React/Redux low level imports
import React from "react";
import thunk from "redux-thunk";

// 2. Libraries imports
import { generateStore } from "@drizzle/store";
import { toast } from "react-toastify";
import { ToastMessage } from "rimble-ui";
import "react-toastify/dist/ReactToastify.css";

// 3. internal imports
import appReducers from "redux/reducers";
import errorMessage from "constants/error_code";
import MoneyMarket from "contracts/MoneyMarket.json";

const contractTXNotifier = (store) => (next) => (action) => {
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
        let toastIcon;
        // the transaction is still processing
        if (action.type === actionTypeSend) {
            toastMessageVariant = "processing";
            toastIcon = "InfoOutline";
            displayMessage = "Transaction pending...";
            displaySecondaryMessage = "This might take a few minutes";
            //console.log("Tx Send event fired", displayMessage);
        }
        // This means it's been mined on the network
        if (action.type === actionTypeSuccess) {
            // console.log("Tx Success event fired", displayMessage);

            //console.log("Tx Receipt Object", action.receipt);
            toastMessageVariant = "success";
            toastIcon = "CloudDone";
            displaySecondaryMessage = "Transaction Successful";

            /// TODO: this needs to be cleaned up with either a switch function. Or we need to create a function that selects the 2nd item within the action.receipt object.
            if (action.receipt.events.SupplyReceived) {
                displayMessage = "Supply Received";
            }

            if (action.receipt.events.BorrowTaken) {
                displayMessage = "Borrow Taken";
            }

            if (action.receipt.events.BorrowRepaid) {
                displayMessage = "Borrow Repaid";
            }

            if (action.receipt.events.SupplyWithdrawn) {
                displayMessage = "Supply Withdrawn";
            }
            // Contract can still fail even if transaction was Successful
            // If Failure event detected in receipt object then return transaction failed rather than Successful to user
            // Error code is in txReceipt.Failure.returnValues.error
            // We then use this code to identify error message returned to user from constants/error_codes
            if (action.receipt.events.Failure) {
                errorCode = action.receipt.events.Failure.returnValues.error;
                toastMessageVariant = "failure";
                toastIcon = "ErrorOutline";
                displayMessage = errorMessage[errorCode];
                displaySecondaryMessage = "Transaction Failed";
            }
        }

        if (action.type === actionTypeError) {
            toastIcon = "ErrorOutline";
            toastMessageVariant = "failure";
            displayMessage = "Transaction failed";
            displaySecondaryMessage = "The Failure Message Would Go Here";
            //console.log("Tx Error event fired", displayMessage);
        }

        const options = {
            closeButton: true,
            position: "top-center",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        };

        const display = (
            <ToastMessage
                colorTheme={"light"}
                my={3}
                icon={toastIcon}
                variant={toastMessageVariant}
                message={displayMessage}
                secondaryMessage={displaySecondaryMessage}
            />
        );

        toast(display, options);
        //
        // toast.onChange((numberOfToastDisplayed) => {
        //     toast.dismiss();
        // });
    }

    ///

    return next(action);
};

const appMiddlewares = [thunk, contractTXNotifier];

export const drizzleOptions = {
    drizzleOptions: {
        contracts: [MoneyMarket],
        events: {
            MoneyMarket: [
                "SupplyReceived",
                "SupplyWithdrawn",
                "BorrowTaken",
                "BorrowRepaid",
                "Failure",
            ],
        },
        web3: {
            customProvider: window.currentlyUsedProvider,
        },
    },
    polls: {
        blocks: 6000,
    },
    syncAlways: false,
    appMiddlewares,
    appReducers,
    disableReduxDevTools: false, // enable ReduxDevTools!
    networkWhitelist: [
        // Allows the listed networks, plus Ganache
        //    1, // Mainnet
        //    3, // Ropsten
        4, // Rinkeby
        //      5, // Goerli
        //      42, // Kovan
    ],
};

const store = generateStore(drizzleOptions);
export default store;
