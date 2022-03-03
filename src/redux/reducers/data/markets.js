// Import action of interest as constants
import {
    FETCH_MARKETS_PENDING,
    FETCH_MARKETS_SUCCESS,
    FETCH_MARKETS_ERROR,
    // RESET_MARKETS_DATA,
} from "redux/actions/data/markets";

// Define initial state
const initialState = {
    open: {
        // open and permissioned could be set dynamically, but just to predict data structure, these has been set as such for now
        pending: false,
        error: null,

        marketsData: [],
        supplyArray: [],
        borrowArray: [],
        calculationsTotals: {},
    },
    permissioned: {
        pending: false,
        error: null,

        marketsData: [],
        supplyArray: [],
        borrowArray: [],
        calculationsTotals: {},
    },
};

// Implement "reducer" function with initial state as default state
const txReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MARKETS_PENDING:
            return {
                ...state,
                pending: true,
            };

        case FETCH_MARKETS_SUCCESS: {
            return {
                ...state,
                [action.payload.poolToRetrieve]: {
                    pending: false,
                    marketsData: action.payload.marketsData,
                    supplyArray: action.payload.supplyArray,
                    borrowArray: action.payload.borrowArray,
                    calculationsTotals: action.payload.calculationsTotals,
                },
            };
        }
        case FETCH_MARKETS_ERROR:
            return {
                ...state,
                [action.payload.currentPool]: {
                    ...state[action.payload.currentPool],

                    pending: false,
                    error: action.error,
                },
            };

        // case RESET_MARKETS_DATA:
        //     return initialState;

        default:
            return state;
    }
};

export default txReducer;
