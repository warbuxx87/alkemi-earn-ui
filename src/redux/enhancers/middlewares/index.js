import { applyMiddleware } from "redux";

import router from "./router";
import history from "./history";

const middlewares = [
  router,
  history
  // other middlewares go here
];
export default applyMiddleware(...middlewares);
