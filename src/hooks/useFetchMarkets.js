import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { walletNetworkName } from "redux/selectors/data/onboard";

import { fetchMarketsCall } from "redux/actions/data/markets";

// Retrieve the USD price every 15 seconds
const useFetchMarkets = (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);

    useEffect(() => {
        let timer;

        // move this async call to redux if needs to be called from more than one place
        const get_markets_data = () => {
            // We retrieve data for both pools
            fetchMarketsCall({
                currentNetworkName,
                poolToRetrieve: "permissioned",
                dispatch,
            });

            fetchMarketsCall({
                currentNetworkName,
                poolToRetrieve: "open",
                dispatch,
            });
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
    }, [dispatch, fetchPeriodically, currentNetworkName]);
};

export default useFetchMarkets;
