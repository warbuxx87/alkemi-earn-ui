// Section 1: Imports (Low level & from application)
import React from "react";
import AppBar from "../AppBar";

import { render, screen } from "@testing-library/react";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// Section 2: Constants & Helper functions
const DEMO_ETH_ADDRESS = "0xA13C9A32BcDB89e58c411941304E7e606f1b4c22";
const EXPECTED_ADDRESS = "0xA1...4c22";

// Section 3: The Tests
describe("AppBar component", () => {
    it("renders without crashing", () => {
        render(<AppBar></AppBar>);
    });

    it("has connectAddressButton's value set to Connect on load and to a shortened address when the prop change", () => {
        // Rendering AppBar while getting getByTestId (which will allow to get elements set with tag "data-testid") and rerender (which will allow to re-render the same component (with different props))
        const { rerender } = render(<AppBar></AppBar>);

        const connectAddressButtonContent = screen.getByTestId(
            "connectAddressButton"
        ).textContent;

        // value of connectAddressButtonContent should be 'Connect'
        expect(connectAddressButtonContent).toBe("Connect");

        rerender(<AppBar accountAddress={DEMO_ETH_ADDRESS}></AppBar>);

        // value of connectAddressButtonContent should be EXPECTED_ADDRESS
        expect(screen.getByTestId("connectAddressButton").textContent).toBe(
            EXPECTED_ADDRESS
        );
    });

    it("has title's value change when the prop change", async () => {
        // Setting the initialWidth as material-ui's mediaqueries do not react to window resize (as per the docs), this method works like a charm
        let theme = createMuiTheme({
            props: { MuiWithWidth: { initialWidth: "lg" } },
        });

        const { rerender } = render(
            <MuiThemeProvider theme={theme}>
                <AppBar title="Dashboard" />
            </MuiThemeProvider>
        );

        expect(screen.getByTestId("title").textContent).toBe("Dashboard");

        rerender(
            <MuiThemeProvider theme={theme}>
                <AppBar title="Borrow" />
            </MuiThemeProvider>
        );

        expect(screen.getByTestId("title").textContent).not.toBe("Dashboard");
        expect(screen.getByTestId("title").textContent).toBe("Borrow");

        // changing mediaQuery size
        theme = createMuiTheme({
            props: { MuiWithWidth: { initialWidth: "xs" } },
        });

        rerender(
            <MuiThemeProvider theme={theme}>
                <AppBar title="Borrow" />
            </MuiThemeProvider>
        );

        // Hidden on small screens
        expect(screen.queryByTestId("title")).toBeNull(); // notice queryByTestId here instead of getByTestId
    });
});
