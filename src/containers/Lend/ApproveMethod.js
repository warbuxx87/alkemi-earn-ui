import {
    fetchLendPending,
    fetchLendSuccess,
    fetchLendError
} from "redux/actions/data";
import { handle_approve } from "utils/drizzle";
import notify from "containers/AppBar/notify";

const activateLendAction = ({ drizzle, asset }) => async (
    dispatch,
    getState
) => {
    dispatch(fetchLendPending(asset));
    const myAccount = getState().accounts[0];
    handle_approve({ drizzle, asset, myAccount })
        .then(() => dispatch(fetchLendSuccess(asset)))
        .catch(error => {
            notify.notification({
                eventCode: "supplyError",
                type: "error",
                message: error.message,
                autoDismiss: 5000
            });
            dispatch(fetchLendError(asset, error.message));
        });
};

export default activateLendAction;
