/* eslint-disable react-hooks/exhaustive-deps */
// Main Container

// Section 1: React/Reduxd low level imports
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import onLendActivate from "containers/Lend/ApproveMethod";
import Lend from "components/Lend/Lend";
import withDrizzle from "containers/Drizzle/withDrizzle";

// Section 3: Selectors
import {
    // getLendError,
    getLendActive,
    getLendInactive
} from "redux/selectors/data";

const LendContainer = ({ inactiveLend, activeLend, onActivate, drizzle }) => {
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
    activeLend: getLendActive(state)
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
