// Section 1: React low level imports
import React from "react";
import { Switch, Route, Redirect } from "react-router";

// Section 2: internal imports
import LayoutSkeleton from "./Skeleton";
import { DASHBOARD } from "constants/routes";

const Layout = () => (
    <Switch>
        <Route path="/" exact component={() => <Redirect to={DASHBOARD} />} />
        <Route component={LayoutSkeleton} />{" "}
    </Switch>
);

export default Layout;
