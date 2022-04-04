// ComponentsWrapper.js
// Wraps testing-library and add support for router & redux store

import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { StyledEngineProvider } from "@mui/material/styles";

import { ThemeProvider } from "@mui/material";

import defaultTheme from "themes/theme"; // use this if no custom theme is provided

import store from "containers/Drizzle/drizzleStore.js"; // TODO: Decide between using this real store generator, or a fake barebones one

const ComponentsWrapper = ({ children, theme }) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme ? theme : defaultTheme}>
                <Router>
                    <Provider store={store}>{children}</Provider>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ComponentsWrapper;
