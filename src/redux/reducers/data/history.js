// Import action of interest as constants
import {
  FETCH_HISTORY_PENDING,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_ERROR
} from "redux/actions/data";

// Define initial state
const initialState = {
  pending: false,
  tx: [],
  error: null
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, { type, action }) => {
  switch (type) {
    case FETCH_HISTORY_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        pending: false,
        tx: action.payload
      };

    case FETCH_HISTORY_ERROR:
      return {
        ...state,
        pending: false,
        tx: [],
        error: action.error
      };

    default:
      return state;
  }
};
