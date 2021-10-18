// Stats Selectors
export const getMarkets = (state) => state.data.markets.marketsData;
export const getSupplyArray = (state) => state.data.markets.supplyArray;
export const getBorrowArray = (state) => state.data.markets.borrowArray;
export const getCalculationsTotals = (state) =>
    state.data.markets.calculationsTotals;
export const getTxPending = (state) => state.data.markets.pending;
export const getTxError = (state) => state.data.markets.error;

// export const getAlkApy = (state, alkPrice) => {
//     state.data.markets.marketsData
// };
