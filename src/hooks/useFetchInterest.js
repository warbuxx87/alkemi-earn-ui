// Section 1: React/Redux low level imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Section 2: internal imports
import {
    walletNetworkName,
    isWalletConnected,
} from "redux/selectors/data/onboard";

import { fetchInterest } from "redux/actions/data/lend";

import { walletAddress } from "redux/selectors/data/onboard";

const useFetchInterest = (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    const walletConnected = useSelector(isWalletConnected); // Kind of useless to use here but won't hurt (hopefully)
    const currentNetworkName = useSelector(walletNetworkName);
    const address = useSelector(walletAddress);

    useEffect(
        (fetchPeriodically) => {
            let timer;

            const assets = ["DAI", "USDC", "WBTC", "WETH"];

            const getInterest = (fetchPeriodically) => {
                assets.forEach((asset) => {
                    dispatch(
                        fetchInterest({
                            currentNetworkName,
                            address,
                            asset,
                        })
                    );
                });

                if (fetchPeriodically === true) {
                    timer = setTimeout(getInterest, 5 * 60 * 1000); // fetch every 5 minutes, totally arbitrary interval
                }
            };

            if (walletConnected && currentNetworkName !== undefined) {
                getInterest(fetchPeriodically); // if fetchPeriodically is false, it will trigger the fetch right away (unlike in the other useFetch in the app)
            }

            return () => {
                if (timer) clearTimeout(timer);
            };
        },
        [
            address,
            currentNetworkName,
            walletConnected,
            fetchPeriodically,
            dispatch,
        ]
    );
};

export default useFetchInterest;
