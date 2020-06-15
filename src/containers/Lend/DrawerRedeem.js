import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/UI/Drawer/Drawer";
import { onRedeemAction } from "redux/actions/data/lend";

import useUSDPrice from "hooks/useUSDPrice";

import { formatNumber, fromWei, toWei } from "utils/front-end";

const DrawerRedeemContainer = ({ asset, drizzle, onRedeemAction }) => {
    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.wallet, asset.unit));

    const [enableRedeem, setEnableRedeem] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = web3.utils
                .toBN(toWei(amount, asset.unit))
                .lte(web3.utils.toBN(asset.balance));
            setEnableRedeem(isAmountLTBalance);
        }
    }, [amount, asset.balance, asset.unit]);

    const usdPrice = useUSDPrice(asset.unit);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Redeem"
            triggerButtonColor="secondary"
            triggerButtonVariant="outlined"
            enableButtonClick={enableRedeem}
            onButtonClick={({ asset, amount }) =>
                onRedeemAction({ drizzle, asset, amount })
            }
            isDoingAction={asset.redeeming}
            usdPrice={usdPrice}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
            mainTitle={`Redeem ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Supplied: ${formatNumber(asset.balance, asset.unit)}`}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onRedeemAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(DrawerRedeemContainer);
