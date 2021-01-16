// Injects drizzle
import React from "react";

import "assets/scss/style.scss";
import store, { drizzleOptions } from "./drizzleStore.js";

import { Drizzle } from "@drizzle/store";

import DrizzleContext from "utils/DrizzleContext";

export default ({ children }) => {
    const [drizzle, setDrizzle] = React.useState();
    // const [needToLoadWeb3, setNeedToLoadWeb3] = React.useState(false);
    const [alreadyInit, setAlreadyInit] = React.useState(false);

    const initDrizzle = () => {
        if (alreadyInit) return;

        setDrizzle(new Drizzle(drizzleOptions, store));
        setAlreadyInit(true);
    };

    return (
        <DrizzleContext.Provider value={{ drizzle, initDrizzle }}>
            {children}
        </DrizzleContext.Provider>
    );
};
