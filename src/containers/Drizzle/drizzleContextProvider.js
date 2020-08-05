// Injects drizzle
import React from "react";
import { useSelector } from "react-redux";
import { DrizzleProvider } from "@drizzle/react-plugin";

import "assets/scss/style.scss";
import store, { drizzleOptions } from "./drizzleStore.js";

import { Drizzle, generateStore } from "@drizzle/store";

import { isWalletConnected } from "redux/selectors/onboard";

import DrizzleContext from "./DrizzleContext";

//const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, store);

export default ({ children }) => {
    const shouldInjectDrizzle = useSelector(isWalletConnected);

    return true ? (
        <DrizzleContext.Provider value={drizzle}>
            {children}
        </DrizzleContext.Provider>
    ) : (
        children
    );
};
