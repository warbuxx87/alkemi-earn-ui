// Import action of interest as constants
import {
  FETCH_STATS_PENDING,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_ERROR
} from "redux/actions/data";

// Define initial state
const initialState = {
  pending: false,
  tx: null,
  error: null
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, { type, action }) => {
  switch (type) {
    case FETCH_STATS_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        pending: false,
        tx: action
      };

    case FETCH_STATS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    default:
      return state;
  }
};
