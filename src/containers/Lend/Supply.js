import { supplyPending, supplySuccess, supplyError } from "redux/actions/data";
import { handle_supply_click } from "./utils";

const onSupplyAction = ({ drizzle, amount, asset }) => async dispatch => {
    dispatch(supplyPending(asset.unit));
    handle_supply_click({ drizzle, amount, asset })
        .then(() => dispatch(supplySuccess(asset.unit)))
        .catch(error => dispatch(supplyError(asset.unit, error.message)));
};

export default onSupplyAction;
