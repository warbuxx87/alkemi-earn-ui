import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/UI/Drawer/Drawer";
import { onAllocateAction } from "redux/actions/data/lend";

import useUSDPrice from "hooks/useUSDPrice";

import { formatNumber, fromWei } from "utils/front-end";

const DrawerFaucetContainer = ({ asset, drizzle, onAllocateAction }) => {
    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.wallet, asset.unit));

    const [enableAllocate, setEnableAllocate] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            // Will eventually crash if fed a NaN, TODO: fix in DF-184
            setEnableAllocate(true);
        }
    }, [amount, asset.wallet, asset.unit]);

    const usdPrice = useUSDPrice(asset.unit);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Allocate"
            triggerButtonColor="secondary"
            triggerButtonVariant="outlined"
            enableButtonClick={enableAllocate}
            onButtonClick={({ asset, amount }) =>
                onAllocateAction({ drizzle, asset, amount })
            }
            isDoingAction={asset.allocating}
            usdPrice={usdPrice}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
            mainTitle={`Mint New ${asset.unit} Tokens`}
            balanceValue={`0.00`}
            amountValue={`Wallet: ${formatNumber(asset.wallet, asset.unit)}`}
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
