// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// import web3 from "web3";

// Section 2: internal imports
import Drawer from "components/UI/Drawer/Drawer";
import { onTx } from "redux/actions/status/transactions";

import { formatNumber, fromWei, formatETHMoney } from "utils/ui";

import DrizzleContext from "utils/DrizzleContext";

// Section 3: Selectors
import { getUSDPrice } from "redux/selectors/data/totalBalance";
import { walletAddress, walletNetwork } from "redux/selectors/data/onboard";

import { isWalletKYCd, getTransactions } from "redux/selectors/status";

const DrawerWithdrawContainer = ({ asset, onTx }) => {
    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const walletIsKYCd = useSelector(isWalletKYCd);
    const txs = useSelector(getTransactions);

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");
    const [shouldSendMax, setShouldSendMax] = React.useState(false);

    const onSetAmount = (newValue) => {
        setShouldSendMax(false);

        setAmount(newValue);
    };

    const onSetMax = () => {
        setShouldSendMax(true);

        setAmount(fromWei(asset.balance, asset.unit));
    };

    const [enableWithdraw, setEnableWithdraw] = React.useState(false);

    const [isProcessing, setIsProcessing] = React.useState(false);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.asset === asset.unit &&
                aTx.type === "withdraw" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txs]);

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
                onTx({
                    drizzle,
                    userWalletNetwork,
                    userWalletAddress,
                    asset,
                    amount,
                    shouldSendMax,
                    type: "withdraw",
                })
            }
            isDoingAction={isProcessing}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={onSetAmount}
            mainTitle={`Redeem ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Supplied: ${formatNumber(asset.balance, asset.unit)}`}
            walletIsKYCd={walletIsKYCd}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({ onTx }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    DrawerWithdrawContainer
);
