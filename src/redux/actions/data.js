// Declare action type as a constant
export const FETCH_STATS_PENDING = "FETCH_STATS_PENDING";

// Declare action creator
export const fetchStatsPending = () => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_STATS_PENDING
});

// Declare action type as a constant
export const FETCH_STATS_SUCCESS = "FETCH_STATS_SUCCESS";

// Declare action creator
export const fetchStatsSuccess = tx => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_STATS_SUCCESS,
  payload: tx
});

// Declare action type as a constant
export const FETCH_STATS_ERROR = "FETCH_STATS_ERROR";

// Declare action creator
export const fetchStatsError = error => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_STATS_ERROR,
  error: error
});

// Declare action type as a constant
export const FETCH_LEND_PENDING = "FETCH_LEND_PENDING";

// Declare action creator
export const fetchLendPending = () => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_LEND_PENDING
});

// Declare action type as a constant
export const FETCH_LEND_SUCCESS = "FETCH_LEND_SUCCESS";

// Declare action creator
export const fetchLendSuccess = (activeLend, inactiveLend) => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_LEND_SUCCESS,
  payload: {
    activeLend,
    inactiveLend
  }
});

// Declare action type as a constant
export const FETCH_LEND_ERROR = "FETCH_LEND_ERROR";

// Declare action creator
export const fetchLendError = error => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: FETCH_LEND_ERROR,
  error: error
});

// Declare action type as a constant
export const ACTIVATE_LEND_ASSET = "ACTIVATE_LEND_ASSET";

// Declare action creator
export const activateLendAsset = asset => ({
  // Respect FSA standard format (type, payload, meta properties)
  type: ACTIVATE_LEND_ASSET,
  payload: {
    asset
  }
});
