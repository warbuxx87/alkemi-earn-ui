import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { walletNetworkName } from "redux/selectors/onboard";

import { fetchTx } from "redux/actions/data/tx";

import { walletAddress } from "redux/selectors/onboard";

// Retrieve the tx List every 60 seconds from EtherScan
export default (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);
    const address = useSelector(walletAddress);

    useEffect(
        (fetchPeriodically) => {
            let timer;

            const getTxList = (fetchPeriodically) => {
                dispatch(fetchTx({ currentNetworkName, address }));

                if (fetchPeriodically === true) {
                    timer = setTimeout(getTxList, 60 * 1000);
                }
            };

            if (currentNetworkName !== undefined) {
                getTxList(fetchPeriodically); // if fetchPeriodically is false, it will trigger the fetch right away (unlike in the other useFetch in the app)
            }

            return () => {
                if (timer) clearTimeout(timer);
            };
        },
        [address, currentNetworkName, dispatch, fetchPeriodically]
    );
};
