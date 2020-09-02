// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import DrawerLiquidate from "components/UI/Drawer/DrawerLiquidate";
import DrizzleContext from "utils/DrizzleContext";

import { onLiquidateAction } from "redux/actions/data/liquidations";

import { walletAddress, walletNetwork } from "redux/selectors/onboard";

const LiquidateDrawerContainer = ({
    supplyList,
    borrowList,

    shortfallETH,
    targetAccount,

    onLiquidateAction,
}) => {
    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const [amount, setAmount] = React.useState("");
    const onSetMax = () => {
        setAmount(-1); // TODO define max
        //  setAmount(asset.safeBorrowToken.toString()); // @Ben retrieves Safe Maximum Token Borrow Amount 80% of max
        //  this really should be set to -1
    };

    const [enableLiquidate, setEnableLiquidate] = React.useState(false);

    React.useEffect(() => {
        if (amount) {
            // check that User Input Amount does not exceed maximum amount of tokens that user can liquidate for symbol and is not less than 0
            const isAmountValid =
                amount <= 999999 && amount > -2 ? true : false;
            setEnableLiquidate(isAmountValid);
        }
    }, [amount /*, symbol*/]);

    return (
        <DrawerLiquidate
            buttonsLabel="Liquidate"
            supplyList={supplyList}
            borrowList={borrowList}
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
                });
            }}
            onSetMax={onSetMax}
            amount={amount}
            setAmount={setAmount}
            enableButtonClick={enableLiquidate}
            isDoingAction={false /* TODO: define action being done */}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onLiquidateAction }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    LiquidateDrawerContainer
);
