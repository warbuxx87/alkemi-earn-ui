import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { walletNetworkName } from "redux/selectors/data/onboard";

import { fetchLiquidations } from "redux/actions/data/liquidations";

// Retrieve the liquidations (optionally every 15 seconds)
export default (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);

    useEffect(() => {
        let timer;

        const getLiquidations = () => {
            dispatch(
                fetchLiquidations({
                    currentNetworkName,
                })
            );

            if (fetchPeriodically === true) {
                timer = setTimeout(getLiquidations, 15 * 1000);
            }
        };

        if (currentNetworkName !== undefined) {
            getLiquidations();
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [currentNetworkName, dispatch, fetchPeriodically]);
};
