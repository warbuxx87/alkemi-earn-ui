// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";
import * as yup from "yup";

import Big from "big.js";

// Section 2: internal imports
import useWalletSelect from "hooks/useWalletSelect";

import Drawer from "components/UI/Drawer/Drawer";

import DrizzleContext from "utils/DrizzleContext";

import { onTx } from "redux/actions/status/transactions";

import {
    formatNumber,
    fromWei,
    formatETHMoney,
    toWei,
    assetToDecimals,
} from "utils/ui";

import { estimateGasForMethod } from "utils/transactionsSender";

// Section 3: Selectors
import { getUSDPrice } from "redux/selectors/data/totalBalance";
import { walletAddress, walletNetwork } from "redux/selectors/data/onboard";

import { getTransactions } from "redux/selectors/status/status";

import { getPool } from "redux/selectors/status/pool";

const DrawerRepayContainer = ({ asset, onTx }) => {
    const drizzle = useContext(DrizzleContext);

    const { library } = useWalletSelect();

    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const txs = useSelector(getTransactions);

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const [amount, setAmount] = React.useState("");
    const [shouldSendMax, setShouldSendMax] = React.useState(false);

    const currentPool = useSelector(getPool);

    const [estimationOfGasPrice, setEstimationOfGasPrice] =
        React.useState("3000000000"); // defaults to 3 gwei
    const [estimationOfRepayMethodCall, setEstimationOfRepayMethodCall] =
        React.useState("1050000000000000"); // defaults to 3 gwei * 350000

    const onSetMax = () => {
        if (asset.unit === "ETH" || asset.unit === "WETH") {
            // Cannot send MAX_UINT on repays for ETH, (means risk of dust)

            const bigBalance = Big(asset.balance);
            const higherBalanceForPayments = bigBalance
                .times(Big(1.01))
                .toFixed(0);

            // If user sets all their ether, they cannot make the transaction, choice here is to limit what they can repay from a calculated gas fee originating from past gas cost * (gas price estimation + 2 gwei)
            const calculatedDifference = web3.utils
                .toBN(asset.wallet)
                .sub(
                    web3.utils
                        .toBN(estimationOfRepayMethodCall)
                        .add(web3.utils.toBN(higherBalanceForPayments))
                ); // user's ether - (estimation of gas + borrowed amount)

            if (calculatedDifference.gte(web3.utils.toBN("0"))) {
                // user has on their wallet enough to pay for borrowed balance and gas
                setAmount(fromWei(higherBalanceForPayments, asset.unit));
            } else {
                const calculatedMax = web3.utils
                    .toBN(asset.wallet)
                    .sub(web3.utils.toBN(estimationOfRepayMethodCall)); // user available ether - gas estimation

                if (calculatedMax.gte(web3.utils.toBN("0"))) {
                    // user has some wei to spare for the repay
                    setAmount(fromWei(calculatedMax.toString(), asset.unit));
                } else {
                    setAmount(fromWei("0", asset.unit)); // user DOESN'T have on their wallet enough to pay for borrowed balance and gas
                }
            }
        } else {
            setShouldSendMax(true);

            setAmount(fromWei(asset.balance, asset.unit));
        }
    };

    React.useEffect(() => {
        // Retrieves an estimation of gas price and adds 2 gwei to it on starts
        drizzle.web3.eth.getGasPrice().then((result) => {
            const calculatedResult = web3.utils
                .toBN("2000000000") // adds 2 gwei to the result estimation of gasPrice from the last blocks
                .add(web3.utils.toBN(result));

            setEstimationOfGasPrice(calculatedResult.toString());
        });
    }, [drizzle.web3.eth]);

    React.useEffect(() => {
        const runEstimateOfMethodCall = () => {
            estimateGasForMethod({
                drizzle,
                userWalletNetwork,
                userWalletAddress,
                estimationOfGasPrice,
                method: "repayBorrow",
                currentPool,
            })
                .then((result) => {
                    const calculatedResult = web3.utils
                        .toBN(estimationOfGasPrice)
                        .mul(web3.utils.toBN(result.toString()))
                        .mul(web3.utils.toBN("3"));

                    setEstimationOfRepayMethodCall(calculatedResult.toString());
                })
                .catch((/* e */) => {
                    //console.log('Something went wrong: ', e)
                });
        };

        runEstimateOfMethodCall();
    }, [
        estimationOfGasPrice,
        userWalletNetwork,
        userWalletAddress,
        drizzle,
        currentPool,
        drizzle.web3.eth,
    ]);

    const onSetAmount = (newValue) => {
        setShouldSendMax(false);

        const numberOfDecimalsForAsset = assetToDecimals[asset.unit]
            ? assetToDecimals[asset.unit].toString()
            : "18"; // chose 18 as default, arbitrary choice here
        const regex = new RegExp(
            "^(?:\\d*\\.\\d{0," + numberOfDecimalsForAsset + "}|\\d+)$"
        );

        if (newValue === "" || (newValue + "").match(regex))
            // limiting inputting more decimal places than the asset supports
            setAmount(newValue);
    };

    const [enableRepay, setEnableRepay] = React.useState(false);
    React.useEffect(() => {
        const checkValidity = async () => {
            let schema = yup
                .number()
                .required()
                .positive()
                .test("maxValueTest", "You can't repay this amount", () => {
                    // user has an amount on their wallet, to subtract fee from that
                    let allowedAmount = web3.utils.toBN(asset.wallet);
                    let repayAmount = web3.utils
                        .toBN(toWei(amount, asset.unit))
                        .lte(web3.utils.toBN(asset.balance));

                    if (asset.unit === "ETH" || asset.unit === "WETH") {
                        // If user sets all their ether, they cannot make the transaction, choice here is to limit what they can repay from a calculated gas fee originating from past gas cost * (gas price estimation + 2 gwei)
                        const calculatedMax = web3.utils
                            .toBN(asset.wallet)
                            .sub(web3.utils.toBN(estimationOfRepayMethodCall));

                        allowedAmount = web3.utils.toBN(
                            calculatedMax.toString()
                        );

                        const bigBalance = Big(asset.balance);
                        const higherBalanceForPayments = bigBalance
                            .times(Big(1.01))
                            .toFixed(0);

                        // if user repaying ETH allow 101% repayment of balance owed
                        repayAmount = web3.utils
                            .toBN(toWei(amount, asset.unit))
                            .lte(web3.utils.toBN(higherBalanceForPayments));
                    }

                    return (
                        repayAmount &&
                        web3.utils
                            .toBN(toWei(amount, asset.unit))
                            .lte(allowedAmount)
                    );
                });
            setEnableRepay(await schema.isValid(amount));
        };

        checkValidity();
    }, [
        amount,
        asset.balance,
        asset.unit,
        asset.wallet,
        estimationOfRepayMethodCall,
    ]);

    const [isProcessing, setIsProcessing] = React.useState(false);
    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.assetUnit === asset.unit &&
                aTx.type === "repayBorrow" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txs]);

    return (
        <Drawer
            asset={asset}
            buttonsLabel="Repay"
            triggerButtonVariant="outlined"
            triggerButtonColor="secondary"
            enableButtonClick={enableRepay}
            showWarningColor={true}
            onButtonClick={() =>
                onTx({
                    userWalletNetwork,
                    userWalletAddress,
                    asset,
                    amount,
                    shouldSendMax,
                    type: "repayBorrow",
                    currentPool,
                    library,
                })
            }
            isDoingAction={isProcessing}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={onSetAmount}
            mainTitle={`Repay ${
                asset.alternativeUnitLabel
                    ? asset.alternativeUnitLabel
                    : asset.unit
            }`}
            balanceValue={formatNumber(
                asset.balance,
                asset.unit,
                userWalletNetwork
            )}
            amountValue={`Borrowed: ${formatNumber(
                asset.balance,
                asset.unit,
                userWalletNetwork
            )}`}
            walletIsKYCd={true} // Even if the wallet is not KYC'd, the user is able to withdraw their funds
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({ onTx }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    DrawerRepayContainer
);
