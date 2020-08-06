// Main Container

// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import Borrow from "components/Borrow/Borrow";

import DrizzleContext from "containers/Drizzle/DrizzleContext";

import { onBorrowActivate } from "redux/actions/status/borrow";

// Section 3: Selectors
import {
    getBorrowActive,
    getBorrowInactive,
    //  getBorrowError,
    //  getBorrowPending
} from "redux/selectors/data/borrow";

import { walletAddress } from "redux/selectors/onboard";

const BorrowContainer = ({ inactiveBorrow, activeBorrow, onActivate }) => {
    const drizzle = useContext(DrizzleContext);
    const userWalletAddress = useSelector(walletAddress);

    return (
        <Borrow
            inactiveBorrow={inactiveBorrow}
            activeBorrow={activeBorrow}
            onActivate={(asset) =>
                onActivate({ drizzle, userWalletAddress, asset })
            }
        />
    );
};

const mapStateToProps = (state) => ({
    inactiveBorrow: getBorrowInactive(state),
    activeBorrow: getBorrowActive(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onActivate: onBorrowActivate }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    BorrowContainer
);
