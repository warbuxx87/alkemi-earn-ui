// 1. React/Redux low level imports

import {
    transactionSent,
    transactionResolved,
} from "redux/actions/status/transactions";
// 2. Libraries imports

// 3. constants imports

const txHandler = (store) => (next) => (action) => {
    if (!action) next(action); // could be replaced with a simple return since we don't really have an action

    // const actionTypeConfirmation = "TX_CONFIRMATION";
    const actionTypeSend = "TX_BROADCASTED";
    const actionTypeSuccess = "TX_SUCCESSFUL";
    // const actionTypeError = "TX_ERROR";

    if (
        // action.type === actionTypeConfirmation ||
        // action.type === actionTypeError ||
        action.type === actionTypeSuccess ||
        action.type === actionTypeSend
    ) {
        // the transaction is still processing
        if (action.type === actionTypeSend) {
            store.dispatch(transactionSent(action.stackId, action.txHash));
        }
        // This means it's been mined on the network
        if (action.type === actionTypeSuccess) {
            store.dispatch(transactionResolved(action.txHash));
        }

        // if (action.type === actionTypeError) {
        //     console.log("Received actionTypeError", action);
        // }

        // if (action.type === actionTypeConfirmation) {
        //     console.log("Received actionTypeConfirmation", action);
        // }
    }

    return next(action);
};

export default txHandler;
