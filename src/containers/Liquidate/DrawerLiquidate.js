// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import DrawerLiquidate from "components/UI/Drawer/DrawerLiquidate";
import DrizzleContext from "utils/DrizzleContext";

import { onLiquidateAction } from "redux/actions/data/liquidations";

import useFetchMarkets from "hooks/useFetchMarkets";

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
        setAmount(-1);
        //  setAmount(asset.safeBorrowToken.toString()); // @Ben retrieves Safe Maximum Token Borrow Amount 80% of max
        //  this really should be set to -1
    };

    // resets amount to initial null value
    const onResetAmount = () => {
        setAmount("");
    };

    const [selectedSupplyAsset, setSelectedSupplyAsset] = React.useState("");
    const [selectedBorrowAsset, setSelectedBorrowAsset] = React.useState("");

    const [enableLiquidate, setEnableLiquidate] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            // check that User Input Amount does not exceed maximum amount of tokens that user can liquidate for symbol and is not less than 0
            const isAmountValid =
                amount <= 999999 &&
                amount > -2 &&
                selectedSupplyAsset &&
                selectedBorrowAsset
                    ? true
                    : false;
            setEnableLiquidate(isAmountValid);
        }
    }, [amount, selectedSupplyAsset, selectedBorrowAsset]);

    React.useEffect(() => {
        const tx = Object.values(txs).filter((aTx) => {
            return (
                aTx.asset === liquidationId &&
                aTx.type === "liquidate" &&
                aTx.processing === true
            );
        });

        if (tx && tx.length > 0) setIsProcessing(tx[0].processing);
        else setIsProcessing(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txs]);

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
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onLiquidateAction }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    LiquidateDrawerContainer
);
