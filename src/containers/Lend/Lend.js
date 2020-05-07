// Main Container

// Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import web3 from "web3";
// Section 2: internal imports
import onLendActivate from "./Activate";
import Lend from "components/Lend/Lend";
import withDrizzle from "containers/Drizzle/withDrizzle";

// Section 3: Selectors
import {
    // getLendError,
    getLendActive,
    getLendInactive,
    getLendPending
} from "redux/selectors/data";

class withLend extends Component {
    render() {
        // return a presentational component
        const {
            inactiveLend,
            activeLend,
            onActivate,
            pending,
            drizzle
        } = this.props;
        return (
            <Lend
                inactiveLend={inactiveLend}
                activeLend={activeLend}
                onActivate={asset => onActivate({ drizzle, asset })}
                pending={pending}
            />
        );
    }
}

const mapStateToProps = state => ({
    inactiveLend: getLendInactive(state),
    activeLend: getLendActive(state),
    pending: getLendPending(state)
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
)(withLend);
