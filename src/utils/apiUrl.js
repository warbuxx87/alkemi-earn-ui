const networks = {
    main: {
        permissioned: process.env.REACT_APP_API_BASE_URL_MAIN_PERMISSIONED,
        open: process.env.REACT_APP_API_BASE_URL_MAIN_OPEN,

        // Add 1.5 proper URL pools when available
        permissioned_1_5:
            process.env.REACT_APP_API_BASE_URL_MAIN_PERMISSIONED_1_5,
        open_1_5: process.env.REACT_APP_API_BASE_URL_MAIN_OPEN_1_5,
    },
    rinkeby: {
        permissioned: process.env.REACT_APP_API_BASE_URL_RINKEBY_PERMISSIONED,
        open: process.env.REACT_APP_API_BASE_URL_RINKEBY_OPEN,
        permissioned_1_5:
            process.env.REACT_APP_API_BASE_URL_RINKEBY_PERMISSIONED_1_5,
        open_1_5: process.env.REACT_APP_API_BASE_URL_RINKEBY_OPEN_1_5,
    },
};

export const generateUrl = (network, pool, route) => {
    if (
        network &&
        pool &&
        route &&
        networks[network.toLowerCase()] &&
        networks[network.toLowerCase()][pool.toLowerCase()]
    ) {
        return `${networks[network.toLowerCase()][pool.toLowerCase()]}${route}`;
    }
    return null;
};

export const getHistoryUrl = (network, pool) => {
    return generateUrl(network, pool, "/history");
};
export const getMarketsUrl = (network, pool) => {
    return generateUrl(network, pool, "/markets");
};
export const getAccountsUrl = (network, pool) => {
    return generateUrl(network, pool, "/accounts");
};
export const getLiquidationsUrl = (network, pool) => {
    return generateUrl(network, pool, "/liquidations");
};
export const getReportsUrl = (network, pool) => {
    return generateUrl(network, pool, "/reports");
};
export const getInterestUrl = (network, pool) => {
    return generateUrl(network, pool, "/interest");
};
