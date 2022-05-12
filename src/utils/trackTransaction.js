import { LedgerHQFrame } from "utils/web3ReactConnectors";

import { event } from "utils/googleAnalytics";

const googleAnalyticsEvents = {
    supply: true,
    borrow: true,
    withdraw: true,
    repayBorrow: true,
};

export const trackForLedgerApp = (tx) => {
    if (LedgerHQFrame.isLedgerApp()) {
        if (googleAnalyticsEvents[tx.type]) {
            event({
                action: tx.type,
                data: {
                    ledger_assetUnit: tx.assetUnit,
                    ledger_txHash: tx.txHash,
                    ledger_type: tx.type,
                    ledger_userWalletName: tx.userWalletName,
                },
                category: "ledger_app",
                label: "ledger_transaction_track",
            });
        }
    }
};
