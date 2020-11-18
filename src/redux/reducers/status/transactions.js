// Import action of interest as constants
import {
    TRANSACTION_TRIGGERED,
    TRANSACTION_SENT,
    TRANSACTION_RESOLVED,
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
                    [action.payload.stackId]: {
                        ...state.txs[action.payload.stackId],
                        asset: action.payload.asset,
                        type: action.payload.type,
                        processing: false,
                        stackId: action.payload.stackId,
                    },
                },
            };
        }

        case TRANSACTION_SENT: {
            return {
                ...state,
                txs: {
                    ...state.txs,
                    [action.payload.stackId]: {
                        ...state.txs[action.payload.stackId],
                        processing: true,
                        txHash: action.payload.txHash,
                    },
                },
            };
        }

        case TRANSACTION_RESOLVED: {
            const tx = Object.values(state.txs).filter((aTx) => {
                return aTx.txHash === action.payload.txHash;
            });

            return {
                ...state,
                txs: {
                    ...state.txs,
                    [tx[0].stackId]: {
                        ...state.txs[tx[0].stackId],
                        processing: false,
                        resolved: true,
                    },
                },
            };
        }

        default:
            return state;
    }
};
