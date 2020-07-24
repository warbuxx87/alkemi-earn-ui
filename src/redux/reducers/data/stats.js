// Import action of interest as constants
import {
    FETCH_STATS_PENDING,
    FETCH_STATS_SUCCESS,
    FETCH_STATS_ERROR,
} from "redux/actions/data/stats.js";

//import tx from "containers/History/MOCK_DATA.json";

// Define initial state
const initialState = {
    pending: false,
    tx: null,
    error: null,
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, { type, action }) => {
    switch (type) {
        case FETCH_STATS_PENDING:
            return {
                ...state,
                pending: true,
            };

        case FETCH_STATS_SUCCESS:
            return {
                tx: {
                    ...state.tx,
                    [action]: {
                        ...state.tx[action.payload.tx],
                        pending: false,
                    },
                },
            };

        case FETCH_STATS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
            };

        default:
            return state;
    }
};
