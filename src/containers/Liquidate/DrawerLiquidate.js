// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";
import * as yup from "yup";

// Section 2: internal imports
import DrawerLiquidate from "components/UI/Drawer/DrawerLiquidate";
import DrizzleContext from "utils/DrizzleContext";

import { onLiquidateAction } from "redux/actions/data/liquidations";

import useFetchMarkets from "hooks/useFetchMarkets";

import { toWei } from "utils/ui";

// Section 3: Selectors
import { walletAddress, walletNetwork } from "redux/selectors/data/onboard";
import { isWalletKYCd, getTransactions } from "redux/selectors/status";

const LiquidateDrawerContainer = ({
    supplyList,
    borrowList,

    shortfallETH,
    targetAccount,

    onLiquidateAction,

    liquidationId,
}) => {
    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const walletIsKYCd = useSelector(isWalletKYCd);
    const txs = useSelector(getTransactions);

    const { marketsData } = useFetchMarkets(true); // optimize useFetchMarkets (with a throttled call in redux action) if it's used from more than one place

    const [amount, setAmount] = React.useState("");
    const [isProcessing, setIsProcessing] = React.useState(false);

    // Controls the user input | TODO: enhance form management
    const onSetAmount = (newAmount) => {
        if (newAmount >= 0) {
            setAmount(newAmount);
        }
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

    React.useEffect(() => {
        const checkValidity = async () => {
            let schema = yup
                .number()
                .required()
                .positive()
                .test("maxValueTest", "You can't withdraw this amount", () => {
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
    }, [amount, selectedSupplyAsset, selectedBorrowAsset]);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.transactionLocalId === liquidationId && // using liquidationId as ID instead of asset for this transaction
                aTx.type === "liquidate" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txs]);

    const maxAmountForToken = (symbol) => {
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
    };

    return (
        <DrawerLiquidate
            buttonsLabel="Liquidate"
            shortfallETH={shortfallETH}
            onButtonClick={({ symbol, assetCollateral, assetBorrow }) => {
                onLiquidateAction({
                    drizzle,
                    userWalletNetwork,
                    userWalletAddress,
                    symbol,
                    amount,
                    assetCollateral,
                    assetBorrow,
                    targetAccount,
                    type: "liquidate",

                    liquidationId,
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
            walletIsKYCd={walletIsKYCd}
            maxAmountForToken={maxAmountForToken}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onLiquidateAction }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    LiquidateDrawerContainer
);
