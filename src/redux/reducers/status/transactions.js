// Import action of interest as constants
import {
    TRANSACTION_TRIGGERED,
    TRANSACTION_RESOLVED,
    TRANSACTION_CANCELED,
} from "redux/actions/status/transactions";

// Define initial state
const initialState = {
    txs: {},
};

// Implement "reducer" function with initial state as default state
const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRANSACTION_TRIGGERED: {
            const newTransaction = {
                ...state.txs[action.payload.txData.txHash], // might be une

                txHash: action.payload.txData.txHash, // In the case of WalletConnect it's not the real one but the safeTx (temporary)
                userWalletName: action.payload.txData.userWalletName, // MetaMask, WalletConnect...
                type: action.payload.type, //
                processing: true,
                assetUnit: action.payload.assetUnit,
                alternativeId: action.payload.alternativeId,
            };

            return {
                ...state,
                txs: {
                    ...state.txs,
                    [action.payload.txData.txHash]: newTransaction,
                },
            };
        }

        case TRANSACTION_RESOLVED: {
            let tx = state.txs[action.payload.txHash]; // In the case of MetaMask this will be found

            if (tx === undefined) {
                tx = Object.values(state.txs).find((aTx) => {
                    // Make an attempt to find equivalent tx, in the case of walletconnect
                    // This is the fastest method to resolve for wallet connect but could get false positives in case the user is running two instances and making the same transaction (highly unlikely in mainnet)
                    return (
                        aTx.type === action.payload.type &&
                        (aTx.assetUnit === action.payload.assetUnit ||
                            aTx.alternativeId === action.payload.alternativeId)
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
                        realTx: action.payload.realTx, // for wallet connect
                    },
                },
            };
        }

        case TRANSACTION_CANCELED: {
            let tx = state.txs[action.payload.txHash]; // In the case of MetaMask this will be found

            if (tx === undefined) {
                tx = Object.values(state.txs).find((aTx) => {
                    // Make an attempt to find equivalent tx, in the case of walletconnect
                    // This is the fastest method to resolve for wallet connect but could get false positives in case the user is running two instances and making the same transaction (highly unlikely in mainnet)

                    return (
                        aTx.type === action.payload.type &&
                        (aTx.assetUnit === action.payload.assetUnit ||
                            aTx.alternativeId === action.payload.alternativeId)
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

export default transactionsReducer;
