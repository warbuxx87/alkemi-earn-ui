import {
    fetchLendPending,
    fetchLendSuccess
    // fetchLendError
} from "redux/actions/data";

const activateLendAction = asset => async dispatch => {
    dispatch(fetchLendPending(asset));
    setTimeout(() => {
        // mock delay, will remove
        dispatch(fetchLendSuccess(asset));
    }, 3000);
};

export default activateLendAction;
