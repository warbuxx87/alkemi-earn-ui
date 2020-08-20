// Import action of interest as constants
import {
    SET_WALLET_CONNECTED,
    SET_WALLET_ADDRESS,
    SET_WALLET_NETWORK,
} from "redux/actions/status/onboard";

const DEFAULT_NETWORK = process.env.REACT_APP_DEFAULT_NETWORK;

// Define initial state
const initialState = {
    isConnected: false,
    walletAddress: null,
    walletNetwork: DEFAULT_NETWORK,
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_WALLET_CONNECTED:
            return {
                ...state,
                isConnected: action.payload.isConnected,
            };

        case SET_WALLET_ADDRESS:
            return {
                ...state,
                walletAddress: action.payload.walletAddress,
            };

        case SET_WALLET_NETWORK:
            return {
                ...state,
                walletNetwork: action.payload.walletNetwork,
            };

        default:
            return state;
    }
};
