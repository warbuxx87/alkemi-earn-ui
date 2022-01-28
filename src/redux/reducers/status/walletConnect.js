// Import action of interest as constants
import { SHOW_WALLET_CONNECT_MODAL } from "redux/actions/status/walletConnect";

// Define initial state
const initialState = {
    show: false,
};

// Implement "reducer" function with initial state as default state
const walletConnect = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_WALLET_CONNECT_MODAL:
            return {
                ...state,
                show: action.payload.show,
            };

        default:
            return state;
    }
};

export default walletConnect;
