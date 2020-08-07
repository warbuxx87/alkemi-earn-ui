// Injects drizzle
import React from "react";

import "assets/scss/style.scss";
import store, { drizzleOptions } from "./drizzleStore.js";

import { Drizzle } from "@drizzle/store";

import DrizzleContext from "./DrizzleContext";

//const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, store);

export default ({ children }) => {
    return (
        <DrizzleContext.Provider value={drizzle}>
            {children}
        </DrizzleContext.Provider>
    );
};
