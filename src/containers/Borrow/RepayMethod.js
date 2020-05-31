import { repayPending, repaySuccess, repayError } from "redux/actions/data";
import { handle_repay_click } from "utils/drizzle";
import notify from "containers/AppBar/notify";

const onRepayAction = ({ drizzle, amount, asset }) => async dispatch => {
    dispatch(repayPending(asset.unit));
    handle_repay_click({ drizzle, amount, asset })
        .then(() => dispatch(repaySuccess(asset.unit)))
        .catch(error => {
            notify.notification({
                eventCode: "repayError",
                type: "error",
                message: error.message,
                autoDismiss: 5000
            });
            dispatch(repayError(asset.unit, error.message));
        });
};

export default onRepayAction;
