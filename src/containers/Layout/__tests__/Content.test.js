import React from "react";

import {
    DASHBOARD,
    // LEND,
    // BORROW,
    // MARKETS,
    // HISTORY,
    LIQUIDATE,
    // SWAP,
} from "constants/routes";

import { render, screen } from "@testing-library/react";

import { createMemoryHistory } from "history";

import { Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "containers/Drizzle/drizzleStore.js";

import LayoutContent from "../Content";

describe("<LayoutContent />", () => {
    let wrapper;
    let history;

    beforeEach(() => {
        history = createMemoryHistory();
        wrapper = render(
            <Provider store={store}>
                <Router history={history}>
                    <LayoutContent />
                </Router>
            </Provider>
        );
    });

    it("<LayoutContent /> is displaying nowhere component content", () => {
        expect(screen.getByText("Oops... It seems that you are lost!"));
    });

    // it("<LayoutContent /> is displaying dashboard component content", () => {
    //     history.push(DASHBOARD);

    //     // following checks could be highly improved
    //     expect(screen.getByText("Aggregated Value"));
    //     expect(screen.getByText("Combined APY"));

    //     expect(screen.getByText("Lending Overview"));
    //     expect(screen.getByText("Borrowing Overview"));
    //     expect(screen.getByText("Borrow Limit"));

    //     expect(screen.getByText("Active Deposits"));
    //     expect(screen.getByText("Active Borrowed"));
    // });

    it("<LayoutContent /> does not display liquidate content", () => {
        history.push(LIQUIDATE);

        expect(screen.getByText("Oops... It seems that you are lost!"));
    });

    it("matches snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
