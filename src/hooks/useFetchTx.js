// Section 1: React/Redux low level imports
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports
import { walletNetworkName } from "redux/selectors/onboard";

import DrizzleContext from "utils/DrizzleContext";

import { fetchTx } from "redux/actions/data/tx";
import { getBlocksData } from "redux/selectors/data/history";

import { walletAddress } from "redux/selectors/onboard";

// Retrieve the tx List every 60 seconds from EtherScan
export default (fetchPeriodically = false) => {
    const drizzle = useContext(DrizzleContext);
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);
    const address = useSelector(walletAddress);

    const blocksData = useSelector(getBlocksData); // blocks TXs above were fired on (and their timestamp)

    useEffect(
        (fetchPeriodically) => {
            let timer;

            const getTxList = (fetchPeriodically) => {
                dispatch(
                    fetchTx({
                        currentNetworkName,
                        address,
                        drizzle,
                        blocksData,
                    })
                );

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
