// Stats Selectors
export const getStats = (state) => state.data.stats.tx;
export const getStatsPending = (state) => state.data.stats.pending;
export const getStatsError = (state) => state.data.stats.error;
