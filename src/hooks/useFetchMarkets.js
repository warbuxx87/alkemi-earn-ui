import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { walletNetworkName } from "redux/selectors/data/onboard";
import { getPool } from "redux/selectors/status/pool";

import { fetchMarketsCall } from "redux/actions/data/markets";

// Retrieve the USD price every 15 seconds
const useFetchMarkets = (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);

    const currentPool = useSelector(getPool);

    const [lastPool, setLastPool] = useState("");

    useEffect(() => {
        setLastPool(currentPool);
    }, [currentPool]);

    useEffect(() => {
        let timer;

        // move this async call to redux if needs to be called from more than one place
        const get_markets_data = () => {
            if (lastPool == currentPool)
                fetchMarketsCall({
                    currentNetworkName,
                    currentPool,
                    lastPool,
                    dispatch,
                }); // prevent slower resolution and verified data overriding open data due to the fact that verified pool is the default one
        };

        const getMarketsData = (fetchPeriodically) => {
            if (currentNetworkName !== undefined) get_markets_data();

            if (fetchPeriodically === true) {
                timer = setTimeout(
                    () => getMarketsData(fetchPeriodically),
                    30 * 1000
                );
            }
        };

        if (currentNetworkName !== undefined) getMarketsData(fetchPeriodically);

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [
        dispatch,
        fetchPeriodically,
        currentNetworkName,
        currentPool,
        lastPool,
    ]);
};

export default useFetchMarkets;
