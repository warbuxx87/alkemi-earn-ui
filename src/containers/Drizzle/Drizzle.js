import React from "react";
import { Provider } from "react-redux";
import { DrizzleProvider } from "@drizzle/react-plugin";

import "assets/scss/style.scss";
import store, { drizzleOptions } from "./drizzleStore";

export default ({ children }) => {
    const hasWeb3Provider = () => {
        const hasWeb3Provider = typeof window.ethereum !== "undefined";
        return hasWeb3Provider;
    };
    return hasWeb3Provider() ? (
        <DrizzleProvider store={store} options={drizzleOptions}>
            <Provider store={store}>{children}</Provider>
        </DrizzleProvider>
    ) : (
        <Provider store={store}>{children}</Provider>
    );
};
