// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import { formatNumber, formatETHMoney } from "utils/ui";

import DrizzleContext from "utils/DrizzleContext";

// Section 3: Selectors, Hooks & Action Listeners
import { getUSDPrice } from "redux/selectors/data/totalBalance";
import { onTx } from "redux/actions/status/transactions";

import { walletAddress, walletNetwork } from "redux/selectors/data/onboard";

import { isWalletKYCd, getTransactions } from "redux/selectors/status";

// Section 4: Import Underlying Components / Containers
import Drawer from "components/UI/Drawer/Drawer";

// Section 5: Code Container
const BorrowDrawerContainer = ({ asset, onTx }) => {
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

        setAmount(asset.maxBorrowToken.toString()); // retrieves Maximum Token Borrow Amount
        //  setAmount(asset.safeBorrowToken.toString()); // @Ben retrieves Safe Maximum Token Borrow Amount 80% of max
    };
    const [enableBorrow, setEnableBorrow] = React.useState(false);

    const [isProcessing, setIsProcessing] = React.useState(false);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.transactionLocalId === asset.unit &&
                aTx.type === "borrow" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txs]);

    React.useEffect(() => {
        if (amount) {
            // check that User Input Amount does not exceed maximum amount of tokens that user can borrow for asset and is not less than 0
            const isAmountLTmaxBorrow = amount > 0 ? true : false;
            //      amount <= asset.maxBorrowToken && amount > 0 ? true : false;
            setEnableBorrow(isAmountLTmaxBorrow);
        }
    }, [amount, asset.balance, asset.maxBorrowToken, asset.unit, asset.wallet]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Borrow"
            triggerButtonVariant="contained"
            enableButtonClick={enableBorrow}
            onButtonClick={() =>
                onTx({
                    drizzle,
                    userWalletNetwork,
                    userWalletAddress,
                    asset,
                    amount,
                    shouldSendMax,
                    type: "borrow",
                })
            }
            isDoingAction={isProcessing}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={onSetAmount}
            mainTitle={`Borrow ${asset.unit}`}
            balanceValue={formatNumber(asset.balance, asset.unit)}
            amountValue={`Wallet: ${formatNumber(asset.wallet, asset.unit)}`}
            walletIsKYCd={walletIsKYCd}
        />
    );
};
// Section 6: Dispatch & Props Mapping
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({ onTx }, dispatch);

// Section 7: Export Container
export default compose(connect(mapStateToProps, mapDispatchToProps))(
    BorrowDrawerContainer
);
