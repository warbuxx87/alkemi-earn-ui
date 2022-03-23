// 1. React/Redux low level imports
import thunk from "redux-thunk";

// 2. Libraries imports
import { generateStore } from "@drizzle/store";

// 3. internal imports
import appReducers from "redux/reducers";
import contractTXNotifier from "utils/notify";
import txHandler from "utils/txHandler";
import { trackForLedgerApp } from "utils/trackTransaction";
import MoneyMarket from "contracts/MoneyMarket.json";

const appMiddlewares = [
    thunk,
    txHandler,
    contractTXNotifier,
    trackForLedgerApp,
];

const fallback = {
    url: "wss://mainnet.infura.io/ws/v3/6d08631addb0433e967d2cf625cd6495", // using mainnet directly seems to work directly
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
    },
    web3: {
        customProvider: window.currentlyUsedProvider,
        fallback: fallback,
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
        4, // Rinkeby
    ],
};

const store = generateStore(drizzleOptions);
export default store;
