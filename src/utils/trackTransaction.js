import { LedgerHQFrame } from "utils/web3ReactConnectors";

import { event } from "utils/googleAnalytics";

import { TRANSACTION_RESOLVED } from "redux/actions/status/transactions";
import { getTransactions } from "redux/selectors/status/transactions";

const googleAnalyticsEvents = {
    supply: true,
    borrow: true,
    withdraw: true,
    repayBorrow: true,
};

export const trackForLedgerApp = (store) => (next) => (action) => {
    if (!action) next(action);

    if (action && action.type === TRANSACTION_RESOLVED) {
        const txs = getTransactions(store.getState());
        const tx = txs[action.payload.txHash];
        if (tx) {
            if (LedgerHQFrame.isLedgerApp()) {
                if (googleAnalyticsEvents[tx.type]) {
                    event({
                        action: tx.type,
                        data: tx,
                        category: "ledger_app",
                        label: "transaction_track",
                    });
                }
            }
        }
    }
    return next(action);
};
