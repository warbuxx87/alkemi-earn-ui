// Import action of interest as constants
import { SET_POOL } from "redux/actions/status/pool";

// Define initial state
const initialState = {
    pool: "permissioned",
};

// Implement "reducer" function with initial state as default state
const poolReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POOL: {
            return {
                ...state,
                pool: action.payload.pool,
            };
        }

        default:
            return state;
    }
};

export default poolReducer;
