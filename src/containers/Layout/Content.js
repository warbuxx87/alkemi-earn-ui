import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Route, Switch } from "react-router";

import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.minimal.css";

import Dashboard from "containers/Dashboard/Dashboard";
import Lend from "containers/Lend/Lend";
import Borrow from "containers/Borrow/Borrow";
import Markets from "containers/Markets/Markets";
import History from "containers/History/History";
import Liquidate from "containers/Liquidate/Liquidate";
import Swap from "containers/Swap/Swap";
import NoWhere from "components/NoWhere/NoWhere";

import {
    DASHBOARD,
    LEND,
    BORROW,
    HISTORY,
    MARKETS,
    LIQUIDATE,
    SWAP,
} from "constants/routes";

import { isLiquidator } from "redux/selectors/status/status";
import { getPool } from "redux/selectors/status/pool";

const LayoutContent = () => {
    const [isWalletLiquidator, setIsWalletLiquidator] = useState(false);

    const walletIsLiquidator = useSelector(isLiquidator);

    const currentPool = useSelector(getPool);

    useEffect(() => {
        if (currentPool == "open") {
            setIsWalletLiquidator(true);
        } else {
            setIsWalletLiquidator(walletIsLiquidator);
        }
    }, [currentPool, walletIsLiquidator]);

    return (
        <div>
            <ToastContainer />
            <Switch>
                <Route path={DASHBOARD} exact component={Dashboard} />
                <Route path={LEND} exact component={Lend} />
                <Route path={BORROW} exact component={Borrow} />
                <Route path={MARKETS} exact component={Markets} />
                <Route path={HISTORY} exact component={History} />
                <Route
                    path={LIQUIDATE}
                    exact
                    component={isWalletLiquidator ? Liquidate : NoWhere}
                />
                <Route path={SWAP} exact component={Swap} />
                <Route component={NoWhere} />
            </Switch>
        </div>
    );
};

export default LayoutContent;
