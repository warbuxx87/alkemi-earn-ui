// Declare action type as a constant
export const FETCH_LEND_PENDING = "FETCH_LEND_PENDING";

// Declare action creator
export const fetchLendPending = (asset) => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_LEND_PENDING,
  asset
});

// Declare action type as a constant
export const FETCH_LEND_SUCCESS = "FETCH_LEND_SUCCESS";

// Declare action creator
export const fetchLendSuccess = (asset) => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_LEND_SUCCESS,
  asset,
});

// Declare action type as a constant
export const FETCH_LEND_ERROR = "FETCH_LEND_ERROR";

// Declare action creator
export const fetchLendError = error => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_LEND_ERROR,
  error: error
});

const activateLendAction = (asset) => async dispatch => {
  dispatch(fetchLendPending(asset));
  setTimeout(() => { // mock delay, will remove
    dispatch(fetchLendSuccess(asset));
  }, 3000)
};

export default activateLendAction;
