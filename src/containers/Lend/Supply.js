import { supplyPending, supplySuccess, supplyError } from "redux/actions/data";
import { handle_supply_click } from "./utils";
import notify from "containers/AppBar/notify";

const onSupplyAction = ({ drizzle, amount, asset }) => async dispatch => {
    dispatch(supplyPending(asset.unit));
    handle_supply_click({ drizzle, amount, asset })
        .then(() => dispatch(supplySuccess(asset.unit)))
        .catch(error => {
            notify.notification({
                eventCode: "suuplyError",
                type: "error",
                message: error.message,
                autoDismiss: 5000
            });
            dispatch(supplyError(asset.unit, error.message));
        });
};

export default onSupplyAction;
