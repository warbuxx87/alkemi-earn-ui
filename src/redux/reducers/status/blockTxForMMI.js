// Import action of interest as constants
import { BLOCK_TX_FOR_MMI } from "redux/actions/status/blockTxForMMI";

// Define initial state
const initialState = {
    block: false,
};

// Implement "reducer" function with initial state as default state
const blockTxForMMI = (state = initialState, action) => {
    switch (action.type) {
        case BLOCK_TX_FOR_MMI:
            return {
                ...state,
                block: action.payload.block,
            };

        default:
            return state;
    }
};

export default blockTxForMMI;
