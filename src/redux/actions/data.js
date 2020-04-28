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