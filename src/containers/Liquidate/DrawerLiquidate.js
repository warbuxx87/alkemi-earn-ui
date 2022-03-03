// Section 1: React/Redux low level imports
import React, { useCallback } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";
import * as yup from "yup";

import Big from "big.js";

// Section 2: internal imports
import useWalletSelect from "hooks/useWalletSelect";

import { onLiquidateAction } from "redux/actions/data/liquidations";

import useFetchMarkets from "hooks/useFetchMarkets";

import { toWei, assetToDecimals } from "utils/ui";

// Section 3: Selectors
import {
    isWalletConnected,
    walletAddress,
    walletNetwork,
} from "redux/selectors/data/onboard";
import { isWalletKYCd, getTransactions } from "redux/selectors/status/status";
import { getPool, isKYCPool } from "redux/selectors/status/pool";
import { getMarkets } from "redux/selectors/data/markets";

// Section 4: Import Components / Containers
import DrawerLiquidate from "components/UI/Drawer/DrawerLiquidate";

// Section 5: Container's body
const LiquidateDrawerContainer = ({
    supplyList,
    borrowList,

    shortfallETH,
    targetAccount,

    onLiquidateAction,

    liquidationId,
}) => {
    useFetchMarkets(true);
    const { onConnect } = useWalletSelect();

    const { library } = useWalletSelect();
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);
    const walletConnected = useSelector(isWalletConnected);

    const walletIsKYCd = useSelector(isWalletKYCd);
    const txs = useSelector(getTransactions);

    const currentPool = useSelector(getPool);

    const needKYC = useSelector(isKYCPool);

    const marketsData = useSelector(getMarkets());

    const [amount, setAmount] = React.useState("");
    const [isProcessing, setIsProcessing] = React.useState(false);

    const onSetAmount = (newAmount) => {
        // Note that for WBTC normally it should only allow 8 decimal points, but for some reason it converts (see below comment) properly with 18, left this proper check for safety reasons
        const numberOfDecimalsForAsset = assetToDecimals[selectedBorrowAsset]
            ? assetToDecimals[selectedBorrowAsset].toString()
            : "18"; // chose 18 as default, arbitrary choice here
        const regex = new RegExp(
            "^(?:\\d*\\.\\d{0," + numberOfDecimalsForAsset + "}|\\d+)$"
        );

        if (newAmount === "" || (newAmount + "").match(regex))
            // limiting inputting more decimal places than the asset supports
            setAmount(newAmount);
    };

    const onSetMax = () => {
        setAmount(-1); // Sending -1 means sending UINT to the smart contract (altough this value is checked before being sent to the protocol and replaced by max_uint if amount equals -1)
    };

    // resets amount to initial null value
    const onResetAmount = () => {
        setAmount("");
    };

    const [selectedSupplyAsset, setSelectedSupplyAsset] = React.useState("");
    const [selectedBorrowAsset, setSelectedBorrowAsset] = React.useState("");

    const [enableLiquidate, setEnableLiquidate] = React.useState(false);

    const maxAmountForToken = useCallback(
        (symbol) => {
            const assetMarketDataForSymbol = marketsData.find(
                (e) => e.symbol === symbol
            );

            // shortFallETH / token Oracle Price
            let calculatedValue = 0;

            if (
                assetMarketDataForSymbol !== undefined &&
                assetMarketDataForSymbol &&
                shortfallETH
            )
                calculatedValue =
                    shortfallETH / assetMarketDataForSymbol.oraclePrice;

            return calculatedValue;
        },
        [marketsData, shortfallETH]
    );

    React.useEffect(() => {
        const checkValidity = async () => {
            let schema = yup
                .number()
                .required()
                .positive()
                .test("maxValueTest", "You can't liquidate this amount", () => {
                    return (
                        web3.utils
                            .toBN(toWei(amount))
                            // Should normally send selectedBorrowAsset as second parameter, but since 18 decimals points work with WBTC in this instance instead of 8 (1e8) as stated in the toWei function, left like this and to be monitored
                            .lte(
                                web3.utils.toBN(
                                    toWei(
                                        maxAmountForToken(
                                            selectedBorrowAsset
                                        ).toString()
                                    )
                                )
                            )
                    );
                    // Also note that the value being validated here is slightly different from the one shown on the UI since that one is rounded and this one is more precise to the last decimal value
                });

            setEnableLiquidate(
                (await schema.isValid(amount)) &&
                    selectedSupplyAsset &&
                    selectedBorrowAsset
                    ? true
                    : false
            );
        };

        if (amount !== -1) checkValidity();
        else setEnableLiquidate(true);
    }, [amount, selectedSupplyAsset, selectedBorrowAsset, maxAmountForToken]);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.alternativeId === liquidationId && // using liquidationId as ID instead of asset for this transaction
                aTx.type === "liquidate" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txs]);

    const maxAmountToDisplay = (amount, selectedLoanAsset) => {
        let youPay = 0;
        if (amount) {
            youPay = parseFloat(amount);
        }
        if (amount === -1) {
            if (selectedLoanAsset === "WETH" || selectedLoanAsset === "ETH") {
                youPay = maxAmountForToken(selectedLoanAsset);

                const youPayBig = Big(youPay);
                const ethPayment = youPayBig.times(Big(1.01));

                return ethPayment.toFixed(6);
            } else {
                youPay = maxAmountForToken(selectedLoanAsset);
                let youPayBig = Big(youPay);
                const positiveValue = youPayBig.abs();

                return positiveValue.toFixed(6);
            }
        }
        return youPay.toFixed(6);
    };

    return (
        <DrawerLiquidate
            buttonsLabel="Liquidate"
            shortfallETH={shortfallETH}
            onButtonClick={({ symbol, assetCollateral, assetBorrow }) => {
                onLiquidateAction({
                    userWalletNetwork,
                    userWalletAddress,
                    symbol,
                    amount,
                    assetCollateral,
                    assetBorrow,
                    targetAccount,
                    type: "liquidate",

                    liquidationId,
                    maxAmount: maxAmountForToken(symbol),

                    library,
                    currentPool,
                });
            }}
            onSetMax={onSetMax}
            onResetAmount={onResetAmount}
            amount={amount}
            onSetAmount={onSetAmount}
            enableButtonClick={enableLiquidate}
            isDoingAction={isProcessing}
            loanList={borrowList}
            selectedLoanAsset={selectedBorrowAsset}
            setSelectedLoanAsset={setSelectedBorrowAsset}
            collateralAssetList={supplyList}
            selectedCollateralAsset={selectedSupplyAsset}
            setSelectedCollateralAsset={setSelectedSupplyAsset}
            marketsData={marketsData}
            walletIsKYCd={needKYC ? walletIsKYCd : true}
            maxAmountForToken={maxAmountForToken}
            maxAmountToDisplay={maxAmountToDisplay}
            walletConnected={walletConnected}
            onConnect={onConnect}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onLiquidateAction }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    LiquidateDrawerContainer
);
