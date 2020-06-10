import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";

import useUSDPrice from "hooks/useUSDPrice";

import { formatNumber, fromWei, toWei } from "utils/front-end";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/UI/Drawer";
import onRepayAction from "containers/Borrow/RepayMethod";

const DrawerRepayContainer = ({ asset, drizzle, onRepayAction }) => {
    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.balance, asset.unit));

    const [enableRepay, setEnableRepay] = React.useState(false);
    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = web3.utils
                .toBN(toWei(amount, asset.unit))
                .lte(web3.utils.toBN(asset.balance));
            setEnableRepay(isAmountLTBalance);
        }
    }, [amount, asset.balance, asset.unit]);

    const usdPrice = useUSDPrice(asset.unit);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Repay"
            triggerButtonVariant="outlined"
            triggerButtonColor="secondary"
            enableButtonClick={enableRepay}
            onButtonClick={({ asset, amount }) =>
                onRepayAction({ drizzle, asset, amount })
            }
            isDoingAction={asset.repaying}
            usdPrice={usdPrice}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
            mainTitle={`Repay ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Borrowed: ${formatNumber(asset.balance, asset.unit)}`}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onRepayAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(DrawerRepayContainer);
