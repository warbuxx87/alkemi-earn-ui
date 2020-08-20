import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { walletNetworkName } from "redux/selectors/onboard";

import { fetchPrice } from "redux/actions/data/price";

// Retrieve the USD price every 15 seconds
export default (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const currentNetworkName = useSelector(walletNetworkName);

    useEffect(() => {
        let timer;

        const getPrice = () => {
            dispatch(
                fetchPrice({
                    currentNetworkName,
                    address: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b", // USDC Address
                })
            );

            if (fetchPeriodically === true) {
                timer = setTimeout(getPrice, 15 * 1000);
            }
        };

        if (currentNetworkName !== undefined) {
            getPrice();
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [currentNetworkName, dispatch, fetchPeriodically]);
};
