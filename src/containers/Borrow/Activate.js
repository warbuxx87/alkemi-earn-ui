import {
    fetchBorrowingPending,
    fetchBorrowingSuccess,
    fetchBorrowingError
} from "redux/actions/data";
import { handle_approve } from "containers/Lend/utils";
import notify from "containers/AppBar/notify";

const activateBorrowingAction = ({ drizzle, asset }) => async (
    dispatch,
    getState
) => {
    dispatch(fetchBorrowingPending(asset));
    const myAccount = getState().accounts[0];
    handle_approve({ drizzle, asset, myAccount })
        .then(() => dispatch(fetchBorrowingSuccess(asset)))
        .catch(error => {
            notify.notification({
                eventCode: "borrowError",
                type: "error",
                message: error.message,
                autoDismiss: 5000
            });
            dispatch(fetchBorrowingError(asset, error.message));
        });
};

export default activateBorrowingAction;
