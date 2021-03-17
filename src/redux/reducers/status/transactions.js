// Import action of interest as constants
import {
    TRANSACTION_TRIGGERED,
    // TRANSACTION_SENT,
    TRANSACTION_RESOLVED,
    TRANSACTION_CANCELED,
} from "redux/actions/status/transactions";

// Define initial state
const initialState = {
    txs: {},
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case TRANSACTION_TRIGGERED: {
            return {
                ...state,
                txs: {
                    ...state.txs,
                    [action.payload.txData.txHash]: {
                        ...state.txs[action.payload.txData.txHash], // might be une

                        txHash: action.payload.txData.txHash, // In case of WalletConnect it's not the real one but the safeTx (temporary)
                        userWalletName: action.payload.txData.userWalletName, // MetaMask, WalletConnect...
                        type: action.payload.type, //
                        processing: true,
                        assetUnit: action.payload.assetUnit,
                    },
                },
            };
        }

        // case TRANSACTION_SENT: {
        //     return {
        //         ...state,
        //         txs: {
        //             ...state.txs,
        //             [action.payload.stackId]: {
        //                 ...state.txs[action.payload.stackId],
        //                 processing: true,
        //                 txHash: action.payload.txHash,
        //             },
        //         },
        //     };
        // }

        case TRANSACTION_RESOLVED: {
            let tx = state.txs[action.payload.txHash]; // In the case of MetaMask this will be found

            if (tx === undefined) {
                tx = Object.values(state.txs).find((aTx) => {
                    // Make an attempt to find equivalent tx, in the case of walletconnect
                    return (
                        aTx.type === action.payload.type &&
                        aTx.assetUnit === action.payload.assetUnit
                    );
                });
            }

            if (tx === undefined) return state; // In the case it's still undefined (think user triggered this call from another instance of the app)

            return {
                ...state,
                txs: {
                    ...state.txs,
                    [tx.txHash]: {
                        ...state.txs[tx.txHash],
                        processing: false,
                        resolved: true, // unused for now
                    },
                },
            };
        }

        case TRANSACTION_CANCELED: {
            let tx = state.txs[action.payload.txHash]; // In the case of MetaMask this will be found

            if (tx === undefined) {
                tx = Object.values(state.txs).find((aTx) => {
                    // Make an attempt to find equivalent tx, in the case of walletconnect
                    return (
                        aTx.type === action.payload.type &&
                        aTx.assetUnit === action.payload.assetUnit
                    );
                });
            }

            if (tx === undefined) return state; // In the case it's still undefined (think user triggered this call from another instance of the app)

            return {
                ...state,
                txs: {
                    ...state.txs,
                    [tx.txHash]: {
                        ...state.txs[tx.txHash],
                        processing: false,
                        errored: true, // unused for now
                    },
                },
            };
        }

        default:
            return state;
    }
};
