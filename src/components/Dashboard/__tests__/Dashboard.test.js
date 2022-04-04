// Section 1: Imports (Low level & from application)
import React from "react";

import Dashboard from "../Dashboard";

import { render } from "@testing-library/react";

import ComponentsWrapper from "utils/tests-utils/ComponentsWrapper";

import { ThemeProvider } from "@mui/material";

import theme from "themes/theme";

// Section 2: Constants & Helper functions

// Section 3: The Tests
describe("<App />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = render(
            <ThemeProvider theme={theme}>
                <ComponentsWrapper>
                    <Dashboard />
                </ComponentsWrapper>
            </ThemeProvider>
        );
    });

    it("matches snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
