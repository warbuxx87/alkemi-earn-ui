// Declare action type as a constant
export const FETCH_HISTORY_PENDING = "FETCH_HISTORY_PENDING";

// Declare action creator
export const fetchHistoryPending = () => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_HISTORY_PENDING
});

// Declare action type as a constant
export const FETCH_HISTORY_SUCCESS = "FETCH_HISTORY_SUCCESS";

// Declare action creator
export const fetchHistorySuccess = tx => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_HISTORY_SUCCESS,
  payload: { tx }
});

// Declare action type as a constant
export const FETCH_HISTORY_ERROR = "FETCH_HISTORY_ERROR";

// Declare action creator
export const fetchHistoryError = error => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_HISTORY_ERROR,
  error: error
});
