import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchAlkPriceCall } from "redux/actions/data/rewards";

// Retrieve the ALK USD price every 30 seconds
const useFetchALKPrice = (fetchPeriodically = false) => {
    const dispatch = useDispatch();

    useEffect(() => {
        let timer;

        // move this async call to redux if needs to be called from more than one place
        const get_ALK_price = () => {
            fetchAlkPriceCall({ dispatch });
        };

        const getALKPriceData = (fetchPeriodically) => {
            get_ALK_price(); // only retrieve data when wallet is connected to avoid unnecessary calls

            if (fetchPeriodically === true) {
                timer = setTimeout(
                    () => getALKPriceData(fetchPeriodically),
                    30 * 1000
                );
            }
        };

        getALKPriceData(fetchPeriodically); // only retrieve data when wallet is connected to avoid unnecessary calls

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [fetchPeriodically]);
};

export default useFetchALKPrice;
