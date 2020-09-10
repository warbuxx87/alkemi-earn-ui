// Stats Selectors
export const getLiquidationsList = (state) =>
    state.data.liquidations.liquidations;
export const getLiquidationsPending = (state) =>
    state.data.liquidations.pending;
export const getLiquidationsError = (state) => state.data.liquidations.error;
