// 1. React/Redux low level imports
import thunk from "redux-thunk";

// 2. Libraries imports
import Web3 from "web3";
import { EventActions, generateStore } from "@drizzle/store";
import { toast } from "react-toastify";

// 3. internal imports
import appReducers from "redux/reducers";

const contractEventNotifier = (store) => (next) => (action) => {
    if (action.type === EventActions.EVENT_FIRED) {
        const contract = action.name;
        const contractEvent = action.event.event;
        // const contractNewBalance = action.event.returnValues.newBalance;
        // const display = `${contract}(${contractEvent}): ${contractNewBalance}`;
        const display = `${contractEvent}: Successful`;
        // interact with your service
        toast.success(display, { position: toast.POSITION.TOP_RIGHT });
        console.log("Contract event fired", display);
    }
    return next(action);
};

const appMiddlewares = [thunk, contractEventNotifier];

export const drizzleOptions = {
    drizzleOptions: {
        contracts: [],
        web3: {
            customProvider: Web3.givenProvider,
        },
    },
    polls: {
        blocks: 15000,
    },
    syncAlways: true,
    appMiddlewares,
    appReducers,
    disableReduxDevTools: false, // enable ReduxDevTools!
};

const store = generateStore(drizzleOptions);
export default store;
