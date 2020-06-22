import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/UI/Drawer/Drawer";
import { onSupplyAction } from "redux/actions/data/lend";

import useUSDPrice from "hooks/useUSDPrice";

import { formatNumber, fromWei, toWei } from "utils/ui";

const SupplyDrawerContainer = ({ asset, drizzle, onSupplyAction }) => {
    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.wallet, asset.unit));

    const [enableSupply, setEnableSupply] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = web3.utils
                .toBN(toWei(amount, asset.unit))
                .lte(web3.utils.toBN(asset.wallet));
            setEnableSupply(isAmountLTBalance);
        }
    }, [amount, asset.wallet, asset.unit]);

    const usdPrice = useUSDPrice(asset.unit);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Supply"
            triggerButtonVariant="contained"
            enableButtonClick={enableSupply}
            onButtonClick={({ asset, amount }) =>
                onSupplyAction({ drizzle, asset, amount })
            }
            isDoingAction={asset.supplying}
            usdPrice={usdPrice}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
            mainTitle={`Supply ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Wallet: ${formatNumber(asset.wallet, asset.unit)}`}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onSupplyAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(SupplyDrawerContainer);
