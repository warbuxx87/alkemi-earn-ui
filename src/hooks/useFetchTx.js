import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { networkSelector } from "redux/selectors/drizzle";
import { getUserAddress } from "redux/selectors/data/user";

import { fetchTx } from "redux/actions/data/tx";

// Retrieve the tx List every 60 seconds from EtherScan
export default (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(networkSelector);
    const address = useSelector(getUserAddress);

    useEffect(() => {
        let timer;

        const getTxList = () => {
            dispatch(fetchTx({ currentNetworkName, address }));

            if (fetchPeriodically === true) {
                timer = setTimeout(getTxList, 60 * 1000);
            }
        };

        if (currentNetworkName !== undefined) {
            getTxList();
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [address, currentNetworkName, dispatch, fetchPeriodically]);
};
