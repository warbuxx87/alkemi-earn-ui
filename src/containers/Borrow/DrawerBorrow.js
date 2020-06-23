import React from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import { formatNumber, formatETHMoney } from "utils/ui";

import withDrizzle from "containers/Drizzle/withDrizzle";
import Drawer from "components/UI/Drawer/Drawer";
import { onBorrowAction } from "redux/actions/data/borrow";

import useFetchPrice from "hooks/useFetchPrice";
import { getUSDPrice } from "redux/selectors/totalBalance";

const BorrowDrawerContainer = ({ asset, drizzle, onBorrowAction }) => {
    useFetchPrice(true); // gets current USD price
    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");
    const onSetMax = () => {}; /*setAmount(fromWei(asset.balance, asset.unit))*/

    const [enableBorrow, setEnableBorrow] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            setEnableBorrow(true);
        }
    }, [amount, asset.balance, asset.unit]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Borrow"
            triggerButtonVariant="contained"
            enableButtonClick={enableBorrow}
            onButtonClick={({ asset, amount }) =>
                onBorrowAction({ drizzle, asset, amount })
            }
            isDoingAction={asset.borrowing}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax} // TODO: define onSetMax properly
            amount={amount}
            setAmount={setAmount}
            mainTitle={`Borrow ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Wallet: ${formatNumber(asset.wallet, asset.unit)}`}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onBorrowAction }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(BorrowDrawerContainer);
