// 1. React/Redux low level imports

import {
    transactionSent,
    transactionResolved,
} from "redux/actions/status/transactions";
// 2. Libraries imports

// 3. constants imports

const txHandler = (store) => (next) => (action) => {
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
        // the transaction is still processing
        if (action.type === actionTypeSend) {
            console.log("Sent TX", action.txHash);

            store.dispatch(transactionSent(action.stackId, action.txHash));
        }
        // This means it's been mined on the network
        if (action.type === actionTypeSuccess) {
            console.log("Received TX", action);

            store.dispatch(transactionResolved(action.txHash));
        }

        if (action.type === actionTypeError) {
            console.log("Received actionTypeError", action);
        }
    }

    return next(action);
};

export default txHandler;
