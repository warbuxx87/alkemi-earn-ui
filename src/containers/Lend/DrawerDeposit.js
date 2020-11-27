// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";
import * as yup from "yup";

// Section 2: internal imports
import Drawer from "components/UI/Drawer/Drawer";

import DrizzleContext from "utils/DrizzleContext";

import { onTx } from "redux/actions/status/transactions";

import { formatNumber, fromWei, formatETHMoney, toWei } from "utils/ui";

// Section 3: Selectors
import { getUSDPrice } from "redux/selectors/data/totalBalance";
import { walletAddress, walletNetwork } from "redux/selectors/data/onboard";

import { isWalletKYCd, getTransactions } from "redux/selectors/status";

const DepositDrawerContainer = ({ asset, onTx }) => {
    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const walletIsKYCd = useSelector(isWalletKYCd);
    const txs = useSelector(getTransactions);

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");

    const onSetAmount = (newValue) => {
        setAmount(newValue);
    };

    const onSetMax = () => {
        setAmount(fromWei(asset.wallet, asset.unit));
    };

    const [enableDeposit, setEnableDeposit] = React.useState(false);

    const [isProcessing, setIsProcessing] = React.useState(false);

    React.useEffect(() => {
        const checkValidity = async () => {
            let schema = yup
                .number()
                .required()
                .positive()
                .test("maxValueTest", "You can't deposit this amount", () => {
                    return web3.utils
                        .toBN(toWei(amount, asset.unit))
                        .lte(web3.utils.toBN(asset.wallet));
                });
            setEnableDeposit(await schema.isValid(amount));
        };

        checkValidity();
    }, [amount, asset.wallet, asset.unit]);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.transactionLocalId === asset.unit &&
                aTx.type === "deposit" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txs]);

    return (
        <>
            <Drawer
                asset={asset}
                buttonsLabel="Deposit"
                triggerButtonVariant="contained"
                enableButtonClick={enableDeposit}
                onButtonClick={() =>
                    onTx({
                        drizzle,
                        userWalletNetwork,
                        userWalletAddress,
                        asset,
                        amount,
                        shouldSendMax: false, // shouldSendMax==true will send max_UINT, for this call we should not send it and set a precise amount
                        type: "deposit",
                    })
                }
                isDoingAction={isProcessing}
                usdPrice={formatETHMoney(
                    asset.price,
                    "USD",
                    asset.unit,
                    USDPrice
                )}
                onSetMax={onSetMax}
                amount={amount}
                setAmount={onSetAmount}
                mainTitle={`Deposit ${asset.unit}`}
                balanceValue={formatNumber(asset.balance, asset.unit)}
                amountValue={`Wallet: ${formatNumber(
                    asset.wallet,
                    asset.unit
                )}`}
                walletIsKYCd={walletIsKYCd}
            />
        </>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({ onTx }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    DepositDrawerContainer
);
