import React from "react";
import { Route, Switch } from "react-router";

import Dashboard from "components/Dashboard/Dashboard";
import Lend from "components/Lend/Lend";
import Borrow from "components/Borrow/Borrow";
import Markets from "components/Markets/Markets";
import History from "components/History/History";
import History2 from "pages/history";
import Liquidate from "components/Liquidate/Liquidate";
import NoWhere from "components/NoWhere/NoWhere";
import { DASHBOARD, LEND, BORROW, MARKETS, HISTORY, HISTORY2, LIQUIDATE } from "constants/routes";

const LayoutContent = () => (
    <Switch>
        <Route path={DASHBOARD} exact component={Dashboard} />
        <Route path={LEND} exact component={Lend} />
        <Route path={BORROW} exact component={Borrow} />
        <Route path={MARKETS} exact component={Markets} />
        <Route path={HISTORY} exact component={History} />
        <Route path={HISTORY2} exact component={History2} />
        <Route path={LIQUIDATE} exact component={Liquidate} />
        <Route component={NoWhere} />
    </Switch>
);

export default LayoutContent;
