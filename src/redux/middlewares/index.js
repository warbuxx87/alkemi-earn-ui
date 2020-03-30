import loggerMiddleware from "./logger";
import routerMiddleware from "./router";
import sagaMiddleware from "./saga";

export default (history) => {
  return [routerMiddleware(history), sagaMiddleware];
};
