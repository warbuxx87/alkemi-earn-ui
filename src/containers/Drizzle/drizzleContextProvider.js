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

    // React.useEffect(() => {
    //     console.log('drizzle: ', drizzle)

    //     if(drizzle && drizzle.web3) {
    //         console.log('window.currentlyUsedProvider: ', window.currentlyUsedProvider)
    //         drizzle.web3 = new Web3(window.currentlyUsedProvider)
    //     }
    // }, [drizzle]);

    // React.useEffect(() => {
    //     if(drizzle && drizzle.web3)
    //     console.log('drizzle.web3:', drizzle.web3)
    // }, [drizzle]);

    return (
        <DrizzleContext.Provider value={{ drizzle, initDrizzle }}>
            {children}
        </DrizzleContext.Provider>
    );
};
