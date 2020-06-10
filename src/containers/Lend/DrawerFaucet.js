import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { useSelector } from "react-redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/Lend/Drawer";
import onAllocateAction from "containers/Lend/AllocateMethod";

import { networkSelector } from "redux/selectors/drizzle";

import { fromWei } from "utils/front-end";

const url_map = require("constants/url_map.json");
const address_map = require("constants/address_map.json");

const DrawerFaucetContainer = ({ asset, drizzle, onAllocateAction }) => {
    const currentNetworkName = useSelector(networkSelector);

    const [usdPrice, setUsdPrice] = React.useState(null);

    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.wallet, asset.unit));

    const [enableAllocate, setEnableAllocate] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            // Will eventually crash if fed a NaN, TODO: fix in DF-184
            setEnableAllocate(true);
        }
    }, [amount, asset.wallet, asset.unit]);

    React.useEffect(() => {
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
                                    `address_${asset.unit}`
                                ]
                            )
                        );

                        if (isMounted)
                            setUsdPrice(
                                `${
                                    marketsData[
                                        address_map[currentNetworkName][
                                            `address_${asset.unit}`
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
    }, [currentNetworkName, asset.unit]);

    return (
        <Drawer
            asset={asset}
            enableAllocate={enableAllocate}
            onAllocate={({ asset, amount }) =>
                onAllocateAction({ drizzle, asset, amount })
            }
            usdPrice={usdPrice}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onAllocateAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(DrawerFaucetContainer);
