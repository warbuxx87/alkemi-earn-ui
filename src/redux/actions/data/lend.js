// TODO place these accordingly
import { handle_approve } from "utils/drizzle";
import { handle_faucet_allocateTo } from "utils/drizzle";
import { handle_supply_click } from "utils/drizzle";
import { handle_redeem_click } from "utils/drizzle";
import notify from "containers/AppBar/notify";

//                                      //
// ------------ LEND ACTIONS --------   //
//                                      //

// Declare action type as a constant
export const FETCH_LEND_PENDING = "FETCH_LEND_PENDING";

// Declare action creator
export const fetchLendPending = (asset) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_PENDING,
    asset,
});

// Declare action type as a constant
export const FETCH_LEND_SUCCESS = "FETCH_LEND_SUCCESS";

// Declare action creator
export const fetchLendSuccess = (asset) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_SUCCESS,
    asset,
});

// Declare action type as a constant
export const FETCH_LEND_ERROR = "FETCH_LEND_ERROR";

// Declare action creator
export const fetchLendError = (asset, error) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: FETCH_LEND_ERROR,
    payload: {
        error,
        asset,
    },
});

//                                      //
// ------------ SUPPLY METHOD ACTIONS --------   //
//                                      //

export const SUPPLY_PENDING = "SUPPLY_PENDING";
export const supplyPending = (asset) => ({
    type: SUPPLY_PENDING,
    payload: asset,
});

export const SUPPLY_SUCCESS = "SUPPLY_SUCCESS";
export const supplySuccess = (asset) => ({
    type: SUPPLY_SUCCESS,
    payload: asset,
});

export const SUPPLY_ERROR = "SUPPLY_ERROR";
export const supplyError = (asset, error) => ({
    type: SUPPLY_ERROR,
    payload: {
        error,
        asset,
    },
});

//                                               //
// ------------ REDEEM METHOD ACTIONS --------   //
//                                               //

export const REDEEM_PENDING = "REDEEM_PENDING";
export const redeemPending = (asset) => ({
    type: REDEEM_PENDING,
    payload: asset,
});

export const REDEEM_SUCCESS = "REDEEM_SUCCESS";
export const redeemSuccess = (asset) => ({
    type: REDEEM_SUCCESS,
    payload: asset,
});

export const REDEEM_ERROR = "REDEEM_ERROR";
export const redeemError = (asset, error) => ({
    type: REDEEM_ERROR,
    payload: {
        error,
        asset,
    },
});

//                                               //
// ------------ APPROVE METHOD ACTIONS --------   //
//                                               //

export const APPROVE_PENDING = "APPROVE_PENDING";
export const approvePending = (asset) => ({
    type: APPROVE_PENDING,
    payload: asset,
});

export const APPROVE_SUCCESS = "APPROVE_SUCCESS";
export const approveSuccess = (asset) => ({
    type: APPROVE_SUCCESS,
    payload: asset,
});

export const APPROVE_ERROR = "APPROVE_ERROR";
export const approveError = (asset, error) => ({
    type: APPROVE_ERROR,
    payload: {
        error,
        asset,
    },
});

//                                               //
// ------------ ALLOCATE METHOD ACTIONS --------   //
//                                               //

export const ALLOCATE_PENDING = "ALLOCATE_PENDING";
export const allocatePending = (asset) => ({
    type: ALLOCATE_PENDING,
    payload: asset,
});

export const ALLOCATE_SUCCESS = "ALLOCATE_SUCCESS";
export const allocateSuccess = (asset) => ({
    type: ALLOCATE_SUCCESS,
    payload: asset,
});

export const ALLOCATE_ERROR = "ALLOCATE_ERROR";

export const allocateError = (asset, error) => ({
    type: ALLOCATE_ERROR,
    payload: {
        error,
        asset,
    },
});

// --- Methods

export const onLendActivate = ({ drizzle, asset }) => async (
    dispatch,
    getState
) => {
    dispatch(fetchLendPending(asset));
    const myAccount = getState().accounts[0];
    handle_approve({ drizzle, asset, myAccount })
        .then(() => dispatch(fetchLendSuccess(asset)))
        .catch((error) => {
            notify.notification({
                eventCode: "fetchLendError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(fetchLendError(asset, error.message));
        });
};

export const onAllocateAction = ({ drizzle, asset, amount }) => async (
    dispatch
) => {
    dispatch(allocatePending(asset));
    handle_faucet_allocateTo({ drizzle, asset, amount })
        .then(() => dispatch(allocateSuccess(asset)))
        .catch((error) => {
            notify.notification({
                eventCode: "allocateError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(allocateError(asset, error.message));
        });
};

export const onSupplyAction = ({ drizzle, amount, asset }) => async (
    dispatch
) => {
    dispatch(supplyPending(asset.unit));
    handle_supply_click({ drizzle, amount, asset })
        .then(() => dispatch(supplySuccess(asset.unit)))
        .catch((error) => {
            notify.notification({
                eventCode: "supplyError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(supplyError(asset.unit, error.message));
        });
};

export const onRedeemAction = ({ drizzle, amount, asset }) => async (
    dispatch
) => {
    dispatch(redeemPending(asset.unit));
    handle_redeem_click({ drizzle, amount, asset })
        .then(() => dispatch(redeemSuccess(asset.unit)))
        .catch((error) => {
            notify.notification({
                eventCode: "redeemError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(redeemError(asset.unit, error.message));
        });
};
