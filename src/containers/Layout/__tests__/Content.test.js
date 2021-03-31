import React from "react";

// import Dashboard from "containers/Dashboard/Dashboard";
// import Lend from "containers/Lend/Lend";
// import Borrow from "containers/Borrow/Borrow";
// import Markets from "containers/Markets/Markets";
// import History from "containers/History/History";
// import Liquidate from "containers/Liquidate/Liquidate";
// import Swap from "containers/Swap/Swap";
// import NoWhere from "components/NoWhere/NoWhere";

// import {
//     DASHBOARD,
//     LEND,
//     BORROW,
//     MARKETS,
//     HISTORY,
//     LIQUIDATE,
//     SWAP,
// } from "constants/routes";

import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "containers/Drizzle/drizzleStore.js";

import LayoutContent from "../Content";

describe("<LayoutContent />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = render(
            <Provider store={store}>
                <Router>
                    <LayoutContent />
                </Router>
            </Provider>
        );
    });

    it("matches snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
