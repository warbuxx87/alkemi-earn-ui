import {
    fetchBorrowPending,
    fetchBorrowSuccess,
    fetchBorrowError
} from "redux/actions/data";
import { handle_approve } from "utils/drizzle";
import notify from "containers/AppBar/notify";

const activateBorrowAction = ({ drizzle, asset }) => async (
    dispatch,
    getState
) => {
    dispatch(fetchBorrowPending(asset));
    const myAccount = getState().accounts[0];
    handle_approve({ drizzle, asset, myAccount })
        .then(() => dispatch(fetchBorrowSuccess(asset)))
        .catch(error => {
            notify.notification({
                eventCode: "borrowError",
                type: "error",
                message: error.message,
                autoDismiss: 5000
            });
            dispatch(fetchBorrowError(asset, error.message));
        });
};

export default activateBorrowAction;
