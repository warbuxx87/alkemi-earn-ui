// Section 1: Utilities imports and low level imports

// Section 2: Action types declarations and action creators

//                                       //
// ------------ HISTORY ACTIONS -------- //
//                                       //

// Declare action type as a constant
export const FETCH_BLOCK_TIMESTAMP_PENDING = "FETCH_BLOCK_TIMESTAMP_PENDING";

// Declare action creator
const fetchBlockTimestampPending = (blockNumber) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_BLOCK_TIMESTAMP_PENDING,
    payload: {
        blockNumber,
    },
});

// Declare action type as a constant
export const FETCH_BLOCK_TIMESTAMP_SUCCESS = "FETCH_BLOCK_TIMESTAMP_SUCCESS";

// Declare action creator
const fetchBlockTimestampSuccess = (blockNumber, timestamp) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_BLOCK_TIMESTAMP_SUCCESS,
    payload: {
        blockNumber,
        timestamp,
    },
});

// Declare action type as a constant
export const FETCH_BLOCK_TIMESTAMP_ERROR = "FETCH_BLOCK_TIMESTAMP_ERROR";

// Declare action creator
const fetchBlockTimestampError = (error, blockNumber) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_BLOCK_TIMESTAMP_ERROR,
    payload: { blockNumber },
    error: error, // Not used
});

//                                               //
// ------------ HISTORY METHOD ACTIONS --------   //
//                                               //

// Section 3: Action dispatch methods and async funcs

export const fetchTimestampsOfBlocks = ({
    blocks,
    blocksData,
    drizzle,
}) => async (dispatch) => {
    blocks.forEach((element) => {
        if (
            element !== undefined &&
            (blocksData[element] === undefined ||
                blocksData[element].error === true)
        ) {
            dispatch(fetchBlockTimestampPending(element));

            drizzle.web3.eth
                .getBlock(element)
                .then((result) => {
                    dispatch(
                        fetchBlockTimestampSuccess(element, result.timestamp)
                    );
                    // Not saving block's timestamp by network and wallet address (as in blocks: {rinkeby: {0x...: {timestamp: ...}}, ...}), this is okay for now for two reasons:
                    // 1) The app reloads on wallet & network change (store data discarded automatically)
                    // 2) We are not expecting the user to change the wallet and network often during a session
                })
                .catch((e) => {
                    dispatch(fetchBlockTimestampError(e, element));
                });
        } else {
            // element undefined, to be investigated why TXs returns timestamp instead of block numbers on first call
            // or defined but already pulled the data
        }
    });
};
