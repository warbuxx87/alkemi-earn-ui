import {
    redeemPending,
    redeemSuccess,
    redeemError,
} from "redux/actions/data/data";
import { handle_redeem_click } from "utils/drizzle";
import notify from "containers/AppBar/notify";

const onRedeemAction = ({ drizzle, amount, asset }) => async (dispatch) => {
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

export default onRedeemAction;
