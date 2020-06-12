import {
    allocatePending,
    allocateSuccess,
    allocateError,
} from "redux/actions/data/data";
import { handle_faucet_allocateTo } from "utils/drizzle";
import notify from "containers/AppBar/notify";

const allocateLendAction = ({ drizzle, asset, amount }) => async (
    dispatch,
    getState
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

export default allocateLendAction;
