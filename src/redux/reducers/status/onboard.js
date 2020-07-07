// Import action of interest as constants
import {
    SET_WALLET_CONNECTED,
    SET_CURRENTLY_SELECTED_WALLET_NETWORK_ID,
    SET_CURRENTLY_SELECTED_WALLET_ADDRESS,
} from "redux/actions/status/onboard";

// Define initial state
const initialState = {
    isConnected: false,
    networkID: null,
    address: null,
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_WALLET_CONNECTED:
            return {
                ...state,
                isConnected: action.payload.isConnected,
            };

        case SET_CURRENTLY_SELECTED_WALLET_NETWORK_ID:
            return {
                ...state,
                networkID: action.payload.networkID,
            };

        case SET_CURRENTLY_SELECTED_WALLET_ADDRESS:
            return {
                ...state,
                address: action.payload.address,
            };

        default:
            return state;
    }
};
