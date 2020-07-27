// Section 1: Imports (Low level & from application)
import React from "react";
import MobileMenu from "../MobileMenu";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { render, screen, fireEvent } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "containers/Drizzle/drizzleStore.js"; // TODO: Decide between using this real store generator, or a fake barebones one

// Section 2: Constants & Helper functions

// Section 3: The Tests
describe("MobileMenu component", () => {
    it("renders without crashing", () => {
        render(<MobileMenu></MobileMenu>);
    });

    it("starts with menu closed", () => {
        // Setting the initialWidth as material-ui's mediaqueries do not react to window resize (as per the docs), this method works like a charm
        let theme = createMuiTheme({
            props: { MuiWithWidth: { initialWidth: "xs" } },
        });

        render(
            <Router>
                <Provider store={store}>
                    <MuiThemeProvider theme={theme}>
                        <MobileMenu />
                    </MuiThemeProvider>
                </Provider>
            </Router>
        );

        expect(screen.queryByTestId("menuDrawer")).toBeNull(); // notice queryByTestId here instead of getByTestId
    });

    it("open menu when openMenu button gets clicked", () => {
        // Setting the initialWidth as material-ui's mediaqueries do not react to window resize (as per the docs), this method works like a charm
        let theme = createMuiTheme({
            props: { MuiWithWidth: { initialWidth: "xs" } },
        });

        render(
            <Router>
                <Provider store={store}>
                    <MuiThemeProvider theme={theme}>
                        <MobileMenu />
                    </MuiThemeProvider>
                </Provider>
            </Router>
        );

        expect(screen.queryByTestId("menuDrawer")).toBeNull(); // notice queryByTestId here instead of getByTestId

        fireEvent.click(screen.getByTestId("openMenu"));

        expect(screen.queryByTestId("menuDrawer")).not.toBeNull(); // notice queryByTestId here instead of getByTestId
    });
});
