// 1. React/Redux low level imports
import thunk from "redux-thunk";

// 2. Libraries imports
import { generateStore } from "@drizzle/store";
import web3 from "web3";

// 3. internal imports
import appReducers from "redux/reducers";
import contractTXNotifier from "utils/notify";
import txHandler from "utils/txHandler";
import MoneyMarket from "contracts/MoneyMarket.json";

const appMiddlewares = [thunk, txHandler, contractTXNotifier];

const setUsedProvider = () => {
    return window.currentlyUsedProvider;
};

const setFallback = () => {
    return new web3(
        "wss://rinkeby.infura.io/ws/v3/6d08631addb0433e967d2cf625cd6495"
    );
};

export const drizzleOptions = {
    drizzleOptions: {
        contracts: [MoneyMarket],
        events: {
            MoneyMarket: [
                "SupplyReceived",
                "SupplyWithdrawn",
                "BorrowTaken",
                "BorrowRepaid",
                "Failure",
            ],
        },
        web3: {
            customProvider: setUsedProvider(),
            fallback: setFallback(),
        },
    },
    polls: {
        blocks: 15000,
    },
    syncAlways: true,
    appMiddlewares,
    appReducers,
    disableReduxDevTools: false, // enable ReduxDevTools!
    networkWhitelist: [
        // Allows the listed networks
        1, // Mainnet
        3, // Ropsten
        4, // Rinkeby
        //    5, // Goerli
        42, // Kovan
    ],
};

const store = generateStore(drizzleOptions);
export default store;
