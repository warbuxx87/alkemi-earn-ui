// Import action of interest as constants
import {
    FETCH_LIQUIDATIONS_PENDING,
    FETCH_LIQUIDATIONS_SUCCESS,
    FETCH_LIQUIDATIONS_ERROR,
} from "redux/actions/data/liquidations";

// Define initial state
const initialState = {
    liquidations: [],
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIQUIDATIONS_PENDING:
            return {
                ...state,
                pending: true,
            };
        case FETCH_LIQUIDATIONS_SUCCESS:
            return {
                ...state,
                pending: false,
                liquidations: action.payload.liquidations,
            };

        case FETCH_LIQUIDATIONS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        default:
            return state;
    }
};
