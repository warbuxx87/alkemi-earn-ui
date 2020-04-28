import {
    fetchBorrowPending,
    fetchBorrowSuccess
    // fetchBorrowError
} from "redux/actions/data";

const activateBorrowAction = asset => async dispatch => {
    dispatch(fetchBorrowPending(asset));
    setTimeout(() => {
        // mock delay, will remove
        dispatch(fetchBorrowSuccess(asset));
    }, 3000);
};

export default activateBorrowAction;
