// Libs
// import { createSelector } from "reselect";

// Stats Selectors
export const getStats = state => state.data.stats.tx;
export const getStatsPending = state => state.data.stats.pending;
export const getStatsError = state => state.data.stats.error;

// Lend Selectors
export const getLendActive = state => state.data.lend.active;
export const getLendInactive = state => state.data.lend.inactive;
export const getLendPending = state => state.data.lend.pending;
export const getLendError = state => state.data.lend.error;
