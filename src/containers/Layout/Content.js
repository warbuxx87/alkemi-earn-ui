import React from "react";
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
import SignIn from "containers/SignIn/SignIn";
import KycDashboard from "containers/KycDashboard/KycDashboard";
import NoWhere from "components/NoWhere/NoWhere";

import {
    DASHBOARD,
    LEND,
    BORROW,
    HISTORY,
    MARKETS,
    LIQUIDATE,
    SWAP,
    SIGN_IN,
    KYC_DASHBOARD,
} from "constants/routes";

import { isLiquidator } from "redux/selectors/status/general";

const LayoutContent = () => {
    const walletIsLiquidator = useSelector(isLiquidator);

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
                    component={walletIsLiquidator ? Liquidate : NoWhere}
                />
                <Route path={SWAP} exact component={Swap} />
                <Route path={SIGN_IN} exact component={SignIn} />
                <Route path={KYC_DASHBOARD} exact component={KycDashboard} />
                <Route component={NoWhere} />
            </Switch>
        </div>
    );
};

export default LayoutContent;
