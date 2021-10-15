import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchLiquidations } from "redux/actions/data/liquidations";

import { walletNetworkName } from "redux/selectors/data/onboard";
import { getPool } from "redux/selectors/status/pool";

// Retrieve the liquidations (optionally every 15 seconds)
const useFetchLiquidations = (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);
    const currentPool = useSelector(getPool);

    useEffect(() => {
        let timer;

        const getLiquidations = (fetchPeriodically, forceRefresh = false) => {
            dispatch(
                fetchLiquidations({
                    currentNetworkName,
                    currentPool,
                    forceRefresh,
                })
            );

            if (fetchPeriodically === true) {
                timer = setTimeout(
                    () => getLiquidations(fetchPeriodically),
                    10 * 1000
                );
            }
        };

        if (currentNetworkName !== undefined) {
            getLiquidations(fetchPeriodically, true);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [currentNetworkName, currentPool, dispatch, fetchPeriodically]);
};

export default useFetchLiquidations;
