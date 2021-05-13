// Import action of interest as constants
import {
    FETCH_BLOCK_TIMESTAMP_PENDING,
    FETCH_BLOCK_TIMESTAMP_SUCCESS,
    FETCH_BLOCK_TIMESTAMP_ERROR,
} from "redux/actions/data/history";

// Define initial state
const initialState = {
    blocks: {},
};

// Implement "reducer" function with initial state as default state
const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOCK_TIMESTAMP_PENDING: {
            const newBlock = { pending: true };
            const newBlocks = {
                ...state.blocks,
                [action.payload.blockNumber]: newBlock,
            };

            const newData = {
                ...state,
                blocks: newBlocks,
            };

            return newData;
        }
        case FETCH_BLOCK_TIMESTAMP_SUCCESS: {
            const newBlock = {
                pending: false,
                timestamp: action.payload.timestamp,
            };
            const newBlocks = {
                ...state.blocks,
                [action.payload.blockNumber]: newBlock,
            };

            const newData = {
                ...state,
                blocks: newBlocks,
            };

            return newData;
        }
        case FETCH_BLOCK_TIMESTAMP_ERROR: {
            const newBlock = { pending: false, error: true };
            const newBlocks = {
                ...state.blocks,
                [action.payload.blockNumber]: newBlock,
            };

            const newData = {
                ...state,
                blocks: newBlocks,
            };

            return newData;
        }
        default:
            return state;
    }
};

export default historyReducer;
