import Web3 from "web3";
import { generateStore } from '@drizzle/store'
import { EventActions } from "drizzle";
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

const appMiddlewares = [contractEventNotifier];

export const options = {
  drizzleOptions: {
    contracts: [],
    web3: {
      customProvider: Web3.givenProvider
    }
  },
  appMiddlewares,
  appReducers,
  disableReduxDevTools: false // enable ReduxDevTools!
}

const store = generateStore(options)
 
export default store

