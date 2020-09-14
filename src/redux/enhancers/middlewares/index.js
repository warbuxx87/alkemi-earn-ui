import { applyMiddleware } from "redux";

import router from "./router";
import thunk from "./thunk";
import sentryReduxEnhancer from "./sentry";

const middlewares = [
    router,
    thunk,
    sentryReduxEnhancer,
    // other middlewares go here
];
export default applyMiddleware(...middlewares);
