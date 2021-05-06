// Import action of interest as constants
import {
    FETCH_SIGN_IN_PENDING,
    FETCH_SIGN_IN_SUCCESS,
    FETCH_SIGN_IN_ERROR,
    RESTORE_AUTH_DATA,
    RESET_AUTH_DATA,
} from "redux/actions/status/auth";
// import internal assets

// Define initial state
const initialState = {
    auth: {},
};

// Implement "reducer" function with initial state as default state
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SIGN_IN_SUCCESS: {
            return {
                ...state,
                auth: {
                    ...state.assets,
                    [action.payload.network]: {
                        accessToken: action.payload.accessToken,
                        isAdmin: action.payload.isAdmin,
                    },
                },
            };
        }

        case RESTORE_AUTH_DATA: {
            return {
                ...state,
                auth: action.payload.auth,
            };
        }

        case RESET_AUTH_DATA:
            return initialState;

        default:
            return state;
    }
};

export default authReducer;
