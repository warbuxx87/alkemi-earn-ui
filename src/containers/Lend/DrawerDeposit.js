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

import {
    formatNumber,
    fromWei,
    formatETHMoney,
    toWei,
    assetToDecimals,
} from "utils/ui";

import { estimateGasForMethod } from "utils/drizzle";

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

    const [estimationOfGasPrice, setEstimationOfGasPrice] = React.useState(
        "3000000000"
    ); // defaults to 3 gwei
    const [
        estimationOfDepositMethodCall,
        setEstimationOfDepositMethodCall,
    ] = React.useState("1050000000000000"); // defaults to 3 gwei * 350000

    const onSetAmount = (newValue) => {
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

    const onSetMax = () => {
        if (asset.unit === "ETH" || asset.unit === "WETH") {
            // If user sets all their ether, they cannot make the transaction, choice here is to limit what they can deposit from a calculated gas fee originating from past gas cost * (gas price estimation + 2 gwei)
            const calculatedMax = web3.utils
                .toBN(asset.wallet)
                .sub(web3.utils.toBN(estimationOfDepositMethodCall));

            setAmount(fromWei(calculatedMax.toString(), asset.unit));
        } else {
            setAmount(fromWei(asset.wallet, asset.unit));
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
                method: "supply",
            })
                .then((result) => {
                    const calculatedResult = web3.utils
                        .toBN(estimationOfGasPrice)
                        .mul(web3.utils.toBN(result.toString()));

                    setEstimationOfDepositMethodCall(
                        calculatedResult.toString()
                    );
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
        drizzle.web3.eth,
    ]);

    const [enableDeposit, setEnableDeposit] = React.useState(false);

    const [isProcessing, setIsProcessing] = React.useState(false);

    React.useEffect(() => {
        const checkValidity = async () => {
            let schema = yup
                .number()
                .required()
                .positive()
                .test("maxValueTest", "You can't deposit this amount", () => {
                    let allowedAmount = web3.utils.toBN(asset.wallet);

                    if (asset.unit === "ETH" || asset.unit === "WETH") {
                        // If user sets all their ether, they cannot make the transaction, choice here is to limit what they can deposit from a calculated gas fee originating from past gas cost * (gas price estimation + 2 gwei)
                        const calculatedMax = web3.utils
                            .toBN(asset.wallet)
                            .sub(
                                web3.utils.toBN(estimationOfDepositMethodCall)
                            );

                        allowedAmount = web3.utils.toBN(
                            calculatedMax.toString()
                        );
                    }

                    return web3.utils
                        .toBN(toWei(amount, asset.unit))
                        .lte(allowedAmount);
                });
            setEnableDeposit(await schema.isValid(amount));
        };

        checkValidity();
    }, [amount, asset.wallet, asset.unit, estimationOfDepositMethodCall]);

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
                mainTitle={`Deposit ${
                    asset.alternativeUnitLabel
                        ? asset.alternativeUnitLabel
                        : asset.unit
                }`}
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
