// Section 1: Utilities imports and low level imports

import { handle_approve_click } from "utils/drizzle";
import { triggerToastDisplay } from "utils/notify";

// Section 2: Action types declarations and action creators

//                                      //
// ------------ LEND ACTIONS --------   //
//                                      //

// Declare action type as a constant
export const FETCH_LEND_PENDING = "FETCH_LEND_PENDING";

// Declare action creator
export const fetchLendPending = (asset) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_PENDING,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const FETCH_LEND_SUCCESS = "FETCH_LEND_SUCCESS";

// Declare action creator
export const fetchLendSuccess = (asset) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_SUCCESS,
    payload: {
        asset,
    },
});

// Declare action type as a constant
export const FETCH_LEND_ERROR = "FETCH_LEND_ERROR";

// Declare action creator
export const fetchLendError = (asset, error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_ERROR,
    payload: {
        asset,
    },
    error,
});

// Section 3: Action dispatch methods and async funcs

export const onLendActivate = ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    asset,
}) => async (dispatch) => {
    dispatch(fetchLendPending(asset));
    const myAccount = userWalletAddress;
    handle_approve_click({ drizzle, userWalletNetwork, asset, myAccount })
        .then(() => dispatch(fetchLendSuccess(asset)))
        .catch((error) => {
            triggerToastDisplay({
                toastMessageVariant: "failure",
                displayMessage: "Something went wrong",
                displaySecondaryMessage: error.message,
            });

            dispatch(fetchLendError(asset, error.message));
        });
};
