import {
    approvePending,
    approveSuccess,
    approveError,
} from "redux/actions/data";
import { handle_approve_click } from "utils/drizzle";
import notify from "containers/AppBar/notify";

const approveLendAction = ({ drizzle, asset }) => async (
    dispatch,
    getState
) => {
    dispatch(approvePending(asset));
    const myAccount = getState().accounts[0];
    handle_approve_click({ drizzle, asset, myAccount })
        .then(() => dispatch(approveSuccess(asset)))
        .catch((error) => {
            notify.notification({
                eventCode: "approveError",
                type: "error",
                message: error.message,
                autoDismiss: 5000,
            });
            dispatch(approveError(asset, error.message));
        });
};

export default approveLendAction;
