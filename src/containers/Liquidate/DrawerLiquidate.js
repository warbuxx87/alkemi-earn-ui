// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import DrawerLiquidate from "components/UI/Drawer/DrawerLiquidate";
import DrizzleContext from "utils/DrizzleContext";

import { onLiquidateAction } from "redux/actions/data/liquidations";

import { walletAddress, walletNetwork } from "redux/selectors/onboard";

/*const data = [
    {
        name: "Dai",
        image: "/images/DAI.svg",
        total: 234.53345,
        amount: 234.43,
        discount: "10%",
        debtToCover: 123.44,
        discountValue: 133.45,
        recieve: 123.34,
    },
    {
        name: "Usdt",
        image: "/images/USDT.svg",
        total: 33.7554,
        amount: 234.43,
        discount: "5%",
        debtToCover: 456.44,
        discountValue: 223.45,
        recieve: 234.34,
    },
    {
        name: "Usdc",
        image: "/static/media/USDC.ceb8339c.svg",
        total: 27.7575,
        amount: 234.43,
        discount: "10%",
        debtToCover: 123.44,
        discountValue: 137.88,
        recieve: 1265.1,
    },
];*/
const LiquidateDrawerContainer = ({
    supplyList,
    shortfallETH,
    onLiquidateAction,
}) => {
    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    return (
        <DrawerLiquidate
            buttonsLabel="Liquidate"
            supplyList={supplyList}
            shortfallETH={shortfallETH}
            onButtonClick={({ symbol }) => {
                onLiquidateAction({
                    drizzle,
                    userWalletNetwork,
                    userWalletAddress,
                    symbol,
                    /*asset,
                    amount,*/
                });
            }}
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onLiquidateAction }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    LiquidateDrawerContainer
);
