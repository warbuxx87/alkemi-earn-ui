// Libs
import { matchPath } from "react-router";
import { createSelector } from "reselect";

// Constants
import { DASHBOARD, LEND, BORROW, MARKETS, HISTORY, LIQUIDATE } from "../../constants/routes";

// Item selection selector
const getPathName = (state, props) => state.router.location.pathname;
export const isItemSelected = createSelector(
    getPathName,
    pathname => !!matchPath(pathname, { path: DASHBOARD }) ||

    getPathName,
    pathname => !!matchPath(pathname, { path: LEND }) ||

    getPathName,
    pathname => !!matchPath(pathname, { path: BORROW }) ||

    getPathName,
    pathname => !!matchPath(pathname, { path: MARKETS }) ||

    getPathName,
    pathname => !!matchPath(pathname, { path: HISTORY }) ||

    getPathName,
    pathname => !!matchPath(pathname, { path: LIQUIDATE })
);
