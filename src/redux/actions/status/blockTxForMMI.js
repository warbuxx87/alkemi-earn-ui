// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

// Declare action type as a constant
export const BLOCK_TX_FOR_MMI = "BLOCK_TX_FOR_MMI";

// Declare action creator
export const setBlockTxForMMI = (block) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: BLOCK_TX_FOR_MMI,
    payload: {
        block,
    },
});

// Section 3: Action dispatch methods and async funcs
