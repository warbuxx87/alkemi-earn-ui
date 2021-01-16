// Main Container

// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import DrizzleContext from "utils/DrizzleContext";

import { onTx } from "redux/actions/status/transactions";

import useOnboard from "hooks/useOnboard";

// Section 3: Selectors
import {
    getBorrowActive,
    getBorrowInactive,
    //  getBorrowError,
    //  getBorrowPending
} from "redux/selectors/data/borrow";

import { getUSDPrice } from "redux/selectors/data/totalBalance";

import {
    isWalletConnected,
    walletAddress,
    walletNetwork,
} from "redux/selectors/data/onboard";

import { isWalletKYCd, getTransactions } from "redux/selectors/status";

// Section 4: components
import Borrow from "components/Borrow/Borrow";

// Section 5: Code Container
const BorrowContainer = ({ inactiveBorrow, activeBorrow, onActivate }) => {
    const { onConnect } = useOnboard();

    const USDPrice = useSelector(getUSDPrice); // retrieves the USD price from the store

    const { drizzle } = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);
    const userWalletNetwork = useSelector(walletNetwork);

    const walletConnected = useSelector(isWalletConnected);

    const walletIsKYCd = useSelector(isWalletKYCd);
    const txs = useSelector(getTransactions);

    const activateAsset = (asset) =>
        onActivate({
            drizzle,
            userWalletNetwork,
            userWalletAddress,
            asset,
            type: "approve",
        });

    return (
        <Borrow
            inactiveBorrow={inactiveBorrow}
            activeBorrow={activeBorrow}
            onActivate={walletConnected ? activateAsset : onConnect}
            txs={txs}
            USDPrice={USDPrice}
            walletIsKYCd={walletIsKYCd}
        />
    );
};

const mapStateToProps = (state) => ({
    inactiveBorrow: getBorrowInactive(state),
    activeBorrow: getBorrowActive(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onActivate: onTx }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    BorrowContainer
);
