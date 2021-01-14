// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";
import * as yup from "yup";

// Section 2: internal imports
import Drawer from "components/UI/Drawer/Drawer";
import { onTx } from "redux/actions/status/transactions";

import {
    formatNumber,
    fromWei,
    formatETHMoney,
    toWei,
    assetToDecimals,
} from "utils/ui";

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
        setShouldSendMax(true);

        if (
            web3.utils.toBN(asset.balance).lte(web3.utils.toBN(asset.liquidity))
        ) {
            setAmount(fromWei(asset.balance, asset.unit));
        } else {
            setAmount(fromWei(asset.liquidity, asset.unit));
        }
    };

    const [enableWithdraw, setEnableWithdraw] = React.useState(false);

    const [isProcessing, setIsProcessing] = React.useState(false);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.transactionLocalId === asset.unit &&
                aTx.type === "withdraw" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txs]);

    React.useEffect(() => {
        const checkValidity = async () => {
            let schema = yup
                .number()
                .required()
                .positive()
                .test("maxValueTest", "You can't withdraw this amount", () => {
                    return (
                        // We could replace web3's BN with big.js to use decimal points comfortably, but for now it's better to use web3 tooling
                        web3.utils
                            .toBN(toWei(amount, asset.unit))
                            .lte(web3.utils.toBN(asset.balance)) &&
                        web3.utils
                            .toBN(toWei(amount, asset.unit))
                            .lte(web3.utils.toBN(asset.liquidity)) // checks amount against protocol liquidity
                    );
                });

            setEnableWithdraw(await schema.isValid(amount));
        };

        checkValidity();
    }, [amount, asset.balance, asset.unit, asset.liquidity]);

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
            mainTitle={`Redeem ${
                asset.alternativeUnitLabel
                    ? asset.alternativeUnitLabel
                    : asset.unit
            }`}
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
