// Section 1: Imports (Low level & from application)
import React from "react";
import AppBar from "../AppBar";

import { render, screen } from "@testing-library/react";

import {
    createTheme,
    ThemeProvider,
    StyledEngineProvider,
    adaptV4Theme,
} from "@mui/material/styles";

import ComponentsWrapper from "utils/tests-utils/ComponentsWrapper";

// Section 2: Constants & Helper functions
const DEMO_ETH_ADDRESS = "0xA13C9A32BcDB89e58c411941304E7e606f1b4c22";
const EXPECTED_ADDRESS = "0xA1..4c22";

// Section 3: The Tests
describe("AppBar component", () => {
    it("renders without crashing", () => {
        render(
            <ComponentsWrapper>
                <AppBar />
            </ComponentsWrapper>
        );
    });

    it("has connectAddressButton's value set to Connect on load and to a shortened address when the prop change", () => {
        // Rendering AppBar while getting getByTestId (which will allow to get elements set with tag "data-testid") and rerender (which will allow to re-render the same component (with different props))
        const { rerender } = render(
            <ComponentsWrapper>
                <AppBar />
            </ComponentsWrapper>
        );

        const connectButtonContent =
            screen.getByTestId("connectButton").textContent;

        // value of connectButtonContent should be 'Connect'
        expect(connectButtonContent).toBe("Connect");

        rerender(
            <ComponentsWrapper>
                <AppBar
                    accountAddress={DEMO_ETH_ADDRESS}
                    walletConnected={true}
                />
            </ComponentsWrapper>
        );

        // value of addressButtonContent should be EXPECTED_ADDRESS
        expect(screen.getByTestId("addressButton").textContent).toBe(
            EXPECTED_ADDRESS
        );
    });

    it("has title's value change when the prop change", async () => {
        // Setting the initialWidth as material-ui's mediaqueries do not react to window resize (as per the docs), this method works like a charm
        let theme = createTheme(
            adaptV4Theme({
                props: { MuiWithWidth: { initialWidth: "lg" } },
            })
        );

        const { rerender } = render(
            <ComponentsWrapper>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <AppBar title="Dashboard" />
                    </ThemeProvider>
                </StyledEngineProvider>
            </ComponentsWrapper>
        );

        expect(screen.getByTestId("title").textContent).toBe("Dashboard");

        rerender(
            <ComponentsWrapper>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <AppBar title="Borrow" />
                    </ThemeProvider>
                </StyledEngineProvider>
            </ComponentsWrapper>
        );

        expect(screen.getByTestId("title").textContent).not.toBe("Dashboard");
        expect(screen.getByTestId("title").textContent).toBe("Borrow");

        // changing mediaQuery size
        theme = createTheme(
            adaptV4Theme({
                props: { MuiWithWidth: { initialWidth: "xs" } },
            })
        );

        rerender(
            <ComponentsWrapper>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <AppBar title="Borrow" />
                    </ThemeProvider>
                </StyledEngineProvider>
            </ComponentsWrapper>
        );

        // Hidden on small screens
        expect(screen.queryByTestId("title")).toBeNull(); // notice queryByTestId here instead of getByTestId
    });
});
