// Import action of interest as constants
import {
    SET_SELECTED_WALLET,
    SET_ACTIVATED_WALLET,
    SHOW_WALLET_MODAL,
} from "redux/actions/status/walletSelect";

// Define initial state
const initialState = {
    showWalletModal: false,
    selectedWallet: null,
    activating: false,
    activated: false,
};

// Implement "reducer" function with initial state as default state
const poolReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_WALLET_MODAL: {
            return {
                ...state,
                showWalletModal: action.payload.showWalletModal,
            };
        }

        case SET_SELECTED_WALLET: {
            return {
                ...state,
                selectedWallet: action.payload.selectedWallet,
                activating: true,
            };
        }

        case SET_ACTIVATED_WALLET: {
            return {
                ...state,
                activating: false,
                activated: true,
                showWalletModal: false, // could be managed somewhere else
            };
        }

        default:
            return state;
    }
};

export default poolReducer;
