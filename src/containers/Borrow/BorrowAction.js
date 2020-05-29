import { borrowPending, borrowSuccess, borrowError } from "redux/actions/data";
import { handle_borrow_click } from "containers/Lend/utils";
import notify from "containers/AppBar/notify";

const onBorrowAction = ({ drizzle, amount, asset }) => async dispatch => {
    dispatch(borrowPending(asset.unit));
    handle_borrow_click({ drizzle, amount, asset })
        .then(() => dispatch(borrowSuccess(asset.unit)))
        .catch(error => {
            notify.notification({
                eventCode: "borrowError",
                type: "error",
                message: error.message,
                autoDismiss: 5000
            });
            dispatch(borrowError(asset.unit, error.message));
        });
};

export default onBorrowAction;
