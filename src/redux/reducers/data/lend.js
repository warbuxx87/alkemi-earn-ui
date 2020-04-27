// Import action of interest as constants
import {
  FETCH_LEND_PENDING,
  FETCH_LEND_SUCCESS,
  FETCH_LEND_ERROR
} from "redux/actions/data";

// Define initial state
const initialState = {
  pending: false,
  active: [],
  inactive: [],
  error: null
};

// Implement "reducer" function with initial state as default state
export default (state = initialState, { type, active, inactive }) => {
  switch (type) {
    case FETCH_LEND_PENDING:
      return {
        ...state,
        pending: true
      };

    case FETCH_LEND_SUCCESS:
      return {
        ...state,
        pending: false,
        active: active,
        inactive: inactive
      };

    case FETCH_LEND_ERROR:
      return {
        ...state,
        pending: false,
        error: active.error
      };

    default:
      return state;
  }
};
