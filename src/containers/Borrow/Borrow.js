/* eslint-disable react-hooks/exhaustive-deps */
// Main Container

// Section 1: React/Reduxd low level imports
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import onBorrowActivate from "./Activate";
import {
    getMarketContract,
    createActiveAssetContract
} from "containers/Lend/utils";
import Borrow from "components/Borrow/Borrow";
import withDrizzle from "containers/Drizzle/withDrizzle";

// Section 3: Selectors
import {
    getBorrowActive,
    getBorrowInactive,
    getBorrowError,
    isDrizzleInitialized

    // getBorrowPending
} from "redux/selectors/data";

const BorrowContainer = ({
    inactiveBorrow,
    activeBorrow,
    onActivate,
    drizzle,
    isDrizzleInitialized
}) => {
    React.useEffect(() => {
        if (isDrizzleInitialized) {
            getMarketContract({ drizzle });
        }
    }, [drizzle, isDrizzleInitialized]);

    React.useEffect(() => {
        // create missing contracts for active asset
        createActiveAssetContract({ drizzle, assets: activeBorrow });
    }, [activeBorrow.length]);

    return (
        <Borrow
            inactiveBorrow={inactiveBorrow}
            activeBorrow={activeBorrow}
            onActivate={asset => onActivate({ drizzle, asset })}
        />
    );
};

const mapStateToProps = state => ({
    inactiveBorrow: getBorrowInactive(state),
    activeBorrow: getBorrowActive(state),
    isDrizzleInitialized: isDrizzleInitialized(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ onActivate: onBorrowActivate }, dispatch);

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(BorrowContainer);
