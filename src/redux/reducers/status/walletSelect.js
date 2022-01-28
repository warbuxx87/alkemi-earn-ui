// Import action of interest as constants
import {
    SET_SELECTED_WALLET,
    SET_ACTIVATED_WALLET,
    SHOW_WALLET_MODAL,
    SET_RESET_SELECTION_WALLET,
    SET_DISMISS_WALLET_SELECTION,
} from "redux/actions/status/walletSelect";

// Define initial state
const initialState = {
    showWalletModal: false,
    selectedWallet: null,
    activating: false,
    activated: false,
    askToConnect: false,
    lastSelectedWallet: null,
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

                askToConnect: false,
                lastSelectedWallet: null,
                // lastSelectedWallet: action.payload.selectedWallet,

                activating: true,
            };
        }

        case SET_RESET_SELECTION_WALLET: {
            // after error
            return {
                ...state,
                selectedWallet: null,
                activating: false,
                askToConnect: action.payload.askToConnect,
                lastSelectedWallet: action.payload.lastSelectedWallet,
                showWalletModal: false,
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

        case SET_DISMISS_WALLET_SELECTION: {
            return {
                initialState,
            };
        }

        default:
            return state;
    }
};

export default poolReducer;
