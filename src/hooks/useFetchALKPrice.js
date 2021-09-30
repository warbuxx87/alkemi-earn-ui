import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { isWalletConnected } from "redux/selectors/data/onboard";

// Retrieve the ALK USD price every 30 seconds
const useFetchALKPrice = (fetchPeriodically = false) => {
    const walletConnected = useSelector(isWalletConnected);

    const [ALKUSDPrice, setALKUSDPrice] = useState(0);

    useEffect(() => {
        let timer;

        // move this async call to redux if needs to be called from more than one place
        const get_ALK_price = () => {
            const alk_price_api =
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=alkemi-network-dao-token";

            fetch(alk_price_api)
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                    if (data) {
                        let obj_data = JSON.parse(data);

                        setALKUSDPrice(obj_data[0].current_price);
                    }
                });
        };

        const getALKPriceData = (fetchPeriodically) => {
            if (walletConnected) get_ALK_price(); // only retrieve data when wallet is connected to avoid unnecessary calls

            if (fetchPeriodically === true) {
                timer = setTimeout(
                    () => getALKPriceData(fetchPeriodically),
                    30 * 1000
                );
            }
        };

        if (walletConnected) getALKPriceData(fetchPeriodically); // only retrieve data when wallet is connected to avoid unnecessary calls

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [fetchPeriodically, walletConnected]);

    return { ALKUSDPrice };
};

export default useFetchALKPrice;
