import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/UI/Drawer/Drawer";
import { onRedeemAction } from "redux/actions/data/lend";

import { formatNumber, fromWei, toWei, formatETHMoney } from "utils/ui";

import useFetchPrice from "hooks/useFetchPrice";
import { getUSDPrice } from "redux/selectors/totalBalance";

const DrawerRedeemContainer = ({ asset, drizzle, onRedeemAction }) => {
    useFetchPrice(true); // gets current USD price
    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.balance, asset.unit));

    const [enableRedeem, setEnableRedeem] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = web3.utils
                .toBN(toWei(amount, asset.unit))
                .lte(web3.utils.toBN(asset.balance));
            setEnableRedeem(isAmountLTBalance);
        }
    }, [amount, asset.balance, asset.unit]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Withdraw"
            triggerButtonColor="secondary"
            triggerButtonVariant="outlined"
            enableButtonClick={enableRedeem}
            onButtonClick={() => onRedeemAction({ drizzle, asset, amount })}
            isDoingAction={asset.redeeming}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
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
