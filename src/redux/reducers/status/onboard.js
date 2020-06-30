// Import action of interest as constants
import { SET_WALLET_CONNECTED } from "redux/actions/status/onboard";

// Define initial state
const initialState = {
    isConnected: false,
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_WALLET_CONNECTED:
            return {
                ...state,
                isConnected: action.payload.isConnected,
            };

        default:
            return state;
    }
};
