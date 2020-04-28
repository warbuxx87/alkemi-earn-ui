// Declare action type as a constant
export const FETCH_BORROW_PENDING = "FETCH_BORROW_PENDING";

// Declare action creator
export const fetchBorrowPending = (asset) => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_BORROW_PENDING,
  asset
});

// Declare action type as a constant
export const FETCH_BORROW_SUCCESS = "FETCH_BORROW_SUCCESS";

// Declare action creator
export const fetchBorrowSuccess = (asset) => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_BORROW_SUCCESS,
  asset,
});

// Declare action type as a constant
export const FETCH_BORROW_ERROR = "FETCH_BORROW_ERROR";

// Declare action creator
export const fetchBorrowError = error => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_BORROW_ERROR,
  error: error
});

const activateBorrowAction = (asset) => async dispatch => {
  dispatch(fetchBorrowPending(asset));
  setTimeout(() => { // mock delay, will remove
    dispatch(fetchBorrowSuccess(asset));
  }, 3000)
};

export default activateBorrowAction;
