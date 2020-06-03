import Web3 from "web3";
import { EventActions } from "@drizzle/store";
import thunk from "redux-thunk";

import { generateStore } from "@drizzle/store";

import appReducers from "redux/reducers";

const contractEventNotifier = store => next => action => {
    if (action.type === EventActions.EVENT_FIRED) {
        const contract = action.name;
        const contractEvent = action.event.event;
        const contractMessage = action.event.returnValues._message;
        const display = `${contract}(${contractEvent}): ${contractMessage}`;

        // interact with your service
        console.log("Contract event fired", display);
    }
    return next(action);
};

const appMiddlewares = [thunk, contractEventNotifier];

export const drizzleOptions = {
    drizzleOptions: {
        contracts: [],
        web3: {
            customProvider: Web3.givenProvider
        }
    },
    polls: {
        blocks: 6000
    },
    syncAlways: true,
    appMiddlewares,
    appReducers,
    disableReduxDevTools: false // enable ReduxDevTools!
};

const store = generateStore(drizzleOptions);
export default store;
