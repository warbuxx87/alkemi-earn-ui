// Injects drizzle
import React from "react";

import "assets/scss/style.scss";
import store, { drizzleOptions } from "./drizzleStore.js";

import { Drizzle } from "@drizzle/store";

import DrizzleContext from "utils/DrizzleContext";

const drizzle = new Drizzle(drizzleOptions, store);

const drizzleContextProvider = ({ children }) => {
    return (
        <DrizzleContext.Provider value={drizzle}>
            {children}
        </DrizzleContext.Provider>
    );
};

export default drizzleContextProvider;
