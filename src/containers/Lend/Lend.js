// Main Container

// Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

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

import { getAccountAddress } from "redux/selectors/drizzleStore";

class withLend extends Component {
    componentDidMount() {
        // fetch balance every 10 seconds
        this.fetchBalance = setInterval(() => {
            const { drizzle, accountAddress } = this.props;
            Object.values(drizzle.contracts).forEach(contract => {
                contract.methods.balanceOf.cacheCall(accountAddress);
            });
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.fetchBalance);
    }

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
    pending: getLendPending(state),
    accountAddress: getAccountAddress(state)
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
