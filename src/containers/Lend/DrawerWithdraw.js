// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// import web3 from "web3";

// Section 2: internal imports
import Drawer from "components/UI/Drawer/Drawer";
import { onWithdrawAction } from "redux/actions/data/lend";

import { formatNumber, fromWei, formatETHMoney } from "utils/ui";

import DrizzleContext from "utils/DrizzleContext";

// Section 3: Selectors
import { getUSDPrice } from "redux/selectors/totalBalance";
import { walletAddress, walletNetwork } from "redux/selectors/onboard";

const DrawerWithdrawContainer = ({ asset, onWithdrawAction }) => {
    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");
    const onSetMax = () => setAmount(fromWei(asset.balance, asset.unit));

    const [enableWithdraw, setEnableWithdraw] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = amount > 0 ? true : false;
            // web3.utils
            //     .toBN(toWei(amount, asset.unit))
            //     .lte(web3.utils.toBN(asset.balance));
            setEnableWithdraw(isAmountLTBalance);
        }
    }, [amount, asset.balance, asset.unit]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Withdraw"
            triggerButtonColor="secondary"
            triggerButtonVariant="outlined"
            enableButtonClick={enableWithdraw}
            onButtonClick={() =>
                onWithdrawAction({
                    drizzle,
                    userWalletNetwork,
                    userWalletAddress,
                    asset,
                    amount,
                })
            }
            isDoingAction={asset.withdrawing}
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
    bindActionCreators({ onWithdrawAction }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    DrawerWithdrawContainer
);
