import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { networkSelector } from "redux/selectors/drizzle";

const url_map = require("constants/url_map.json");
const address_map = require("constants/address_map.json");

export default (unit) => {
    const currentNetworkName = useSelector(networkSelector);

    const [usdPrice, setUsdPrice] = useState(null);

    useEffect(() => {
        let timer;
        let isMounted = true; // manage async call when unmounted

        // TODO extract new code with the rest from component in DF-170, consider also extracting this API call if need to be reused
        const getPrices = () => {
            if (!url_map[currentNetworkName].markets_url) return; // TODO markets_url for rinkeby is gotten from main for now, consider replacing with proper url

            // This call is made for each coin in the table, would benefit from making this call only once,
            // TODO decide later (after refactor tasks) if it should be called at a higher order and dispatched to redux and/or throttled directly
            fetch(url_map[currentNetworkName].markets_url)
                .then((res) => {
                    return res.text();
                })
                .then((data) => {
                    if (data) {
                        const obj_data = JSON.parse(data);

                        const marketsData = obj_data.find((market) =>
                            Object.prototype.hasOwnProperty.call(
                                market,
                                address_map[currentNetworkName][
                                    `address_${unit}`
                                ]
                            )
                        );

                        if (isMounted)
                            setUsdPrice(
                                `${
                                    marketsData[
                                        address_map[currentNetworkName][
                                            `address_${unit}`
                                        ]
                                    ].price
                                }`
                            );
                    }

                    timer = setTimeout(getPrices, 15 * 1000);
                });
        };

        if (currentNetworkName !== undefined) getPrices();

        return () => {
            if (timer) clearTimeout(timer);

            isMounted = false;
        };
    }, [currentNetworkName, unit]);

    return usdPrice;
};
