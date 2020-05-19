// Main Container

// Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import onLendActivate from "./Activate";
import { getSupplyBalance, getWalletBalance } from "./utils";
import Lend from "components/Lend/Lend";
import withDrizzle from "containers/Drizzle/withDrizzle";

// Section 3: Selectors
import {
    // getLendError,
    getLendActive,
    getLendInactive,
    isDrizzleInitialized
} from "redux/selectors/data";

const LendContainer = ({
    inactiveLend,
    activeLend,
    onActivate,
    drizzle,
    isDrizzleInitialized
}) => {
    const fetchBalance = React.useCallback(() => {
        console.log("fetch");
        getWalletBalance({ drizzle });
        getSupplyBalance({ drizzle });
    }, [drizzle]);

    React.useEffect(() => {
        // fetch balance every 10 seconds
        const interval = setInterval(() => fetchBalance(), 10000);
        return () => clearInterval(interval);
    }, [fetchBalance]);

    React.useEffect(() => {
        if (isDrizzleInitialized) {
            fetchBalance();
        }
    }, [fetchBalance, isDrizzleInitialized]);

    return (
        <Lend
            inactiveLend={inactiveLend}
            activeLend={activeLend}
            onActivate={asset => onActivate({ drizzle, asset })}
        />
    );
};

const mapStateToProps = state => ({
    inactiveLend: getLendInactive(state),
    activeLend: getLendActive(state),
    isDrizzleInitialized: isDrizzleInitialized(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            onActivate: onLendActivate
        },
        dispatch
    );

export default compose(
    withDrizzle(),
    connect(mapStateToProps, mapDispatchToProps)
)(LendContainer);
