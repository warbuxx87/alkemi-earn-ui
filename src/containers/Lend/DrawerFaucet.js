import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/Lend/Drawer";
import onAllocateAction from "containers/Lend/AllocateMethod";

import useUSDPrice from "hooks/useUSDPrice";

import { fromWei } from "utils/front-end";

const DrawerFaucetContainer = ({ asset, drizzle, onAllocateAction }) => {
    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.wallet, asset.unit));

    const [enableAllocate, setEnableAllocate] = React.useState(false);

    const usdPrice = useUSDPrice(asset.unit);

    React.useEffect(() => {
        if (amount) {
            // Will eventually crash if fed a NaN, TODO: fix in DF-184
            setEnableAllocate(true);
        }
    }, [amount, asset.wallet, asset.unit]);

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
