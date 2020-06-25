import { connectRouter } from "connected-react-router";
import { i18nReducer } from "react-redux-i18n";

import { history } from "../enhancers/middlewares/router";
import ui from "./ui";
import status from "./status";
import data from "./data";

const rootReducer = {
    i18n: i18nReducer,
    ui,
    status,
    data,
    router: connectRouter(history),
};

export default rootReducer;
