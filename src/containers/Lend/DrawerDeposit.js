// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// import web3 from "web3";

// Section 2: internal imports
import Drawer from "components/UI/Drawer/Drawer";

import DrizzleContext from "utils/DrizzleContext";

import { onDepositAction } from "redux/actions/data/lend";

import { formatNumber, fromWei, formatETHMoney } from "utils/ui";

// Section 3: Selectors
import { getUSDPrice } from "redux/selectors/data/totalBalance";
import { walletAddress, walletNetwork } from "redux/selectors/data/onboard";

const DepositDrawerContainer = ({ asset, onDepositAction }) => {
    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");
    const [shouldSendMax, setShouldSendMax] = React.useState(false);

    const onSetAmount = (newValue) => {
        setShouldSendMax(false);

        setAmount(newValue);
    };

    const onSetMax = () => {
        setShouldSendMax(true);

        setAmount(fromWei(asset.wallet, asset.unit));
    };

    const [enableDeposit, setEnableDeposit] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            const isAmountLTBalance = amount > 0 ? true : false;
            // web3.utils
            //     .toBN(toWei(amount, asset.unit))
            //     .lte(web3.utils.toBN(asset.wallet));
            setEnableDeposit(isAmountLTBalance);
        }
    }, [amount, asset.wallet, asset.unit]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Deposit"
            triggerButtonVariant="contained"
            enableButtonClick={enableDeposit}
            onButtonClick={() =>
                onDepositAction({
                    drizzle,
                    userWalletNetwork,
                    userWalletAddress,
                    asset,
                    amount,
                    shouldSendMax,
                })
            }
            isDoingAction={asset.depositing}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={onSetAmount}
            mainTitle={`Deposit ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Wallet: ${formatNumber(asset.wallet, asset.unit)}`}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onDepositAction }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    DepositDrawerContainer
);
