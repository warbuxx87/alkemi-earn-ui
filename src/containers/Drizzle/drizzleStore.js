// 1. React/Redux low level imports
import React from "react";
import thunk from "redux-thunk";

// 2. Libraries imports
import Web3 from "web3";
import { EventActions, generateStore } from "@drizzle/store";
import { toast } from "react-toastify";
import { ToastMessage } from "rimble-ui";

// 3. internal imports
import appReducers from "redux/reducers";
//import address from "constants/address_map";
import MoneyMarket from "contracts/MoneyMarket.json";
//
// {
//   contractName: 'MoneyMarket',
//   web3Contract: new web3.eth.Contract(mMarket_ABI, address, {data: 'deployedBytecode' }) // An instance of a Web3 contract
// }

const contractEventNotifier = (store) => (next) => (action) => {
    const actionTypeSend = "TX_BROADCASTED";
    const actionTypeSuccess = "TX_SUCCESSFUL";
    const actionTypeError = "TX_ERROR";

    if (
        action.type === actionTypeSend ||
        action.type === actionTypeSuccess ||
        action.type === actionTypeError ||
        action.type === EventActions.EVENT_FIRED
    ) {
        let displayMessage;
        let displaySecondaryMessage;
        let toastMessageVariant;
        let contractEvent;
        let toastIcon;

        if (action.type === actionTypeSend) {
            toastMessageVariant = "processing";
            toastIcon = "InfoOutline";
            displayMessage = "Transaction pending...";
            displaySecondaryMessage = "This might take a few minutes";
            console.log("Tx Send event fired", displayMessage);
        }
        if (action.type === actionTypeSuccess) {
            toastMessageVariant = "default";
            toastIcon = "CheckBox";
            displayMessage = "Transaction confirmed";
            displaySecondaryMessage = "Thanks for using our dapp";
            console.log("Tx Success event fired", displayMessage);
        }
        if (action.type === actionTypeError) {
            toastIcon = "ErrorOutline";
            toastMessageVariant = "failure";
            displayMessage = "Transaction failed";
            displaySecondaryMessage = "Better luck next time";
            console.log("Tx Error event fired", displayMessage);
        }
        if (action.type === EventActions.EVENT_FIRED) {
            contractEvent = action.event.event;
            toastIcon = "Mood";
            toastMessageVariant = "success";
            displayMessage = `${contractEvent}`;
            displaySecondaryMessage = "Thanks for using our dapp";

            // const contract = action.name;
            // const contractNewBalance = action.event.returnValues.newBalance;
            // const display = `${contract}(${contractEvent}): ${contractNewBalance}`;

            console.log("Contract event fired", displayMessage);
        }

        const options = {
            closeButton: false,
            position: toast.POSITION.TOP_RIGHT,
        };

        const display = (
            <ToastMessage
                colorTheme={"dark"}
                my={3}
                icon={toastIcon}
                variant={toastMessageVariant}
                message={displayMessage}
                secondaryMessage={displaySecondaryMessage}
            />
        );

        toast(display, options);

        // toast.onChange( numberOfToastDisplayed => {
        //   toast.dismiss();
        // });
    }

    ///

    return next(action);
};

const appMiddlewares = [thunk, contractEventNotifier];

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
            customProvider: Web3.givenProvider,
        },
    },
    polls: {
        blocks: 6000,
    },
    syncAlways: false,
    appMiddlewares,
    appReducers,
    disableReduxDevTools: false, // enable ReduxDevTools!
};

const store = generateStore(drizzleOptions);
export default store;
