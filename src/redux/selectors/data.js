// Libs
// import { createSelector } from "reselect";

// Stats Selectors
export const getStats = state => state.data.stats.tx;
export const getStatsPending = state => state.data.stats.pending;
export const getStatsError = state => state.data.stats.error;

// Lend Selectors
export const getLendActive = state => Object.values(state.data.lend.assets).filter(asset => (asset.activated));
export const getLendInactive = state => Object.values(state.data.lend.assets).filter(asset => (!asset.activated));
export const getLendError = state => state.data.lend.error;

// Borrow selectors
export const getBorrowActive = state => Object.values(state.data.borrow.assets).filter(asset => (asset.activated));
export const getBorrowInactive = state => Object.values(state.data.borrow.assets).filter(asset => (!asset.activated));
export const getBorrowError = state => state.data.borrow.error;
