// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";
import * as yup from "yup";

// Section 2: internal imports
import {
    formatNumber,
    formatETHMoney,
    toWei,
    fromWei,
    assetToDecimals,
} from "utils/ui";

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
        //  setAmount(asset.safeBorrowToken); // @Ben retrieves Safe Maximum Token Borrow Amount 80% of max

        if (
            web3.utils
                .toBN(toWei(asset.maxBorrowToken, asset.unit))
                .lte(web3.utils.toBN(asset.liquidity))
        ) {
            setAmount(asset.maxBorrowToken);
        } else {
            setAmount(fromWei(asset.liquidity, asset.unit));
        }
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
        const checkValidity = async () => {
            let schema = yup
                .number()
                .required()
                .positive()
                .test("maxValueTest", "You can't borrow this amount", () => {
                    return (
                        web3.utils.toBN(toWei(amount, asset.unit)).lte(
                            web3.utils.toBN(
                                toWei(asset.maxBorrowToken, asset.unit) // checks amount against maxBorrow amount
                            )
                        ) &&
                        web3.utils
                            .toBN(toWei(amount, asset.unit))
                            .lte(web3.utils.toBN(asset.liquidity)) // checks amount against protocol liquidity
                    );
                });
            setEnableBorrow(await schema.isValid(amount));
        };

        checkValidity();
    }, [
        amount,
        asset.balance,
        asset.maxBorrowToken,
        asset.unit,
        asset.wallet,
        asset.liquidity,
    ]);

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
                    type: "borrow",
                    shouldSendMax: false, // shouldSendMax==true will send max_UINT, for this call we should not send it and set a precise amount,
                })
            }
            isDoingAction={isProcessing}
            usdPrice={formatETHMoney(asset.price, "USD", asset.unit, USDPrice)}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={onSetAmount}
            mainTitle={`Borrow ${
                asset.alternativeUnitLabel
                    ? asset.alternativeUnitLabel
                    : asset.unit
            }`}
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
