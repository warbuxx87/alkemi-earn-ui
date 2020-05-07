import {
    fetchLendPending,
    fetchLendSuccess,
    fetchLendError
} from "redux/actions/data";
import { handle_approve } from "./utils";

const activateLendAction = ({ drizzle, asset, netType }) => async (
    dispatch,
    getState
) => {
    dispatch(fetchLendPending(asset));
    const myAccount = getState().accounts[0];
    handle_approve({ drizzle, asset, netType, myAccount })
        .then(() => dispatch(fetchLendSuccess(asset)))
        .catch(error => dispatch(fetchLendError(asset, error.message)));
};

export default activateLendAction;
