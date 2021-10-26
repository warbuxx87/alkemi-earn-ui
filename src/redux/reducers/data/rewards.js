// Import action of interest as constants
import {
    FETCH_ALK_PRICE_PENDING,
    FETCH_ALK_PRICE_SUCCESS,
    FETCH_ALK_PRICE_ERROR,
    // RESET_ALK_PRICE_DATA,
} from "redux/actions/data/rewards";

// Define initial state
const initialState = {
    pending: false,
    alkPrice: 0,
    error: null,
};

// Implement "reducer" function with initial state as default state
const rewardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALK_PRICE_PENDING:
            return {
                ...state,
                pending: true,
            };

        case FETCH_ALK_PRICE_SUCCESS:
            return {
                ...state,
                pending: false,
                alkPrice: action.payload.alkPrice,
            };

        case FETCH_ALK_PRICE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        // case RESET_ALK_PRICE_DATA:
        //     return initialState;

        default:
            return state;
    }
};

export default rewardsReducer;
