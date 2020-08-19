// ComponentsWrapper.js
// Wraps testing-library and add support for router & redux store

import React from "react";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "containers/Drizzle/drizzleStore.js"; // TODO: Decide between using this real store generator, or a fake barebones one

const ComponentsWrapper = ({ children }) => {
    return (
        <Router>
            <Provider store={store}>{children}</Provider>
        </Router>
    );
};

export default ComponentsWrapper;
